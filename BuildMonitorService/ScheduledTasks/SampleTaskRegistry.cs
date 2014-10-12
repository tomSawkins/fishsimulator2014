using FluentScheduler;
using Serilog;

namespace BuildMonitorService.ScheduledTasks
{
    public class SampleTaskRegistry : Registry
    {
        public SampleTaskRegistry()
        {
            Log.Information("SampleTaskRegistry Registering Scheduled Tasks");

            //Schedule<SampleTask>().ToRunNow().AndEvery(5).Seconds();
			Schedule<HealthCheckTask>().ToRunNow().AndEvery(90).Seconds();
        }
    }
}