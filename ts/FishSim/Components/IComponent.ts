module FishSim
{
	export interface IComponent
	{
		tick(elapsed: number): void;

		flaggedForRemoval?: boolean;
	}
} 