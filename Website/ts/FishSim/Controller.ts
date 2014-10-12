/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../scripts/typings/linq/linq.d.ts" />
/// <reference path="../../scripts/typings/signalr/signalr.d.ts" />
/// <reference path="Hubs.d.ts" />
module FishSim
{
    export class Controller
    {
        public static run(): void
        {
            var cachedStartupTime = null;

            var fishHub = $.connection.fishSimHub;

            $.connection.hub.logging = true;

            fishHub.client.marioMan = () =>
            {
                console.log("Mario Man Added");
            };

            $.connection.hub.start().done(() =>
            {
                fishHub.server.getConfig().done((config) =>
                {
                    console.log("SignalR Hub Starting -> Build Time: " + config.StartupTime);
                    cachedStartupTime = config.StartupTime;

                    Enumerable.From(config.Environments).ForEach((p: ClientEnvironment) =>
                    {
                        $("#environments").append('<a id="' + p.Name + '" class="btn btn-default col-lg-6 col-md-6 col-xs-12">' + p.Name + '</a>');
                        $("#" + p.Name).click(() =>
                        {
                            fishHub.server.marioMan();
                        });
                    });

                    $('#firezemissiles').click(() =>
                    {
                        fishHub.server.marioMan();
                    });
                });
            });

            $.connection.hub.reconnected(() =>
            {
                fishHub.server.getStartupTime().done((startupTime) =>
                {
                    console.log("reconnected startupTime: " + startupTime);
                    console.log("cachedStartupTime: " + cachedStartupTime);

                    if (cachedStartupTime == null)
                        cachedStartupTime = startupTime;
                    else if (startupTime != cachedStartupTime)
                        window.location.reload(true);
                });
            });
        }
    }

    window.onload = () =>
    {
        Controller.run();
    };
}