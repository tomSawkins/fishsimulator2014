using Metrics;
using Owin;

namespace FishSim2014
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            AutofacConfig.Register(app);
            MetricsConfig.Register(app);
            SignalRConfig.Register(app);
        }
    }
}