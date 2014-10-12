/// <amd-dependency path="text!views/mario-button.html"/>
/// <reference path="../../../scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../Hubs.d.ts" />

import ko = require("knockout");

export var template: string = require("text!views/mario-button.html");

export class viewModel
{
	public fishSimHubClient: KnockoutObservable<FishSimHubClient> = ko.observable<FishSimHubClient>();
	public fishSimHubServer: KnockoutObservable<FishSimHubServer> = ko.observable<FishSimHubServer>();

	constructor(params)
	{
		this.fishSimHubClient = params.fishSimHubClient;
		this.fishSimHubServer = params.fishSimHubServer;
	}

	public requestMario()
	{
		this.fishSimHubServer().marioMan();
	}
}