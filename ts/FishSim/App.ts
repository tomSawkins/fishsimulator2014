/// <reference path="Libs/jquery-blink.d.ts" />
/// <reference path="Libs/datejs.d.ts" />
/// <reference path="Libs/jquery.d.ts" />
/// <reference path="Libs/linq.d.ts" />
/// <reference path="Components/IComponent.ts" />

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

		public static fish: FishSim.Components.Fish;

		public static fps: number = 25;

		public static run(): void
		{
			$('.title').blink();

			// Subscribe to events
			var body = $('body');

			body.keydown((e) => this.keydown(e));

			body.keypress((e) => this.keypress(e));

			body.keyup((e) => this.keyup(e));

			// Add components to the scene here (or alternatively on the fly within your own components)
			this.addComponent(this.fish = new FishSim.Components.Fish('ts8'));
			this.addComponent(this.fish = new FishSim.Components.Fish('ts9'));

			this.lastTickTime = <IDateJS>(new Date());

			setInterval(() =>
			{
				this.tick();
			},
			1000 / this.fps);
		}

		private static lastTickTime: IDateJS;

		private static tick(): void
		{
			var tickTime = <IDateJS>(new Date());
			var elapsed = tickTime.getTime() - this.lastTickTime.getTime();

			try
			{
				// Loop through each component in the scene and call their tick handler
				this.forEachComponent((component: IComponent) =>
				{
					component.tick(elapsed);
				});
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
			this.forEachComponent((component: IComponent) =>
			{
				if (component.keyup)
				{
					component.keyup(event);
				}
			});
		}
	}

	window.onload = () =>
	{
		App.run();
	};
}