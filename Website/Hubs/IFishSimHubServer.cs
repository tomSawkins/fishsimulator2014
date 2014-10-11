using FishSim2014.Models;

namespace FishSim2014.Hubs
{
    public interface IFishSimHubServer
    {
        /// <summary>
        ///     Returns the Startup time of the ASP.NET Application
        ///     This is used by the front-end application to determine whether
        ///     to reload the application after a SignalR disconnection / reconnection.
        /// </summary>
        /// <returns>ISO formatted DateTime</returns>
        string GetStartupTime();

        ClientConfig GetConfig();

        void MarioMan();
    }
}