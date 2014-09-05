/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />

module FishSim.Components
{
	export class Plumber implements IComponent
	{
		private static plumberCount = 0;

		constructor(y: number)
		{
			// Generate a new ID for this bubble
			this.id = 'plumber' + Plumber.plumberCount++;

			// Dereference position
			var position: IVector = {
				x: -16,
				y: y
			};

			// Create the element and add to the scene
			var content = '<div id="{id}" class="plumber"><div><div></div></div></div>'.format(this);
			$('body').append(content);
			this.element = $('#' + this.id);
			this.imageElement = this.element.find('div').find('div');

			this.setPosition(position);
		}

		private element: JQuery;

		private imageElement: JQuery;

		private position: IVector;

		public id: string;

		public bubbleType: string;

		private setPosition(position: IVector)
		{
			this.element.css({ left: position.x + 'px', top: position.y + 'px' });
			this.position = position;
		}

		private currentFrameIndex = -1;

		public tick(time: ITime): void
		{
			if (FishSim.App.paused)
			{
				return;
			}

			// Number of different frames in the animation
			var frameCount = 3;

			// Number of frames to animate per second
			var fps = .5;

			// Which frame should we be displaying right now?
			var frameIndex = Math.floor((time.total / (1000 / fps)) % frameCount);

			// Swap out the class which says which frame we're on
			if (frameIndex != this.currentFrameIndex)
			{
				if (this.currentFrameIndex > -1)
				{
					this.imageElement.removeClass('swim' + this.currentFrameIndex);
				}

				this.imageElement.addClass('swim' + frameIndex);

				this.currentFrameIndex = frameIndex;
			}

			// Speed in pixels per second
			var speed = 100;

			// Work out the distance to move based on speed and time passed
			var distanceToMove = speed * time.elapsed / 1000;

			// Work out new position
			var newPosition = {
				x: this.position.x + distanceToMove,
				y: this.position.y
			};

			//newPosition.x += Math.sin(newPosition.y / 10) * 3;

			// Update position
			this.setPosition(newPosition);

			// If we've gone outside the top edge of the screen then 
			// we can be cleaned up
			if (this.position.x > $(window).width())
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