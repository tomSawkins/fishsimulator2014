/// <reference path="IVector.ts" />
/// <reference path="../Extensions.ts" />
/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="IComponent.ts" />
/// <reference path="fish.ts" />

module FishSim.Components
{
    export class SeaPony extends Fish
    {
        public tick(time: ITime): void
        {
            super.tick(time);

            if (Math.chance(time.elapsed, 2000))
            {
                this.launchRainbowAttack();
            }
        }

        private launchRainbowAttack(): void
        {
            var position = Fish.tileToScreen(this.tilePosition);

            var momentum = <IVector>{
                x: 500 * (this.isFacingRight ? 1 : -1),
                y: 0
            };

            var rainbow = new Rainbow(position, momentum, 2000);

            App.addComponent(rainbow);
        }
    }
}