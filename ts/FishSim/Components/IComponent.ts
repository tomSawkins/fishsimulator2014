module FishSim
{
	export interface IComponent
	{
		// Each component must have an Id. Recommand just using the class name + a unique sequential number
		id: string;

		// Fired every frame. elapsed is the number of Milliseconds that have passed since the last tick
		tick(elapsed: number): void;

		// Used by App class. Do not use directly
		flaggedForRemoval?: boolean;

		// Called when component is removed from scene. 
		// Implement to perform any clean up such as removing any elements from the dom
		cleanUp?(): void;

		keydown?(event: JQueryKeyEventObject): void;

		keypress?(event: JQueryKeyEventObject): void;

		keyup?(event: JQueryKeyEventObject): void;
	}
} 