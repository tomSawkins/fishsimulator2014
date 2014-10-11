using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Client;
using Serilog;

namespace FishSim2014.Controller
{
    class Program
    {
        private static IHubProxy hubProxy;

        private const string ProductionUrl = "http://fishsim2014.azurewebsites.net/";
        private const string DevelopmentUrl = "http://dev-fishsim2014.azurewebsites.net/";
        private const string LocalUrl = "http://localhost:34215/";

        static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.ColoredConsole(outputTemplate: "{Message}{NewLine}{Exception}")
                .CreateLogger();

            Log.Information("1 - Production ({Url})", ProductionUrl);
            Log.Information("2 - Development ({Url})", DevelopmentUrl);
            Log.Information("3 - Local ({Url})", LocalUrl);

            string currentUrl = LocalUrl;
            
            var key = Console.ReadKey();
            Console.WriteLine();

            if (key.KeyChar == '1')
                currentUrl = ProductionUrl;
            else if (key.KeyChar == '2')
                currentUrl = DevelopmentUrl;
            else if (key.KeyChar == '3')
                currentUrl = LocalUrl;

            MainAsync(currentUrl).Wait();

            hubProxy.Invoke<string>("GetStartupTime").ContinueWith(p => Log.Information("StartupTime response: {StartupTime}", p.Result)).Wait();

            bool exitFlag = false;
            while (!exitFlag)
            {
                Log.Information("Press 'm' for a new mario man, 'l' for a loop, or 'x' to exit");
                key = Console.ReadKey();
                Console.WriteLine();

                if (key.KeyChar == 'm')
                    hubProxy.Invoke("MarioMan").Wait();
                else if (key.KeyChar == 'l')
                {
                    for (int i = 0; i < 60; i++)
                    {
                        Log.Information("Mario Man! #{i}", i);
                        hubProxy.Invoke("MarioMan").Wait();
                        System.Threading.Thread.Sleep(900);
                    }
                }
                else if (key.KeyChar == 'x')
                    exitFlag = true;
            }

            Console.WriteLine("done.");
        }

        static async Task MainAsync(string hubUrl)
        {
            try
            {
                var hubConnection = new HubConnection(hubUrl)
                {
                    // TraceLevel = TraceLevels.All,                console.log("mario man please");
                    // TraceWriter = Console.Out
                };

                hubProxy = hubConnection.CreateHubProxy("FishSimHub");

                await hubConnection.Start();
            }
            catch (Exception ex)
            {

            }
        }
    }
}
