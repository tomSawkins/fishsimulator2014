using FishSim2014.Models;

namespace FishSim2014.Hubs
{
    public interface IFishSimHubClient
    {
        void MarioMan();

        void UpdateEnvironment(string name, Health health);
    }
}