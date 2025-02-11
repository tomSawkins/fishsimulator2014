﻿/// <reference path="IVector.ts" />
/// <reference path="../Extensions.ts" />
/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="IComponent.ts" />
module FishSim.Components
{
    export enum FishState
    {
        Idle,
        Moving,
        Dying,
        Dead,
        Reviving,
    }

    export class Fish implements IFish
    {
        private static maxTileCounts: IVector = { x: 10, y: 8 };

        private screenSize: IVector;

        private tileSize: IVector;

        private health = Health.Unknown;

        constructor(id)
        {
            this.calculateDimensions();

            var body = $('body');

            // Generate a new ID for the fishy
            this.id = id;

            body.append('<div id="{id}" class="fish swim0"></div>'.format(this));

            this.element = $('#' + this.id);

            // Pick a random starting tile
            this.tilePosition = {
                x: Math.randomRange(0, Fish.maxTileCounts.x - 1),
                y: Math.randomRange(0, Fish.maxTileCounts.y - 1)
            };

            this.moveToTile({ tile: this.tilePosition, animate: false });

            // Handle window resize event
            $(window).resize(() =>
            {
                this.calculateDimensions();
            });
        }

        public id: string;

        private element: JQuery;

        public state: FishState = FishState.Idle;

        public isFacingRight: boolean = true;

        public tilePosition: IVector;

