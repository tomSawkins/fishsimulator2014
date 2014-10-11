using System;
using System.IO;
using FishSim2014.Interfaces;
using FishSim2014.Models;
using Microsoft.AspNet.SignalR;

namespace FishSim2014.Hubs
{
	public class FishSimHub : Hub<IFishSim>
	{
		public string GetBuildTime()
		{
			if (!File.Exists("Web.config"))
			{
				throw new InvalidOperationException("Unable to determine BuildTime");
			}

			DateTime modifiedTime = File.GetLastWriteTimeUtc("Web.config");

			return modifiedTime.ToString("O");
		}

		public ClientConfig GetConfig()
		{
			var config = new ClientConfig();

			config.Environments.Add(new ClientEnvironment {Name = "ts8"});
			config.Environments.Add(new ClientEnvironment {Name = "ts9"});

			config.BuildTime = GetBuildTime();

			return config;
		}
	}
}