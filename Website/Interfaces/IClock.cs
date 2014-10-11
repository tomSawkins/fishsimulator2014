using System;

namespace FishSim2014.Interfaces
{
    public interface IClock
    {
        DateTimeOffset GetUtcNow();
    }
}