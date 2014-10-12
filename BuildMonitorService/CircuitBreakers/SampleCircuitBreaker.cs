using System;
using ReliabilityPatterns;
using Serilog;

namespace BuildMonitorService.CircuitBreakers
{
	public class SampleCircuitBreaker
	{
		private readonly CircuitBreaker breaker;

		public SampleCircuitBreaker(CircuitBreaker breaker)
		{
			this.breaker = breaker;
		}

		public string Execute(string request)
		{
			Log.Information("Execute '{Request}'", request);

			if (breaker.AllowedToAttemptExecute)
			{
				try
				{
					string result = breaker.ExecuteWithRetries(() => SampleFunction(request),
						new RetryOptions
						{
							AllowedRetries = 5,
							RetryInterval = TimeSpan.FromSeconds(1)
						});
					return result;
				}
				catch (AggregateException)
				{
					breaker.Trip();
					Log.Error("Request Failed");
				}
			}
			else
			{
				Log.Error("Unable to execute at this time CircuitBreaker State {State}", breaker.State);
			}

			return null;
		}

		public string SampleFunction(string request)
		{
			Log.Information("Function '{request}'", request);

			if (request == null)
				throw new InvalidOperationException("Invalid Request");

			return request;
		}
	}
}