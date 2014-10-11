/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="IComponent.ts" />

module FishSim.Components
{
	export class Seaweed implements IComponent
	{

		private static seaweedCount = 0;

		private updateLoop: number = 250;
		private element: JQuery;

		public id: string;

		constructor(xPosition: number)
		{
			// Generate a new ID
			Seaweed.seaweedCount++;
			this.id = 'seaweed' + Seaweed.seaweedCount;
			
			// Create the bubble element and add to the scene
			var content = '<div id="{id}" class="seaweed"></div>'.format(this);
			$('body').append(content);
			this.element = $('#' + this.id);

			// Assign a random opacity & position
			this.element.css({ opacity: 0.5 + (Math.randomRange(1, 5) * 0.1) });
			this.setPosition(xPosition);
		}

		private setPosition(xPosition: number)
		{
			this.element.css({ left: xPosition + 'px' });
		}

		private makeBubble(): void
		{
			var bubble = new Bubble({
				x: this.element.position().left,
				y: this.element.position().top
			}, true);

			App.addComponent(bubble);
		}

		public tick(time: ITime): void
		{
			// Chance a bubble to occur roughly every x milliseconds
			if (Math.chance(time.elapsed, 15000))
			{
				this.makeBubble();
			}
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