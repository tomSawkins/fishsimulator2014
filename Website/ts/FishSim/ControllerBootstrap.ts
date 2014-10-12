/// <reference path="controllerconfig.ts" />
/// <reference path="controllerapp.ts" />
/// <reference path="../../scripts/typings/requirejs/require.d.ts" />
/// <reference path="../../scripts/typings/knockout/knockout.d.ts" />
/// <reference path="viewmodels/controller.ts" />
/**
 * Main entry point for RequireJS
 */

require(
	[
		'knockout',
		'jquery',
		'signalr.hubs',
		'ControllerApp',
	],
	(ko) => {
		'use strict';

		$(document).ready(() =>
		{
			// is there a way to "discover" components?
			ko.components.register('controller', { require: 'viewmodels/controller' });
			ko.components.register('environments', { require: 'viewmodels/environments' });
			ko.components.register('heading', { require: 'viewmodels/heading' });
			ko.components.register('mario-button', { require: 'viewmodels/mario-button' });

			new FishSim.ControllerApp().run();

			ko.applyBindings();
		});
	}
);