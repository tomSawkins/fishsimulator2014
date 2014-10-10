﻿/// <reference path="ITime.d.ts" />
/// <reference path="Components/Plumber.ts" />
/// <reference path="Libs/jquery-blink.d.ts" />
/// <reference path="Libs/datejs.d.ts" />
/// <reference path="Libs/jquery.d.ts" />
/// <reference path="Libs/linq.d.ts" />
/// <reference path="Components/IComponent.ts" />
/// <reference path="Components/IVector.ts" />
/// <reference path="Components/Seaweed.ts" />

module FishSim
{
	export class App
	{
		private static components = <IComponent[]>[];

		public static addComponent(component: IComponent)
		{
			this.components.push(component);
		}

		public static removeComponent(component: IComponent)
		{
			component.flaggedForRemoval = true;

			if (component.cleanUp)
			{
				component.cleanUp();
			}

			if (this.loopingThruComponentsCount == 0)
			{
				this.removeFlaggedComponents();
			}
		}

		private static removeFlaggedComponents(): void
		{
			var index = 0;
			while (index < this.components.length)
			{
				if (this.components[index].flaggedForRemoval)
				{
					this.components.splice(index, 1);
				}
				else
				{
					index++;
				}
			}
		}

		private static loopingThruComponentsCount = 0;

		public static forEachComponent(action: (IComponent) => any): void
		{
			this.loopingThruComponentsCount++;
			try
			{
				// Do a while loop to allow for additions to the components array
				var index = 0;
				while (index < this.components.length)
				{
					var component = this.components[index];

					if (!component.flaggedForRemoval)
					{
						action(component);
					}

					index++;
				}
			}
			finally
			{
				this.loopingThruComponentsCount--;

				if (this.loopingThruComponentsCount == 0)
				{
					this.removeFlaggedComponents();
				}
			}
		}

		public static getComponentById(id: string): FishSim.IComponent
		{
			return Enumerable.From(this.components)
				.FirstOrDefault(null, c => c.id == id);
		}

		public static ts8: FishSim.Components.Fish;
		public static ts9: FishSim.Components.Fish;

		public static fps: number = 25;

		public static paused: boolean = false;

		private static startTime: number;

		public static run(): void
		{
			$('.title').blink();

			// Subscribe to events
			var body = $('body');

			body.keydown((e) => this.keydown(e));

			body.keypress((e) => this.keypress(e));

			body.keyup((e) => this.keyup(e));

			// Add components to the scene here (or alternatively on the fly within your own components)
			this.addComponent(this.ts8 = new FishSim.Components.Fish('ts8'));
			this.addComponent(this.ts9 = new FishSim.Components.Fish('ts9'));
			this.addComponent(new FishSim.Components.Castle());
			this.addComponent(new FishSim.Components.FishFlag());

			// Add a bunch of seaweed
			var seaweedCount = 7;
			var screenWidth: number = $(window).width()
			var space = (screenWidth / seaweedCount + 1);
			for (var i = 0; i < seaweedCount; i++)
			{
				var x = space * (i + 1) - (space / 2) + Math.randomRange(0, space);

				this.addComponent(new FishSim.Components.Seaweed(x));
			}

			this.startTime = (new Date()).getTime();
			this.lastTickTime = this.startTime;

			setInterval(() =>
			{
				this.tick();
			},
			1000 / this.fps);
		}

		private static lastTickTime: number;

		private static tick(): void
		{
			var tickTime = (new Date()).getTime();

			var time: ITime = {
				elapsed: tickTime - this.lastTickTime,
				total: tickTime - this.startTime
			};

			try
			{
				if (!this.paused)
				{
					// Once an hour or so...
					if (Math.chance(time.elapsed, 1000 * 60 * 60))
					{
						this.addPlumber();
					}

					// Loop through each component in the scene and call their tick handler
					this.forEachComponent((component: IComponent) =>
					{
						component.tick(time);
					});
				}
			}
			finally
			{
				this.lastTickTime = tickTime;
			}
		}

		private static keydown(event: JQueryKeyEventObject)
		{
			this.forEachComponent((component: IComponent) =>
			{
				if (component.keydown)
				{
					component.keydown(event);
				}
			});
		}

		private static keypress(event: JQueryKeyEventObject)
		{
			this.forEachComponent((component: IComponent) =>
			{
				if (component.keypress)
				{
					component.keypress(event);
				}
			});
		}

		private static keyup(event: JQueryKeyEventObject)
		{
			if (event.keyCode == 80) // P
			{
				// Pause / Resume the sim
				this.paused = !this.paused;
			}
			else if (event.keyCode == 77) // M
			{
				// It's a me...
				this.addPlumber(Components.PlumberCharacter.Mario);
			}
			else if (event.keyCode == 76) // L
			{
				// It's a me...
				this.addPlumber(Components.PlumberCharacter.Luigi);
			}

			this.forEachComponent((component: IComponent) =>
			{
				if (component.keyup)
				{
					component.keyup(event);
				}
			});
		}

		private static addPlumber(character?: FishSim.Components.PlumberCharacter): void
		{
			var y = Math.randomRange(100, $(window).height() - 150);

			if (character === undefined)
			{
				character = Math.randomRange(0, 1);
			}

			this.components.push(new FishSim.Components.Plumber(character, y));
		}
	}

	window.onload = () =>
	{
		App.run();
	};
}