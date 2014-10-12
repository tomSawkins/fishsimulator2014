using System.IO;
using Metrics;
using Metrics.Core;

namespace BuildMonitorService.HealthChecks
{
    public class DiskSpaceHealthCheck : HealthCheck
    {
        public DiskSpaceHealthCheck()
            : base("DiskSpace")
        {
        }

        protected override HealthCheckResult Check()
        {
            long freeDiskSpace = 0;

            string currentDrive = Path.GetPathRoot(Directory.GetCurrentDirectory());
            foreach (DriveInfo drive in DriveInfo.GetDrives())
            {
                if (drive.IsReady && drive.Name == currentDrive)
                {
                    freeDiskSpace = drive.TotalFreeSpace;
                }
            }

            if (freeDiskSpace <= 512)
            {
                return HealthCheckResult.Unhealthy("Not enough disk space: {0}", freeDiskSpace);
            }
            return HealthCheckResult.Healthy("Disk space ok: {0}", freeDiskSpace);
        }
    }
}