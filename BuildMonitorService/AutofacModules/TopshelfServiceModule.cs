using Autofac;
using BuildMonitorService.Services;

namespace BuildMonitorService.AutofacModules
{
	public class TopshelfServiceModule : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			base.Load(builder);

			builder.RegisterType<SampleService>()
				.AsSelf();
		}
	}
}