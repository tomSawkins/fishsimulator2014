var FishSim;
(function (FishSim) {
    /// <reference path="IVector.ts" />
    /// <reference path="../Extensions.ts" />
    /// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
    /// <reference path="IComponent.ts" />
    (function (Components) {
        (function (FishState) {
            FishState[FishState["Idle"] = 0] = "Idle";
            FishState[FishState["Moving"] = 1] = "Moving";
            FishState[FishState["Dying"] = 2] = "Dying";
            FishState[FishState["Dead"] = 3] = "Dead";
        })(Components.FishState || (Components.FishState = {}));
        var FishState = Components.FishState;

        var Fish = (function () {
            function Fish(id) {
                var _this = this;
                this.state = 0 /* Idle */;
                this.calculateDimensions();

                var body = $('body');

                // Generate a new ID for the fishy
                this.id = id;

                body.append('<div id="{id}" class="fish"></div>'.format(this));

                this.element = $('#' + this.id);

                // Pick a random starting tile
                this.tilePosition = {
                    x: Math.randomRange(0, Fish.maxTileCounts.x - 1),
                    y: Math.randomRange(0, Fish.maxTileCounts.y - 1)
                };

                this.moveToTile({ tile: this.tilePosition, animate: false });

                // Handle window resize event
                $(window).resize(function () {
                    _this.calculateDimensions();
                });
            }
            Fish.prototype.canMoveToTile = function (tile) {
                if (tile.x >= 0 && tile.x < Fish.maxTileCounts.x && tile.y >= 0 && tile.y < Fish.maxTileCounts.y) {
                    return true;
                } else {
                    return false;
                }
            };

            Fish.prototype.getAvailableTilePositions = function () {
                var result = [];

                var min = {
                    x: this.tilePosition.x - 1,
                    y: this.tilePosition.y - 1
                };

                var max = {
                    x: this.tilePosition.x + 1,
                    y: this.tilePosition.y + 1
                };

                for (var x = min.x; x <= max.x; x++) {
                    for (var y = min.y; y <= max.y; y++) {
                        if (x == this.tilePosition.x && y == this.tilePosition.y) {
                            continue;
                        }

                        var position = { x: x, y: y };

                        if (this.canMoveToTile(position)) {
                            result.push(position);
                        }
                    }
                }

                return result;
            };

            Fish.prototype.calculateDimensions = function () {
                this.screenSize = {
                    x: $(window).width(),
                    y: $(window).height()
                };

                this.tileSize = {
                    x: Math.floor(this.screenSize.x / Fish.maxTileCounts.x),
                    y: Math.floor(this.screenSize.y / Fish.maxTileCounts.y)
                };
            };

            Fish.prototype.tick = function (time) {
                if (this.state == 0 /* Idle */) {
                    // Chance a movement animation roughly every x milliseconds
                    if (Math.chance(time.elapsed, 5000)) {
                        this.moveRandomly();
                    }
                }

                if (this.state == 0 /* Idle */ || this.state == 1 /* Moving */) {
                    // Chance a bubble to occur roughly every x milliseconds
                    if (Math.chance(time.elapsed, 3000)) {
                        this.makeBubble();
                    }
                }
            };

            Fish.tileToScreen = function (tile) {
                return {
                    x: ($(window).width() / Fish.maxTileCounts.x) * tile.x,
                    y: ($(window).height() / Fish.maxTileCounts.y) * tile.y
                };
            };

            Fish.prototype.moveToTile = function (options) {
                var _this = this;
                // Translate from tile to screen
                var screen = Fish.tileToScreen(options.tile);

                // Center element within tile
                screen.x = Math.floor(screen.x + (this.tileSize.x / 2) - (this.element.width() / 2));
                screen.y = Math.floor(screen.y + (this.tileSize.y / 2) - (this.element.height() / 2));

                var rotationAmount = 0;
                if (options.tile.y < this.tilePosition.y) {
                    // Move up
                    rotationAmount = Math.randomRange(-10, -5);
                } else if (options.tile.y > this.tilePosition.y) {
                    // Move down
                    rotationAmount = Math.randomRange(5, 10);
                }
                var scaleXAmount = this.element.css('scaleX') || 1;
                if (options.tile.x < this.tilePosition.x) {
                    // face left
                    scaleXAmount = -1;
                } else if (options.tile.x > this.tilePosition.x) {
                    // face right
                    scaleXAmount = 1;
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

                this.tilePosition = FishSim.Utils.clone(options.tile);

                // To stop the flip from animating, apply the scale transform before the animation
                this.element.css(preAnimateProperties);

                if (options.animate) {
                    this.element.animate(properties, options.duration || 1000, function () {
                        _this.state = 0 /* Idle */;
                    });
                } else {
                    this.element.css(properties);

                    this.state = 0 /* Idle */;
                }
            };

            Fish.prototype.moveRandomly = function () {
                this.state = 1 /* Moving */;

                // Pick a random available tile to move to
                var availableTiles = this.getAvailableTilePositions();

                if (availableTiles.length == 0) {
                    console.log('no available tiles to move to');
                }

                var tile = availableTiles[Math.randomRange(0, availableTiles.length - 1)];

                this.moveToTile({ tile: tile, animate: true });
            };

            Fish.prototype.makeBubble = function () {
                var bubble = new Components.Bubble({
                    x: this.element.position().left,
                    y: this.element.position().top
                });

                FishSim.App.addComponent(bubble);
            };

            Fish.prototype.keyup = function (e) {
                if (this.state == 0 /* Idle */) {
                    var newPosition = FishSim.Utils.clone(this.tilePosition);

                    switch (e.keyCode) {
                        case 37:
                            newPosition.x--;
                            break;

                        case 38:
                            newPosition.y--;
                            break;

                        case 39:
                            newPosition.x++;
                            break;

                        case 40:
                            newPosition.y++;
                            break;

                        case 32:
                            this.makeBubble();
                            break;
                    }

                    if (newPosition.x != this.tilePosition.x || newPosition.y != this.tilePosition.y) {
                        if (this.canMoveToTile(newPosition)) {
                            this.state = 1 /* Moving */;

                            this.moveToTile({ tile: newPosition, animate: true, duration: 250 });
                        }
                    }
                }
            };
            Fish.maxTileCounts = { x: 10, y: 8 };
            return Fish;
        })();
        Components.Fish = Fish;
    })(FishSim.Components || (FishSim.Components = {}));
    var Components = FishSim.Components;
})(FishSim || (FishSim = {}));
//# sourceMappingURL=Fish.js.map
