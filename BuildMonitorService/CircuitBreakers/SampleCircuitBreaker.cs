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
			if (breaker.AllowedToAttemptExecute)
			{
				try
				{
					string result = breaker.ExecuteWithRetries(() => SampleFunction(request),
						new RetryOptions
						{
							AllowedRetries = Configuration.CircuitBreakerRetries,
                            RetryInterval = TimeSpan.FromSeconds(Configuration.CircuitBreakerRetryInterval)
						});
					return result;
				}
				catch (AggregateException)
				{
					breaker.Trip();
					Log.Error("CircuitBreaker Tripped");
				}
			}
			else
			{
				Log.Error("Unable to execute at this time CircuitBreaker State {State}", breaker.State);
			}

			return null;
		}

	    private string SampleFunction(string request)
		{
			if (request == null)
				throw new InvalidOperationException("Invalid Request");

			return request;
		}
	}
}