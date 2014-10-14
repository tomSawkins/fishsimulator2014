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

            if (this.state == FishState.Idle)
            {
                if (Math.chance(time.elapsed, 10000))
                {
                    this.launchRainbowAttack();
                }
            }
        }

        private launchRainbowAttack(): void
        {
            var position = Fish.tileToScreen(this.tilePosition);

            if (!this.isFacingRight)
            {
                position.x += 86;
            }

            position.y += 30;

            var momentum = <IVector>{
                x: 500 * (this.isFacingRight ? -1 : 1),
                y: 0
            };

            var rainbow = new Rainbow(position, momentum, 1000);

            App.addComponent(rainbow);
        }
    }
}