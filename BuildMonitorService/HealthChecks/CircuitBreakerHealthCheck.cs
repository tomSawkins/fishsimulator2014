using Metrics;
using Metrics.Core;
using ReliabilityPatterns;

namespace BuildMonitorService.HealthChecks
{
    public class CircuitBreakerHealthCheck : HealthCheck
    {
        private readonly CircuitBreaker breaker;

        public CircuitBreakerHealthCheck(CircuitBreaker breaker)
            : base("CircuitBreaker")
        {
            this.breaker = breaker;
        }

        protected override HealthCheckResult Check()
        {
            if (breaker.State == CircuitBreakerState.Closed)
                return HealthCheckResult.Healthy();

            return HealthCheckResult.Unhealthy("Circuit Checker Failed {0}", breaker.State);
        }
    }
}