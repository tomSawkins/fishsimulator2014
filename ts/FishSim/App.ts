/// <reference path="Libs/datejs.d.ts" />
/// <reference path="Libs/jquery.d.ts" />
/// <reference path="Libs/linq.d.ts" />
/// <reference path="Components/IComponent.ts" />

module FishSim
{
	export class Sim
	{
		public static components = <IComponent[]>[];

		public static fps: number = 50;

		public static run(): void
		{
			alert('running');

			this.lastTickTime = <IDateJS>(new Date());

			setInterval(this.tick, this.fps);
		}

		private static lastTickTime: IDateJS;

		private static tick(): void
		{
			var tickTime = new Date();
			var elapsed = tickTime.getTime() - this.lastTickTime.getTime();

			var index = 0;
			while (index < this.components.length)
			{
				var component = this.components[index];

				component.tick(elapsed);
			}
		}
	}

	window.onload = () =>
	{
		Sim.run();
	};
}