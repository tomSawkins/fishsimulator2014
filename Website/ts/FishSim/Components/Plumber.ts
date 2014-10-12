/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="IComponent.ts" />
module FishSim.Components
{
    export enum PlumberCharacter
    {
        Mario,
        Luigi
    }

    export class Plumber implements IComponent
    {
        private static plumberCount = 0;

        constructor(character: PlumberCharacter, y: number)
        {
            // Generate a new ID for this bubble
            this.id = 'plumber' + Plumber.plumberCount++;

            this.originY = y;

            // Dereference position
            var position: IVector = {
                x: -16,
                y: y
            };

            // Create the element and add to the scene
            var content = '<div id="{id}" class="plumber"></div>'.format(this);
            $('body').append(content);
            this.element = $('#' + this.id);

            if (character == PlumberCharacter.Mario)
            {
                this.element.addClass('mario');
            }
            else
            {
                this.element.addClass('luigi');
            }

            this.setPosition(position);
        }

        private element: JQuery;

        private originY: number;

        private position: IVector;

        public id: string;

        public bubbleType: string;

        private setPosition(position: IVector)
        {
            this.element.css({ left: position.x + 'px', top: position.y + 'px' });
            this.position = position;
        }

        private currentFrameIndex = -1;

        public tick(time: ITime): void
        {
            if (FishSim.App.paused)
            {
                return;
            }

            // Number of different frames in the animation
            var frameCount = 3;

            // Number of frames to animate per second
            var fps = 5;

            // Which frame should we be displaying right now?
            var frameIndex = Math.floor((time.total / (1000 / fps)) % frameCount);

            // Swap out the class which says which frame we're on
            if (frameIndex != this.currentFrameIndex)
            {
                if (this.currentFrameIndex > -1)
                {
                    this.element.removeClass('swim' + this.currentFrameIndex);
                }

                this.element.addClass('swim' + frameIndex);

                this.currentFrameIndex = frameIndex;
            }

            // Speed in pixels per second
            var speed = 150;

            // Work out the distance to move based on speed and time passed
            var distanceToMove = speed * time.elapsed / 1000;

            // Calculate a y offset so our guy swims in an arc
            var arcWidth = $(window).width() / 6;
            var radians = Math.PI * (this.position.x % arcWidth) / arcWidth;
            var arcHeight = Math.sin(radians) * 100;

            // Work out new position
            var newPosition = {
                x: this.position.x + distanceToMove,
                y: this.originY - arcHeight
            };

            //newPosition.x += Math.sin(newPosition.y / 10) * 3;

            // Update position
            this.setPosition(newPosition);

            // If we've gone outside the top edge of the screen then 
            // we can be cleaned up
            if (this.position.x > $(window).width())
            {
                App.removeComponent(this);
            }
        }

        public cleanUp(): void
        {
            // Remove bubble from dom
            var body = document.getElementById('body');
            var element = document.getElementById(this.id);
            body.removeChild(element);

            this.element = null;
        }
    }
}