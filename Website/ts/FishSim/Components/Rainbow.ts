/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="IComponent.ts" />
module FishSim.Components
{
    export class Rainbow implements IComponent
    {
        private static count = 0;

        constructor(position: IVector, momentum: IVector, maxLifeTime: number)
        {
            // Generate a new ID for this rainbow
            Rainbow.count++;
            this.id = 'rainbow' + Rainbow.count;

            // Dereference position
            position = Utils.clone(position);

            // Create the element and add to the scene
            var content = '<div id="{id}" class="rainbow"></div>'.format(this);
            $('body').append(content);
            this.element = $('#' + this.id);

            this.setPosition(position);

            this.momentum = momentum;
            this.maxLifeTime = maxLifeTime;

            this.element.animate({ opacity: 0 }, maxLifeTime);
        }

        private element: JQuery;

        private position: IVector;

        private momentum: IVector;

        private maxLifeTime: number;

        public id: string;

        private setPosition(position: IVector)
        {
            this.element.css({ left: position.x + 'px', top: position.y + 'px' });
            this.position = position;
        }

        public tick(time: ITime): void
        {
            if (FishSim.App.paused)
            {
                return;
            }

            // Work out new position based on current position, speed & direction, and time passed
            var newPosition = {
                x: this.position.x + this.momentum.x * time.elapsed / 1000,
                y: this.position.y + this.momentum.y * time.elapsed / 1000
            };

            // Update position
            this.setPosition(newPosition);

            // If we've exceeded our lifespan then let's remove this rainbow from 
            // the scene
            this.maxLifeTime -= time.elapsed;
            if (this.maxLifeTime <= 0)
            {
                App.removeComponent(this);
            }
        }

        public cleanUp(): void
        {
            // Remove element from dom
            var body = document.getElementById('body');
            var element = document.getElementById(this.id);
            body.removeChild(element);

            this.element = null;
        }
    }
}