/// <reference path="Libs/jquery-blink.d.ts" />
/// <reference path="Libs/datejs.d.ts" />
/// <reference path="Libs/jquery.d.ts" />
/// <reference path="Libs/linq.d.ts" />
/// <reference path="Components/IComponent.ts" />

module FishSim
{
	export class App
	{
		public static components = <IComponent[]>[];

		public static fish: FishSim.Components.Fish;

		public static fps: number = 1;

		public static run(): void
		{
			$('.title').blink();

			this.components.push(this.fish = new FishSim.Components.Fish());

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
				// TODO: Need to make this loop safe for when 
				// components are added/removed dynamically within 
				// the loop itself. (e.g. a component may create
				// it's own components on the fly)
				var index = 0;
				while (index < App.components.length)
				{
					var component = App.components[index];

					component.tick(elapsed);

					index++;
				}
			}
			finally
			{
				this.lastTickTime = tickTime;
			}
		}
	}

	window.onload = () =>
	{
		App.run();
	};
}