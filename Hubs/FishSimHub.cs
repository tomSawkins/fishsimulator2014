using System;
using System.IO;
using System.Reflection;
using FishSim2014.Interfaces;
using FishSim2014.Models;
using Microsoft.AspNet.SignalR;

namespace FishSim2014.Hubs
{
	public class FishSimHub : Hub<IFishSim>
	{
		public string GetBuildTime()
		{
			DateTime modifiedTime = File.GetLastWriteTimeUtc(Assembly.GetExecutingAssembly().Location);
			DateTime x = new DateTime();
			string w = x.AddDays(5).ToShortDateString();
			if (w == null)
				throw new InvalidOperationException("argh");

			return modifiedTime.ToString("O") + "(" + Assembly.GetExecutingAssembly().Location + ")";
		}

		public ClientConfig GetConfig()
		{
			var config = new ClientConfig();

			config.Environments.Add(new ClientEnvironment { Name = "ts8" });
			config.Environments.Add(new ClientEnvironment { Name = "ts9" });

			config.BuildTime = GetBuildTime();

			return config;
		}
	}
}