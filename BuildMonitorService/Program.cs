using System.Reflection;
using Autofac;
using BuildMonitorService.Services;
using Metrics;
using Serilog;
using Serilog.Extras.Topshelf;
using Topshelf;
using Topshelf.Autofac;

namespace BuildMonitorService
{
    public class Program
    {
        private static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .Enrich.WithMachineName()
                .Enrich.WithProperty("Application", Configuration.ServiceName)
                .WriteTo.ColoredConsole()
                .WriteTo.Seq(Configuration.SeqServerAddress)
                .CreateLogger();

            Metric.Config.WithHttpEndpoint(Configuration.MetricsEndpoint);

            var builder = new ContainerBuilder();

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
                    x.SetDescription(Configuration.ServiceDescription);
                    x.SetDisplayName(Configuration.ServiceDisplayName);
                    x.SetServiceName(Configuration.ServiceName);
                });
            }
        }
    }
}