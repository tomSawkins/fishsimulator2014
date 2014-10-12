using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using BuildMonitorService.Services;
using FluentScheduler;
using RestSharp;
using Serilog;

namespace BuildMonitorService.ScheduledTasks
{
	public class HealthCheckTask : ITask
	{
		private readonly PagerDutyService pager;
		private readonly List<string> outages = new List<string>();

		public HealthCheckTask(PagerDutyService pager)
		{
			if (pager == null) throw new ArgumentNullException("pager");
			this.pager = pager;

			ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
		}

		public void Execute()
		{
			Log.Information("Calling HealthCheck");

			try
			{
				var client = new RestClient();

				var baseUri = System.Configuration.ConfigurationManager.AppSettings["BaseUri"];

				var uriBuilder = new UriBuilder(baseUri);
				uriBuilder.Path = "HealthCheck.aspx";
				uriBuilder.Query = "extendedInfo=true";

				IRestRequest request = new RestRequest(uriBuilder.ToString(), Method.GET);
				client.ExecuteAsyncGet<string>(request, (response, handle) =>
				{
					if (response.StatusCode == HttpStatusCode.OK)
					{
						Log.Debug("{Content}", response.Content);

						if (!string.IsNullOrEmpty(response.Content))
						{
							if (HealthChecksPass(response.Content))
							{
								Log.Information("All HealthChecks Passed");
							}
							else
							{
								throw new InvalidDataException("Healtcheck Failed");
							}
						}
					}
				}, "GET");
			}
			catch (Exception e)
			{
				Log.Error(e, "Execute HealthCheck Error");
			}

			if (outages.Any())
			{
				Log.Fatal("HealthCheck Failed due to failures in {Outages}", outages);
				//BackgroundJob.Enqueue<SendPagerMessageJob>(p => p.Notify(outages));
				
				pager.Notify(outages);
			}
		}

		private bool HealthChecksPass(string content)
		{
			string result = Regex.Replace(content, @"<[^>]*>", String.Empty);
			string[] stringList = result.Split('\r', '\n');

			VerifyValue(stringList, "STATUS:", "PASS!");
			VerifyValue(stringList, "VERSION:", "TATTS.COM");
			VerifyValue(stringList, "SITECORE:", "OK!");
			VerifyValue(stringList, "SCALEOUT:", "OK!");
			VerifyValue(stringList, "ASGARD TERMINAL:", "OK!");
			VerifyValue(stringList, "LOKI:", "OK!");
			VerifyValue(stringList, "LOTTO:", "OK!");
			VerifyValue(stringList, "WAGERING:", "OK!");

			return true;
		}

		private void VerifyValue(IEnumerable<string> stringList, string system, string state)
		{
			string testItem = stringList.FirstOrDefault(p => p.ToUpper().Contains(system.ToUpper()));

			if (!string.IsNullOrWhiteSpace(testItem))
			{
				if (testItem.ToUpper().Contains(state.ToUpper()))
				{
					// Test Passed, Exit
					return;
				}
			}

			outages.Add(system.Replace(":", "").Trim());

			Log.Information("HealthCheck Test {Test} Failed due to value {Value}", system, testItem);
		}
	}
}