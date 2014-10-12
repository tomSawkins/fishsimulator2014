/// <amd-dependency path="text!views/environments.html"/>
/// <reference path="../../../scripts/typings/knockout/knockout.d.ts" />

import ko = require("knockout");

export var template: string = require("text!views/environments.html");

export class viewModel
{
	public environments: KnockoutObservableArray<String> = ko.observableArray<String>();

	public fishSimHubClient: KnockoutObservable<FishSimHubClient> = ko.observable<FishSimHubClient>();
	public fishSimHubServer: KnockoutObservable<FishSimHubServer> = ko.observable<FishSimHubServer>();

	constructor(params)
	{
		this.environments = params.environments;
		
		this.fishSimHubClient = params.fishSimHubClient;
		this.fishSimHubServer = params.fishSimHubServer;
	}
}