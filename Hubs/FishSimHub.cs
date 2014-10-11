using FishSim2014.Interfaces;
using FishSim2014.Models;
using Microsoft.AspNet.SignalR;

namespace FishSim2014.Hubs
{
	public class FishSimHub : Hub<IFishSim>
	{
		public ClientConfig GetConfig()
		{
			var config = new ClientConfig();

			config.Environments.Add(new ClientEnvironment {Name = "ts8"});
			config.Environments.Add(new ClientEnvironment {Name = "ts9"});

			return config;
		}
	}
}