using BuildMonitorService.CircuitBreakers;
using FluentScheduler;
using Metrics;
using Serilog;

namespace BuildMonitorService.ScheduledTasks
{
	public class SampleTask : ITask
	{
		private readonly SampleCircuitBreaker breaker;
		private readonly Counter counter = Metric.Counter("SampleTask", Unit.Calls);

		public SampleTask(SampleCircuitBreaker breaker)
		{
			this.breaker = breaker;
		}

		public void Execute()
		{
			counter.Increment();

			Log.Information("Executing Sample Task");
			string result = breaker.Execute("sample request");
			Log.Information("Result => {Result}", result);
		}
	}
}