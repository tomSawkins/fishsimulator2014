using FishSim2014.Interfaces;
using FishSim2014.Models;
using Microsoft.AspNet.SignalR;

namespace FishSim2014.Hubs
{
    public class FishSimHub : Hub<IFishSimHubClient>, IFishSimHubServer
    {
        private readonly AppInfo appInfo;

        public FishSimHub(AppInfo appInfo)
        {
            this.appInfo = appInfo;
        }

        /// <summary>
        ///     Returns the Startup time of the ASP.NET Application
        ///     This is used by the front-end application to determine whether
        ///     to reload the application after a SignalR disconnection / reconnection.
        /// </summary>
        /// <returns>ISO formatted DateTime</returns>
        public string GetStartupTime()
        {
            return appInfo.StartupTime.ToString("O");
        }

        public ClientConfig GetConfig()
        {
            var config = new ClientConfig();

            config.Environments.Add(new Environment { Name = "ts8", Health = Health.Unknown });
            config.Environments.Add(new Environment { Name = "ts9", Health = Health.Unknown });
            config.Environments.Add(new Environment { Name = "t10", Health = Health.Unknown });
            config.Environments.Add(new Environment { Name = "t12", Health = Health.Unknown });

            config.StartupTime = GetStartupTime();

            return config;
        }

        public void MarioMan()
        {
            this.Clients.All.MarioMan();
        }

        public void UpdateEnvironment(string name, Health health)
        {
            this.Clients.All.UpdateEnvironment(name, health);
        }
    }
}