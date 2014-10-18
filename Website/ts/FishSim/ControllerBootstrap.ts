/// <reference path="controllerconfig.ts" />
/// <reference path="controllerapp.ts" />
/// <reference path="../../scripts/typings/requirejs/require.d.ts" />
/// <reference path="../../scripts/typings/knockout/knockout.d.ts" />

//require.onResourceLoad = (context, map, depArray) =>
//{
//	console.log("RequireJs Resource Load: " + (<RequireMap>map).name);
//};


require(
	[
		'knockout',
		'ControllerApp',
		'jquery',
		'bootstrap',
		'signalr.hubs',
	],
	(ko, app) =>
	{
		'use strict';

		$(document).ready(() =>
		{
			// is there a way to "discover" components?
			ko.components.register('controller', { require: 'viewmodels/controller' });
			ko.components.register('environments', { require: 'viewmodels/environments' });
			ko.components.register('environment-button', { require: 'viewmodels/environment-button' });
			ko.components.register('heading', { require: 'viewmodels/heading' });
			ko.components.register('mario-button', { require: 'viewmodels/mario-button' });

			var instance = new app();

			ko.applyBindings(instance);

			instance.run();
		});
	}
);