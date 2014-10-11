using Owin;

namespace FishSim2014
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            AutofacConfig.Register(app);
            SignalRConfig.Register(app);
        }
    }
}