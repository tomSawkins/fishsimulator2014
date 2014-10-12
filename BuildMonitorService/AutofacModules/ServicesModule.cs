using Autofac;
using BuildMonitorService.Services;

namespace BuildMonitorService.AutofacModules
{
	public class ServicesModule : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			base.Load(builder);

			builder.RegisterType<PagerDutyService>()
				.AsSelf();
		}
	}
}