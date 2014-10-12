using System;
using Autofac;
using FluentScheduler;
using Serilog;

namespace BuildMonitorService.ScheduledTasks
{
    public class AutofacTaskFactory : ITaskFactory
    {
        private readonly ILifetimeScope scope;

        public AutofacTaskFactory(ILifetimeScope scope)
        {
            this.scope = scope;
        }

        public ITask GetTaskInstance<T>() where T : ITask
        {
            Log.Information("AutofacTaskFactory Resolving {Type}", typeof (T).Name);

            try
            {
                var task = scope.Resolve<T>();
                return task;
            }
            catch (Exception e)
            {
                Log.Error(e, "Unable to resolve type <{Type}>", typeof (T).Name);
            }

            return null;
        }
    }
}