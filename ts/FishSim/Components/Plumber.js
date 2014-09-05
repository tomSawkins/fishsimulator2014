/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />
var FishSim;
(function (FishSim) {
    (function (Components) {
        var Plumber = (function () {
            function Plumber(y) {
                this.currentFrameIndex = -1;
                // Generate a new ID for this bubble
                this.id = 'plumber' + Plumber.plumberCount++;

                // Dereference position
                var position = {
                    x: -16,
                    y: y
                };

                // Create the element and add to the scene
                var content = '<div id="{id}" class="plumber"><div><div></div></div></div>'.format(this);
                $('body').append(content);
                this.element = $('#' + this.id);
                this.imageElement = this.element.find('div').find('div');

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
                var fps = .5;

                // Which frame should we be displaying right now?
                var frameIndex = Math.floor((time.total / (1000 / fps)) % frameCount);

                // Swap out the class which says which frame we're on
                if (frameIndex != this.currentFrameIndex) {
                    if (this.currentFrameIndex > -1) {
                        this.imageElement.removeClass('swim' + this.currentFrameIndex);
                    }

                    this.imageElement.addClass('swim' + frameIndex);

                    this.currentFrameIndex = frameIndex;
                }

                // Speed in pixels per second
                var speed = 100;

                // Work out the distance to move based on speed and time passed
                var distanceToMove = speed * time.elapsed / 1000;

                // Work out new position
                var newPosition = {
                    x: this.position.x + distanceToMove,
                    y: this.position.y
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
