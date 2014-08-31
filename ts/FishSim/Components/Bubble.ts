/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />

module FishSim.Components
{
	export class Bubble implements IComponent
	{
		private static bubbleCount = 0;

		constructor(position: IVector)
		{
			// Generate a new ID for this bubble
			Bubble.bubbleCount++;
			this.id = 'bubble' + Bubble.bubbleCount;

			// Dereference position
			position = Utils.clone(position);

			// Create the bubble element and add to the scene
			var content = '<div id="{id}" class="bubble"></div>'.format(this);
			$('body').append(content);
			this.element = $('#' + this.id);

			this.setPosition(position);
		}

		private element: JQuery;

		private position: IVector;

		public id: string;

		private setPosition(position: IVector)
		{
			this.element.css({ left: position.x + 'px', top: position.y + 'px' });
			this.position = position;
		}

		public tick(elapsed: number): void
		{
			// Speed in pixels per second
			var speed = 200;

			// Work out the distance to move based on speed and time passed
			var distanceToMove = speed * elapsed / 1000;

			// Work out new position
			var newPosition = {
				x: this.position.x,
				y: this.position.y - distanceToMove
			};

			newPosition.x += Math.sin(newPosition.y / 10) * 3;

			// Update position
			this.setPosition(newPosition);

			// If we've gone outside the top edge of the screen then 
			// we can be cleaned up
			if (this.position.y + this.element.height() < 0)
			{
				App.removeComponent(this);
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