using Autofac;
using Microsoft.AspNet.SignalR.Hubs;

namespace FishSim2014.AutofacModules
{
    public class SignalrModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterAssemblyTypes(ThisAssembly)
                .Where(p => p.IsAssignableTo<HubBase>())
                .AsSelf()
                .AsImplementedInterfaces();
        }
    }
}