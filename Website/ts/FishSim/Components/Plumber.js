var FishSim;
(function (FishSim) {
    /// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
    /// <reference path="IComponent.ts" />
    (function (Components) {
        (function (PlumberCharacter) {
            PlumberCharacter[PlumberCharacter["Mario"] = 0] = "Mario";
            PlumberCharacter[PlumberCharacter["Luigi"] = 1] = "Luigi";
        })(Components.PlumberCharacter || (Components.PlumberCharacter = {}));
        var PlumberCharacter = Components.PlumberCharacter;

        var Plumber = (function () {
            function Plumber(character, y) {
                this.currentFrameIndex = -1;
                // Generate a new ID for this bubble
                this.id = 'plumber' + Plumber.plumberCount++;

                this.originY = y;

                // Dereference position
                var position = {
                    x: -16,
                    y: y
                };

                // Create the element and add to the scene
                var content = '<div id="{id}" class="plumber"></div>'.format(this);
                $('body').append(content);
                this.element = $('#' + this.id);

                if (character == 0 /* Mario */) {
                    this.element.addClass('mario');
                } else {
                    this.element.addClass('luigi');
                }

                this.setPosition(position);
            }
            Plumber.prototype.setPosition = function (position) {
                this.element.css({ left: position.x + 'px', top: position.y + 'px' });
                this.position = position;
            };

            Plumber.prototype.tick = function (time) {
                if (FishSim.App.paused) {
                    return;
                }

                // Number of different frames in the animation
                var frameCount = 3;

                // Number of frames to animate per second
                var fps = 5;

                // Which frame should we be displaying right now?
                var frameIndex = Math.floor((time.total / (1000 / fps)) % frameCount);

                // Swap out the class which says which frame we're on
                if (frameIndex != this.currentFrameIndex) {
                    if (this.currentFrameIndex > -1) {
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
                if (this.position.x > $(window).width()) {
                    FishSim.App.removeComponent(this);
                }
            };

            Plumber.prototype.cleanUp = function () {
                // Remove bubble from dom
                var body = document.getElementById('body');
                var element = document.getElementById(this.id);
                body.removeChild(element);

                this.element = null;
            };
            Plumber.plumberCount = 0;
            return Plumber;
        })();
        Components.Plumber = Plumber;
    })(FishSim.Components || (FishSim.Components = {}));
    var Components = FishSim.Components;
})(FishSim || (FishSim = {}));
//# sourceMappingURL=Plumber.js.map
