﻿using System.Collections.Generic;

namespace FishSim2014.Models
{
	public class ClientConfig
	{
		public ClientConfig()
		{
			Environments = new List<ClientEnvironment>();
		}

		public string BuildTime { get; set; }
		public List<ClientEnvironment> Environments { get; set; }
	}
}