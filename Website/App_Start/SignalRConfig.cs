using Owin;

namespace FishSim2014
{
    public static class SignalRConfig
    {
        public static void Register(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}