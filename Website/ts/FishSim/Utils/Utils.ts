module FishSim.Utils
{
    export enum HealthStatus
    {
        Healthy,
        Poorly
    }

    export class HealthCheckResponse
    {
        status: HealthStatus;
        description: string;
    }

    export var checkServerHealth = function(
        serverName: string,
        callback: (args: HealthCheckResponse) => void): void
    {
        // ts9.tatts.com
        var url = 'https://' + serverName + '/HealthCheck.aspx?extendedInfo=true';

        var settings: JQueryAjaxSettings = {
            type: 'GET',
            url: url,
            async: true,
            success: (data: any, textStatus: string, jqXHR: JQueryXHR) =>
            {
                var args: HealthCheckResponse = {
                    status: HealthStatus.Healthy,
                    description: ''
                };

                var html: string = data;

                var re = new RegExp('([^<>]*)<font.*?>(.*?)</font>', 'gi');

                var match = re.exec(html);

                var everythingIsAwesome = true;

                while (match)
                {
                    var component = match[1].replace('&nbsp;', '').trim();
                    var componentStatus = match[2].trim();

                    args.description += component + ': ' + componentStatus + '\n';

                    if (componentStatus != 'OK')
                    {
                        everythingIsAwesome = false;
                    }

                    match = re.exec(html);
                }

                args.status = everythingIsAwesome ? HealthStatus.Healthy : HealthStatus.Poorly;
                args.description = args.description.trim();
            },
            error: () =>
            {
                return <HealthCheckResponse>{
                    status: HealthStatus.Poorly,
                    description: 'Could not reach Health Check page for ' + serverName
                };
            }
        };

        $.ajax(settings);
    };


    export var clone = function(object: any): any
    {
        var result;

        // Handle the 3 simple types, and null or undefined
        if (object == null || typeof object != 'object')
        {
            return object;
        }

        // Handle Date
        if (object instanceof Date)
        {
            result = new Date();
            result.setTime(object.getTime());
            return result;
        }

        // Handle Array
        if (object instanceof Array)
        {
            result = [];
            for (var index = 0, len = object.length; index < len; index++)
            {
                result[index] = this.clone(object[index]);
            }
            return result;
        }

        // Handle Object
        if (object instanceof Object)
        {
            result = {};
            for (var property in object)
            {
                if (object.hasOwnProperty(property))
                {
                    result[property] = this.clone(object[property]);
                }
            }
            return result;
        }

        throw 'Unsupported type "' + typeof object + '"';
    };
}