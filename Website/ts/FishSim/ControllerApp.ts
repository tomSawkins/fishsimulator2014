/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../scripts/typings/linq/linq.d.ts" />
/// <reference path="../../scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../scripts/typings/signalr/signalr.d.ts" />
/// <reference path="../../scripts/typings/webaudioapi/waa.d.ts" />
/// <reference path="Hubs.ts" />

import ko = require("knockout");

require(["jquery", "linq", "signalr.hubs"]);

class ControllerApp {
    public cachedStartupTime: KnockoutObservable<String> = ko.observable<String>();
    public environments: KnockoutObservableArray<String> = ko.observableArray<String>();

    public fishSimHubClient: KnockoutObservable<FishSimHubClient> = ko.observable<FishSimHubClient>();
    public fishSimHubServer: KnockoutObservable<FishSimHubServer> = ko.observable<FishSimHubServer>();
    private mp3Playing: boolean = false;

    constructor() {
    }

    public run(): void {
        this.fishSimHubClient($.connection.fishSimHub.client);
        this.fishSimHubServer($.connection.fishSimHub.server);

        //$.connection.hub.logging = true;

        this.fishSimHubClient().marioMan = () => {
            require(
                [
                    'mp3!../../images/cantina.mp3'
                ],
                (cantina) =>
                {
                    if (!this.mp3Playing)
                    {
                        var self = this;
                        self.mp3Playing = true;

                        //window.AudioContext = window.AudioContext || window.webkitAudioContext;
                        var context = new AudioContext();

                        var source = context.createBufferSource();
                        source.buffer = cantina;
                        source.connect(context.destination);
                        source.start(0);

                        var timer = setTimeout(() => {
                            console.log('playback finished');
                            self.mp3Playing = false;
                        }, source.buffer.duration * 1000);
                    }
                });
        };

        $.connection.hub.start().done(() => {
            this.fishSimHubServer().getConfig().done((config) => {
                console.log("SignalR Hub Starting -> Build Time: " + config.StartupTime);

                this.cachedStartupTime(config.StartupTime);

                Enumerable.From(config.Environments).ForEach((p: Environment) => {
                    this.environments.push(p.Name);
                });
            });
        });

        $.connection.hub.reconnected(() => {
            this.fishSimHubServer().getStartupTime().done((startupTime) => {
                console.log("reconnected startupTime: " + startupTime);
                console.log("cachedStartupTime: " + this.cachedStartupTime());

                if (this.cachedStartupTime() == null)
                    this.cachedStartupTime(startupTime);
                else if (startupTime != this.cachedStartupTime())
                    window.location.reload(true);
            });
        });
    }
}

export = ControllerApp;
