/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />

module FishSim.Components
{
	export class DeathAnimation implements IComponent
	{
		constructor()
		{
		}

		public id: string;

		public tick(time: ITime): void
		{
		}

		public cleanUp(): void
		{
		}
	}
}