        private canMoveToTile(tile: IVector): boolean
        {
            if (tile.x >= 0 && tile.x < Fish.maxTileCounts.x &&
                tile.y >= 0 && tile.y < Fish.maxTileCounts.y)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private getAvailableTilePositions(): IVector[]
        {
            var result = <IVector[]>[];

            var min = {
                x: this.tilePosition.x - 1,
                y: this.tilePosition.y - 1
            };

            var max = {
                x: this.tilePosition.x + 1,
                y: this.tilePosition.y + 1
            };

            for (var x = min.x; x <= max.x; x++)
            {
                for (var y = min.y; y <= max.y; y++)
                {
                    if (x == this.tilePosition.x && y == this.tilePosition.y)
                    {
                        continue;
                    }

                    var position = { x: x, y: y };

                    if (this.canMoveToTile(position))
                    {
                        result.push(position);
                    }
                }
            }

            return result;
        }

        private calculateDimensions(): void
        {
            this.screenSize = {
                x: $(window).width(),
                y: $(window).height()
            };

            this.tileSize = {
                x: Math.floor(this.screenSize.x / Fish.maxTileCounts.x),
                y: Math.floor(this.screenSize.y / Fish.maxTileCounts.y)
            };
        }

        private swimmingFrameIndex = 0;

        public tick(time: ITime): void
        {
            if (this.state == FishState.Idle)
            {
                // Chance a movement animation roughly every x milliseconds
                if (Math.chance(time.elapsed, 5000))
                {
                    this.moveRandomly();
                }
            }

            if (this.state == FishState.Idle || this.state == FishState.Moving)
            {
                // Chance a bubble to occur roughly every x milliseconds
                if (Math.chance(time.elapsed, 3000))
                {
                    this.makeBubble();
                }

                // Animate the fishy swimming
                var swimmingFrameCount = 2;
                var swimmingFramesPerSecond = 2;
                var swimmingFrameDuration = 1000 / swimmingFramesPerSecond;
                var totalFramesPast = Math.floor(time.total / swimmingFrameDuration);
                var swimmingFrameIndex = totalFramesPast % swimmingFrameCount;

                if (this.swimmingFrameIndex != swimmingFrameIndex)
                {
                    this.element.removeClass("swim" + this.swimmingFrameIndex);
                    this.swimmingFrameIndex = swimmingFrameIndex;
                    this.element.addClass("swim" + this.swimmingFrameIndex);
                }
            }
        }

        public static tileToScreen(tile: IVector): IVector
        {
            return {
                x: ($(window).width() / Fish.maxTileCounts.x) * tile.x,
                y: ($(window).height() / Fish.maxTileCounts.y) * tile.y
            };
        }

        private moveToTile(options: { tile: IVector; animate: boolean; duration?: number }): void
        {
            // Translate from tile to screen
            var screen = Fish.tileToScreen(options.tile);

            // Center element within tile
            screen.x = Math.floor(screen.x + (this.tileSize.x / 2) - (this.element.width() / 2));
            screen.y = Math.floor(screen.y + (this.tileSize.y / 2) - (this.element.height() / 2));

            var rotationAmount = 0;
            if (options.tile.y < this.tilePosition.y)
            {
                // Move up
                rotationAmount = Math.randomRange(-10, -5);
            }
            else if (options.tile.y > this.tilePosition.y)
            {
                // Move down
                rotationAmount = Math.randomRange(5, 10);
            }
            var scaleXAmount = this.element.css('scaleX') || 1;
            if (options.tile.x < this.tilePosition.x)
            {
                // face left
                scaleXAmount = -1;
                this.isFacingRight = false;
            }
            else if (options.tile.x > this.tilePosition.x)
            {
                // face right
                scaleXAmount = 1;
                this.isFacingRight = true;
            }

            var preAnimateProperties = {
                scaleX: scaleXAmount
            };

            var properties = {
                left: screen.x + 'px',
                top: screen.y + 'px',
                rotate: rotationAmount + 'deg',
                scaleX: scaleXAmount
            };

            this.tilePosition = Utils.clone(options.tile);

            // To stop the flip from animating, apply the scale transform before the animation
            this.element.css(preAnimateProperties);

            if (options.animate)
            {
                this.element.animate(
                    properties,
                    options.duration || 1000,
                    () =>
                    {
                        this.state = FishState.Idle;
                    });
            }
            else
            {
                this.element.css(properties);

                this.state = FishState.Idle;
            }
        }

        private moveRandomly(): void
        {
            this.state = FishState.Moving;

            // Pick a random available tile to move to
            var availableTiles = this.getAvailableTilePositions();

            if (availableTiles.length == 0)
            {
                console.log('no available tiles to move to');
            }

            var tile = availableTiles[Math.randomRange(0, availableTiles.length - 1)];

            this.moveToTile({ tile: tile, animate: true });
        }

        public makeBubble(): void
        {
            var bubble = new Bubble({
                x: this.element.position().left,
                y: this.element.position().top
            });

            App.addComponent(bubble);
        }

        public keyup(e: JQueryKeyEventObject)
        {
            if (this.state == FishState.Idle)
            {
                var newPosition = Utils.clone(this.tilePosition);

                //alert(e.keyCode);
                switch (e.keyCode)
                {
                    case 37: // Left
                        newPosition.x--;
                        break;

                    case 38: // Up
                        newPosition.y--;
                        break;

                    case 39: // Right
                        newPosition.x++;
                        break;

                    case 40: // Down
                        newPosition.y++;
                        break;

                    case 32: // Space
                        this.makeBubble();
                        break;
                }

                if (newPosition.x != this.tilePosition.x || newPosition.y != this.tilePosition.y)
                {
                    if (this.canMoveToTile(newPosition))
                    {
                        this.state = FishState.Moving;

                        this.moveToTile({ tile: newPosition, animate: true, duration: 250 });
                    }
                }
            }
        }

        public updateHealth(health: Health): void
        {
            if ((health == Health.Failing) == (this.state == FishState.Dying || this.state == FishState.Dead))
            {
                return;
            }

            var deadClassName = "dead";

            if (health == Health.Failing)
            {
                if (!this.element.hasClass(deadClassName))
                {
                    this.element.addClass(deadClassName);
                    this.state = FishState.Dead;
                }
            }
            else
            {
                if (this.element.hasClass(deadClassName))
                {
                    this.element.removeClass(deadClassName);
                    this.state = FishState.Idle;
                }
            }
        }
    }
}