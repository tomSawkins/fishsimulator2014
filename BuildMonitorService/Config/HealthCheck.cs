using System.Configuration;

namespace BuildMonitorService.Config
{
	public class HealthCheck : ConfigurationElement
	{
		[ConfigurationProperty("id", IsKey = true)]
		public string Id { get { return (string)this["id"]; } }

		[ConfigurationProperty("address")]
		public string address { get { return (string)this["address"]; } }

		[ConfigurationProperty("schedule")]
		public int schedule { get { return (int)this["schedule"]; } }
	}
}