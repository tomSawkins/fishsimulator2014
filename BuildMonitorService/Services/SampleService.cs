using Serilog;
using Topshelf;

namespace BuildMonitorService.Services
{
	public class SampleService 
	{
		public void Start()
		{
			Log.Information("Starting Service {Type}", GetType().FullName);
		}

		public void Stop()
		{
			Log.Information("Stopping Service {Type}", GetType().FullName);
		}
	}
}