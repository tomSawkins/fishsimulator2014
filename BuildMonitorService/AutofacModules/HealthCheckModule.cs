using Autofac;
using Metrics.Core;

namespace BuildMonitorService.AutofacModules
{
	public class HealthCheckModule : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			base.Load(builder);

			builder.RegisterAssemblyTypes(ThisAssembly)
				.Where(p => p.IsAssignableTo<HealthCheck>())
				.OnActivated(p => Metrics.HealthChecks.RegisterHealthCheck((HealthCheck)p.Instance))
				.AutoActivate();
		}
	}
}