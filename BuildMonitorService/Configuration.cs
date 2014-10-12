using System.Configuration.Abstractions;

namespace BuildMonitorService
{
    public static class Configuration
    {
        public const string ServiceDescription = "Build Monitor Service";
        public const string ServiceDisplayName = "Build Monitor Service";
        public const string ServiceName = "BuildMonitorService";

        public static readonly string SeqServerAddress = ConfigurationManager.Instance.AppSettings.AppSetting<string>("seqServer", () => "http://localhost:5341/");
        public static readonly string MetricsEndpoint = ConfigurationManager.Instance.AppSettings.AppSetting<string>("metricsEndpoint", () => "http://localhost:1234/");

        public static readonly string PagerDutyDomain = ConfigurationManager.Instance.AppSettings.AppSetting<string>("pagerduty:domain", () => "");
        public static readonly string PagerDutyToken = ConfigurationManager.Instance.AppSettings.AppSetting<string>("pagerduty:token", () => "");

        public static readonly string HealthCheckBaseUrl = ConfigurationManager.Instance.AppSettings.AppSetting<string>("healthcheck:baseUrl", () => "http://localhost/");
        public static readonly bool HealthCheckEnabled = ConfigurationManager.Instance.AppSettings.AppSetting<bool>("healthcheck:enabled", () => true);
        public static readonly int HealthCheckSchedule = ConfigurationManager.Instance.AppSettings.AppSetting<int>("healthcheck:schedule", () => 1);

        public static readonly bool SampleTaskEnabled = ConfigurationManager.Instance.AppSettings.AppSetting<bool>("sampletask:enabled", () => true);
        public static readonly int SampleTaskSchedule = ConfigurationManager.Instance.AppSettings.AppSetting<int>("sampletask:schedule", () => 5);

        public static readonly ushort CircuitBreakerRetries = ConfigurationManager.Instance.AppSettings.AppSetting<ushort>("circuitbreaker:retries", () => 3);
        public static readonly double CircuitBreakerRetryInterval = ConfigurationManager.Instance.AppSettings.AppSetting<ushort>("circuitbreaker:retryinterval", () => 10);
        public static readonly double CircuitBreakerResetTimeout = ConfigurationManager.Instance.AppSettings.AppSetting<ushort>("circuitbreaker:resetinterval", () => 60);

        public static readonly decimal MinimumDiskSpace = ConfigurationManager.Instance.AppSettings.AppSetting<decimal>("healthcheck:minimumDiskSpace", () => 1000);
    }
}