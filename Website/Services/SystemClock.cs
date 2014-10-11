using System;
using FishSim2014.Interfaces;

namespace FishSim2014.Services
{
    public class SystemClock : IClock
    {
        public DateTimeOffset GetUtcNow()
        {
            return DateTimeOffset.UtcNow;
        }
    }
}