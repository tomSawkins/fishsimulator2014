/// <reference path="../ITime.d.ts" />
/// <reference path="IVector.ts" />
/// <reference path="../Extensions.ts" />
/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />

module FishSim.Components
{
	export class FishFlag implements IComponent
	{
		private static seaweedCount = 0;

		private updateLoop: number = 250;
		private element: JQuery;

		public id: string;

		constructor()
		{
			// Generate a new ID
			this.id = 'fish-flag';
			
			// Create the bubble element and add to the scene
			var content = '<div id="{id}" class="fish-flag"></div>'.format(this);
			$('body').append(content);
			this.element = $('#' + this.id);

		}

		public tick(time: ITime): void
		{
		}

		public cleanUp(): void
		{
			// Remove bubble from dom
			var body = document.getElementById('body');
			var element = document.getElementById(this.id);
			body.removeChild(element);

			this.element = null;

		}
	}
}