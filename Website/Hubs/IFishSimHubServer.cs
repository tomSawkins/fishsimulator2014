using FishSim2014.Models;

namespace FishSim2014.Hubs
{
    public interface IFishSimHubServer
    {
        string GetStartupTime();

        ClientConfig GetConfig();

        void MarioMan();

	    void UpdateEnvironment(string name, Health health);

		void ShowNotification(string name, string message);
    }
}