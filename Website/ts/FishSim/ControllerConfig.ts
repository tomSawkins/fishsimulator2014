/// <reference path="../../scripts/typings/requirejs/require.d.ts" />

require.config({
	baseUrl: '/ts/FishSim',

	paths: {
		//main libraries
		"jquery": '../../Scripts/jquery-2.1.1',
		"knockout": '../../Scripts/knockout-3.2.0',
		"linq": '../../Scripts/linq',
		"bootstrap": '../../Scripts/bootstrap',
		"signalr.core": '../../Scripts/jquery.SignalR-2.1.2',

		//this might not work
		"signalr.hubs": '/signalr/hubs?',

		//shortcut paths
		"templates": 'Templates',
		"data": 'Data',
		"views": 'Views',
		"viewmodels": 'ViewModels',

		//require plugins
		"text": '../../Scripts/text'
	},

	shim: {
		"jquery": {
			exports: '$'
		},
		"bootstrap": {
			deps: ["jquery"]
		},
		'knockout': {
			deps: ["jquery"],
			exports: 'ko'
		},
		"signalr.core": {
			deps: ["jquery"],
			exports: "$.connection"
		},
		"signalr.hubs": {
			deps: ["signalr.core"],
		}
	}
}); 