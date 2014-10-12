using System.Collections.Generic;

namespace FishSim2014.Models
{
    public class ClientConfig
    {
        public ClientConfig()
        {
            Environments = new List<Environment>();
        }

        public string StartupTime { get; set; }

        public List<Environment> Environments { get; set; }
    }
}