using System;
using FishSim2014;
using FishSim2014.Hubs;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof (Startup))]

namespace FishSim2014
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			// For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
			app.MapSignalR();

			AppPoolStart.StartupTime = DateTimeOffset.UtcNow.ToString("O");
		}
	}
}