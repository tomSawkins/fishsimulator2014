using FluentScheduler;
using Serilog;

namespace BuildMonitorService.ScheduledTasks
{
    public class SampleTaskRegistry : Registry
    {
        public SampleTaskRegistry()
        {
            if (Configuration.SampleTaskEnabled)
            {
                Log.Information("Registering SampleTask");
                Schedule<SampleTask>().ToRunNow().AndEvery(Configuration.SampleTaskSchedule).Minutes();
            }

            if (Configuration.HealthCheckEnabled)
            {
                Log.Information("Registering HealthCheckTask");
                Schedule<HealthCheckTask>().ToRunNow().AndEvery(Configuration.HealthCheckSchedule).Minutes();
            }
        }
    }
}