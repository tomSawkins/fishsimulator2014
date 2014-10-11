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
        static void Main(string[] args)
        {
            MainAsync().Wait();
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
                
                IHubProxy hubProxy = hubConnection.CreateHubProxy("FishSimHub");
/*
                hubProxy.On("addMessage", data =>
                {
                    Console.WriteLine("Incoming data: {0} {1}", data.name, data.message);
                });
*/
                await hubConnection.Start();
            }
            catch (Exception ex)
            {

            }
        }
    }
}
