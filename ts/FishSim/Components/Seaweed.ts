/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />

module FishSim.Components
{
	export class Seaweed implements IComponent
	{

		private static seaweedCount = 0;
		private updateLoop: number = 250;


		constructor()
		{
			// Generate a new ID
			Seaweed.seaweedCount++;
			this.id = 'seaweed' + Seaweed.seaweedCount;
			
			// Create the bubble element and add to the scene
			var content = '<div id="{id}" class="seaweed"></div>'.format(this);
			$('body').append(content);
			this.element = $('#' + this.id);

			this.setPosition();
		}

		private element: JQuery;

		private position: IVector;

		public id: string;

		private setPosition()
		{
			var screenWidth:number = $(window).width()
			var screenHeight: number = $(window).height()
			var randomXPos: number = Math.randomRange(10, screenWidth - 10);

			this.element.css({ left: randomXPos + 'px', top: (screenHeight - 100) + 'px' });
		}

		public tick(elapsed: number): void
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