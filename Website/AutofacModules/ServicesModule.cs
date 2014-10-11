using Autofac;

namespace FishSim2014.AutofacModules
{
    public class ServicesModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterAssemblyTypes(ThisAssembly)
                .Where(p => p.Namespace.StartsWith("FishSim2014.Services"))
                .AsSelf()
                .AsImplementedInterfaces();
        }
    }
}