/// <reference path="IVector.ts" />
/// <reference path="../Extensions.ts" />
/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />
var FishSim;
(function (FishSim) {
    (function (Components) {
        (function (FishState) {
            FishState[FishState["Idle"] = 0] = "Idle";
            FishState[FishState["Moving"] = 1] = "Moving";
        })(Components.FishState || (Components.FishState = {}));
        var FishState = Components.FishState;

        var Fish = (function () {
            function Fish() {
                var _this = this;
                this.state = 0 /* Idle */;
                this.calculateDimensions();

                var body = $('body');

                // Generate a new ID for the fishy
                Fish.fishCount++;
                this.id = "fish" + Fish.fishCount;

                body.append('<div id="fish' + Fish.fishCount + '" class="fish"></div>');

                this.element = $('#' + this.id);

                // Pick a random starting tile
                this.tilePosition = {
                    x: Math.randomRange(0, Fish.maxTileCounts.x - 1),
                    y: Math.randomRange(0, Fish.maxTileCounts.y - 1)
                };

                this.moveToTile(this.tilePosition, false);

                // Handle window resize event
                $(window).resize(function () {
                    _this.calculateDimensions();
                });
            }
            Fish.prototype.getAvailableTilePositions = function () {
                var result = [];

                var min = {
                    x: Math.max(this.tilePosition.x - 1, 0),
                    y: Math.max(this.tilePosition.y - 1, 0)
                };

                var max = {
                    x: Math.min(this.tilePosition.x + 1, Fish.maxTileCounts.x - 1),
                    y: Math.min(this.tilePosition.y + 1, Fish.maxTileCounts.y - 1)
                };

                for (var x = min.x; x <= max.x; x++) {
                    for (var y = min.y; y <= max.y; y++) {
                        if (x == this.tilePosition.x && y == this.tilePosition.y) {
                            continue;
                        }

                        result.push({
                            x: x,
                            y: y
                        });
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

            Fish.prototype.tick = function (elapsed) {
                if (this.state == 0 /* Idle */) {
                    // Chance a movement animation roughly every x milliseconds
                    if (Math.chance(elapsed, 5000)) {
                        this.move();
                    }

                    // Chance a bubble to occur roughly every x milliseconds
                    if (Math.chance(elapsed, 3000)) {
                        var bubble = new FishSim.Components.Bubble({
                            x: this.element.position().left,
                            y: this.element.position().top
                        });

                        FishSim.App.addComponent(bubble);
                    }
                }
            };

            Fish.tileToScreen = function (tile) {
                return {
                    x: ($(window).width() / Fish.maxTileCounts.x) * tile.x,
                    y: ($(window).height() / Fish.maxTileCounts.y) * tile.y
                };
            };

            Fish.prototype.moveToTile = function (tile, animate) {
                var _this = this;
                // Translate from tile to screen
                var screen = Fish.tileToScreen(tile);

                // Center element within tile
                screen.x = Math.floor(screen.x + (this.tileSize.x / 2) - (this.element.width() / 2));
                screen.y = Math.floor(screen.y + (this.tileSize.y / 2) - (this.element.height() / 2));

                var properties = {
                    left: screen.x + 'px',
                    top: screen.y + 'px'
                };

                if (tile.x < this.tilePosition.x) {
                    this.element.addClass('faceLeft');
                } else if (tile.x > this.tilePosition.x) {
                    this.element.removeClass('faceLeft');
                }

                this.tilePosition = tile;

                if (animate) {
                    this.element.animate(properties, 1000, function () {
                        _this.state = 0 /* Idle */;
                    });
                } else {
                    this.element.css(properties);

                    this.state = 0 /* Idle */;
                }
            };

            Fish.prototype.move = function () {
                this.state = 1 /* Moving */;

                // Pick a random available tile to move to
                var availableTiles = this.getAvailableTilePositions();

                var tile = availableTiles[Math.randomRange(0, availableTiles.length - 1)];

                this.moveToTile(tile, true);
            };
            Fish.fishCount = 0;

            Fish.maxTileCounts = { x: 10, y: 10 };
            return Fish;
        })();
        Components.Fish = Fish;
    })(FishSim.Components || (FishSim.Components = {}));
    var Components = FishSim.Components;
})(FishSim || (FishSim = {}));
//# sourceMappingURL=Fish.js.map
