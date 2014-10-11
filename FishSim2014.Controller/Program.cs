using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Client;

namespace FishSim2014.Controller
{
    class Program
    {
        private static IHubProxy hubProxy;

        static void Main(string[] args)
        {
            MainAsync().Wait();

            GetStartupTimeAsync().Wait();

            hubProxy.Invoke("MarioMan");

            Console.ReadLine();
        }

        static async Task<string> GetStartupTimeAsync()
        {
            string result = await hubProxy.Invoke<string>("GetStartupTime");
            
            return result;
        }

        static async Task MainAsync()
        {
            try
            {
                var hubConnection = new HubConnection("http://fishsim2014.azurewebsites.net/")
                {
                    TraceLevel = TraceLevels.All,
                    TraceWriter = Console.Out
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
