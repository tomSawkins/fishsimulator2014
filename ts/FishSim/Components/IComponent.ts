module FishSim
{
	export interface IComponent
	{
		// Each component must have an Id. Recommand just using the class name + a unique sequential number
		id: string;

		tick(elapsed: number): void;

		flaggedForRemoval?: boolean;

		// Called when component is removed from scene. 
		// Implement to perform any clean up such as removing any elements from the dom
		cleanUp?(): void;
	}
} 