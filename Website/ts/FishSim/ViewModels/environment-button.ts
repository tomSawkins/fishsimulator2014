/// <amd-dependency path="text!views/environment-button.html"/>
/// <reference path="../../../scripts/typings/knockout/knockout.d.ts" />

import ko = require("knockout");

export var template: string = require("text!views/environment-button.html");

export class viewModel
{
	public name: KnockoutObservable<string> = ko.observable<string>();

	public fishSimHubClient: KnockoutObservable<FishSimHubClient> = ko.observable<FishSimHubClient>();
	public fishSimHubServer: KnockoutObservable<FishSimHubServer> = ko.observable<FishSimHubServer>();

	constructor(params)
	{
		this.name = params.name;

		this.fishSimHubClient = params.fishSimHubClient;
		this.fishSimHubServer = params.fishSimHubServer;
	}

	public environmentFailing(): void
	{
	    this.fishSimHubServer().updateEnvironment(this.name.toString(), Health.Failing);
	}

    public environmentOkay(): void {
        this.fishSimHubServer().updateEnvironment(this.name.toString(), Health.Okay);
    }

	public environmentAlert(): void
	{
		this.fishSimHubServer().showNotification(this.name.toString(), "hello world");
	}
}