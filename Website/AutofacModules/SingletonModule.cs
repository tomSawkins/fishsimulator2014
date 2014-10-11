using Autofac;
using FishSim2014.Models;

namespace FishSim2014.AutofacModules
{
    public class SingletonModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterType<AppInfo>()
                .AsSelf()
                .SingleInstance();
        }
    }
}