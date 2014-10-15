/// <reference path="../hubs.ts" />
module FishSim
{
	export interface IFish extends IComponent
	{
		makeBubble(): void;

        updateHealth(health: Health): void;
	}
} 