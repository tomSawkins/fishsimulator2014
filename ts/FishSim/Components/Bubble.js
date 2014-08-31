/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />
var FishSim;
(function (FishSim) {
    (function (Components) {
        var Bubble = (function () {
            function Bubble(position) {
                // Generate a new ID for this bubble
                Bubble.bubbleCount++;
                this.id = 'bubble' + Bubble.bubbleCount;

                // Dereference position
                position = FishSim.Utils.clone(position);

                // Create the bubble element and add to the scene
                var content = '<div id="{id}" class="bubble"></div>'.format(this);
                $('body').append(content);
                this.element = $('#' + this.id);

                this.setPosition(position);
            }
            Bubble.prototype.setPosition = function (position) {
                this.element.css({ left: position.x + 'px', top: position.y + 'px' });
                this.position = position;
            };

            Bubble.prototype.tick = function (elapsed) {
                // Speed in pixels per second
                var speed = 150;

                // Work out the distance to move based on speed and time passed
                var distanceToMove = speed * elapsed / 1000;

                // Work out new position
                var newPosition = {
                    x: this.position.x,
                    y: this.position.y - distanceToMove
                };

                // Update position
                this.setPosition(newPosition);

                // If we've gone outside the top edge of the screen then
                // we can be cleaned up
                if (this.position.y + this.element.height() < 0) {
                    FishSim.App.removeComponent(this);
                }
            };

            Bubble.prototype.cleanUp = function () {
                // Remove bubble from dom
                var body = document.getElementById('body');
                var element = document.getElementById(this.id);
                body.removeChild(element);

                this.element = null;
            };
            Bubble.bubbleCount = 0;
            return Bubble;
        })();
        Components.Bubble = Bubble;
    })(FishSim.Components || (FishSim.Components = {}));
    var Components = FishSim.Components;
})(FishSim || (FishSim = {}));
//# sourceMappingURL=Bubble.js.map
