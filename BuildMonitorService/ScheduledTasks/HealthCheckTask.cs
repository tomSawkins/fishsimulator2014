using System;
using System.Collections.Generic;
using System.Configuration.Abstractions;
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
        private readonly List<string> outages = new List<string>();
        private readonly PagerDutyService pager;

        public HealthCheckTask(PagerDutyService pager)
        {
            if (pager == null) throw new ArgumentNullException("pager");
            this.pager = pager;

            ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
        }

        public void Execute()
        {
            bool healthCheckPassed = false;
            try
            {
                var client = new RestClient();

                string baseUri = Configuration.HealthCheckBaseUrl;

                var uriBuilder = new UriBuilder(baseUri) { Path = "HealthCheck.aspx", Query = "extendedInfo=true" };

                Log.Information("Calling HealthCheck: {Url}", uriBuilder.ToString());

                IRestRequest request = new RestRequest(uriBuilder.ToString(), Method.GET);

                var response = client.Get(request);

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    Log.Debug("{Content}", response.Content);

                    if (!string.IsNullOrEmpty(response.Content))
                    {
                        if (HealthChecksPass(response.Content))
                        {
                            healthCheckPassed = true;
                            Log.Information("All HealthChecks Passed");
                        }
                        else
                        {
                            throw new InvalidDataException("Healthcheck Failed");
                        }
                    }
                }
                else 
                {
                    outages.Add(response.ErrorMessage);
                }
            }
            catch (Exception e)
            {
                Log.Error(e, "Execute HealthCheck Error");
            }

            if (outages.Any() || !healthCheckPassed)
            {
                Log.Error("HealthCheck Failed due to failures in {Outages}", outages);

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