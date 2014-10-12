using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildMonitorService.Config
{
	public class HealthCheckSection : ConfigurationSection
	{
		[ConfigurationProperty("healthCheckCollection", IsDefaultCollection = true, IsKey = false, IsRequired = true)]
		public HealthCheckCollection Members
		{
			get
			{
				return base["healthCheckCollection"] as HealthCheckCollection;
			}

			set
			{
				base["healthCheckCollection"] = value;
			}
		}

	}
}
