using System.Reflection;
using Autofac;
using BuildMonitorService.ScheduledTasks;
using BuildMonitorService.Services;
using FluentScheduler;
using Metrics;
using Serilog;
using Serilog.Extras.Topshelf;
using Topshelf;
using Topshelf.Autofac;

namespace BuildMonitorService
{
	internal class Program
	{
		private static void Main(string[] args)
		{
			Log.Logger = new LoggerConfiguration()
				.WriteTo.ColoredConsole()
				.WriteTo.Seq("http://localhost:5341/")
				.CreateLogger();

			Metric.Config.WithHttpEndpoint("http://localhost:1234/");

			var builder = new ContainerBuilder();

			/*
		<add key="testUrl" value="https://ts9.wagering.tatts.com/" />
		<add key="pagerduty:domain" value="tattsonline" />
		<add key="pagerduty:token" value="b628e7f3684f41feb9839961d8ee0314" />
*/

			builder.RegisterAssemblyModules(Assembly.GetExecutingAssembly());

			using (IContainer container = builder.Build())
			{
				HostFactory.Run(x =>
				{
					x.UseSerilog();
					x.UseAutofacContainer(container);
					x.Service<SampleService>(s =>
					{
						s.ConstructUsingAutofacContainer();
						s.WhenStarted(ns => ns.Start());
						s.WhenStopped(ns => ns.Stop());
					});
					x.RunAsLocalSystem();
					x.SetDescription("Sample Service");
					x.SetDisplayName("Sample Service");
					x.SetServiceName("SampleService");
				});
			}
		}
	}
}