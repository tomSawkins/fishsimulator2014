/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />

module FishSim.Components
{
	export class Bubble implements IComponent
	{
		private static bubbleCount = 0;

		private element: JQuery;

		private position: IVector;

		constructor(position: IVector)
		{
			// Generate a new ID for this bubble
			Bubble.bubbleCount++;
			var id = 'bubble' + Bubble.bubbleCount;

			// Create the bubble element and add to the scene
			var content = '<div id="{id}" class="bubble"></div>'.format({ id: id });
			this.element = $('body').append(content);

			this.setPosition(position);
		}

		private setPosition(position: IVector)
		{
			this.element.css({ left: position.x + 'px', top: position.y + 'px' });
			this.position = position;
		}

		public tick(elapsed: number): void
		{
			// Speed is pixels per second
			var speed = 150;

			var distanceToMove = speed * elapsed / 1000;

			this.setPosition({ x: this.position.x, y: this.position.y - distanceToMove });

			// If we've gone outside the top edge of the screen then 
			// we can be cleaned up
			if (this.position.y + this.element.height() < 0)
			{
				App.removeComponent(this);
			}
		}
	}
}