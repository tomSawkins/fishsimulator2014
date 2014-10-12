using Autofac;
using FluentScheduler;
using Serilog;

namespace BuildMonitorService.AutofacModules
{
	public class TaskSchedulerModule : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			base.Load(builder);

			builder.RegisterAssemblyTypes(ThisAssembly)
				.Where(p => p.IsAssignableTo<ITask>())
				.AsSelf()
				.AsImplementedInterfaces();

			builder.RegisterAssemblyTypes(ThisAssembly)
				.Where(p => p.IsAssignableTo<ITaskFactory>())
				.OnActivated(p =>
				{
					Log.Information("Setting TaskFactory {Type}", p.Instance.GetType().Name);
					TaskManager.TaskFactory = (ITaskFactory) p.Instance;
				})
				.AutoActivate();

			builder.RegisterAssemblyTypes(ThisAssembly)
				.Where(p => p.IsAssignableTo<Registry>())
				.OnActivated(p =>
				{
					Log.Information("Initializing Task Registry {Type}", p.Instance.GetType().Name);
					TaskManager.Initialize((Registry) p.Instance);
					TaskManager.Start();
				})
				.AutoActivate();
		}
	}
}