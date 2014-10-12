using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
using Serilog;

namespace BuildMonitorService.Services
{
	public class PagerDutyService
	{
		public async Task Notify(List<string> outages)
		{
			if (outages == null) throw new ArgumentNullException("outages");

			var domain = System.Configuration.ConfigurationManager.AppSettings["pagerduty:domain"];
			var token = System.Configuration.ConfigurationManager.AppSettings["pagerduty:token"];

			var payload = new
			{
				service_key = token,
				event_type = "trigger",
				description = "HealthCheck FAIL",
				details = outages
			};

			var client = new RestClient();
			IRestRequest request = new RestRequest(@"https://events.pagerduty.com/generic/2010-04-15/create_event.json", Method.POST);
			request.RequestFormat = DataFormat.Json;
			request.AddBody(payload);
			var response = await client.PostTaskAsync<dynamic>(request);
				
			if (response.StatusCode == HttpStatusCode.OK)
			{
				//"{\"status\":\"success\",\"message\":\"Event processed\",\"incident_key\":\"0d4180f84e784fc688f1f3fa6d35ab48\"}"
				Log.Information("Notification Successful {@Content}", response.Content);
			}
		}
	}
}
