using System;
using Autofac;
using BuildMonitorService.CircuitBreakers;
using ReliabilityPatterns;
using Serilog;

namespace BuildMonitorService.AutofacModules
{
    public class CircuitBreakerModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterType<CircuitBreaker>()
                .OnActivated(p =>
                {
                    p.Instance.ServiceLevelChanged += OnServiceLevelChanged;
                    p.Instance.StateChanged += OnStateChanged;
                    p.Instance.ResetTimeout = TimeSpan.FromSeconds(Configuration.CircuitBreakerResetTimeout);
                }
                )
                .SingleInstance();

            builder.RegisterType<SampleCircuitBreaker>();
        }

        private static void OnStateChanged(object sender, EventArgs e)
        {
            var circuitBreaker = sender as CircuitBreaker;
            if (circuitBreaker != null)
                Log.Information("CircuitBreaker StateChanged {State}", circuitBreaker.State);
        }

        private static void OnServiceLevelChanged(object sender, EventArgs e)
        {
            var circuitBreaker = sender as CircuitBreaker;
            if (circuitBreaker != null)
                Log.Information("CircuitBreaker ServiceLevelChanged {ServiceLevel}", circuitBreaker.ServiceLevel);
        }
    }
}