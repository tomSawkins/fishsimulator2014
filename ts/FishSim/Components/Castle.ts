/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="IComponent.ts" />

module FishSim.Components
{
	export class Castle implements IComponent
	{
		constructor()
		{
			// Generate a new ID for this bubble
			this.id = 'castle';

			// Create the bubble element and add to the scene
			var content = '<div id="{id}"></div>'.format(this);
			$('body').append(content);
			this.element = $('#' + this.id);
		}

		private element: JQuery;

		private position: IVector;

		public id: string;

		public tick(time: ITime): void
		{
		}

		public cleanUp(): void
		{
			// Remove element from dom
			var body = document.getElementById('body');
			var element = document.getElementById(this.id);
			body.removeChild(element);

			this.element = null;
		}
	}
}