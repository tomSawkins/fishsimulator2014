using System;
using FishSim2014.Interfaces;

namespace FishSim2014.Models
{
    public class AppInfo
    {
        public AppInfo(IClock clock)
        {
            StartupTime = clock.GetUtcNow();
        }

        public DateTimeOffset StartupTime { get; private set; }
    }
}