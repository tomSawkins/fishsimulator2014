using System;
using Autofac;
using Autofac.Integration.SignalR;
using Microsoft.AspNet.SignalR;
using Owin;

namespace FishSim2014
{
    public static class AutofacConfig
    {
        public static void Register(IAppBuilder app)
        {
            // Create the container builder.
            var builder = new ContainerBuilder();

            builder.RegisterAssemblyModules(typeof (AutofacConfig).Assembly);

            IContainer container = builder.Build();

            // Create the depenedency resolver.
            var resolver = new AutofacDependencyResolver(container);

            // Configure SignalR with the dependency resolver.
            GlobalHost.DependencyResolver = resolver;
        }
    }
}