using System;
using Metrics;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;
using Owin.Metrics;

namespace FishSim2014
{
    public static class MetricsConfig
    {
        public static void Register(IAppBuilder app)
        {
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            Metric.Config
                .WithOwin(
                middleware => app.Use(middleware),
                config => config.WithMetricsEndpoint());
        }
    }
}