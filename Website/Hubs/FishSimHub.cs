using System.Threading.Tasks;
using FishSim2014.Interfaces;
using FishSim2014.Models;
using Metrics;
using Microsoft.AspNet.SignalR;

namespace FishSim2014.Hubs
{
	public class FishSimHub : Hub<IFishSimHubClient>, IFishSimHubServer
	{
		private readonly AppInfo appInfo;

		private readonly Counter connectionCounter = Metric.Counter("SignalR Connections", Unit.Custom("Connections"));
		private readonly Meter callMeter = Metric.Meter("Method Calls", Unit.Calls, TimeUnit.Minutes);

		public FishSimHub(AppInfo appInfo)
		{
			this.appInfo = appInfo;
		}

		public string GetStartupTime()
		{
			callMeter.Mark("GetStartupTime");

			return appInfo.StartupTime.ToString("O");
		}

		public ClientConfig GetConfig()
		{
			callMeter.Mark("GetConfig");

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
			callMeter.Mark("MarioMan");

			this.Clients.All.MarioMan();
		}

		public void UpdateEnvironment(string name, Health health)
		{
			callMeter.Mark("UpdateEnvironment");

			this.Clients.All.UpdateEnvironment(name, health);

			string message = string.Format("{0} is {1}", name, health);
			ShowNotification(name, message);
		}

		public void ShowNotification(string name, string message)
		{
			callMeter.Mark("ShowNotification");

			this.Clients.All.ShowNotification(name, message);
		}

		public override Task OnConnected()
		{
			connectionCounter.Increment();
			return base.OnConnected();
		}

		public override Task OnDisconnected(bool stopCalled)
		{
			connectionCounter.Decrement();
			return base.OnDisconnected(stopCalled);
		}
	}
}