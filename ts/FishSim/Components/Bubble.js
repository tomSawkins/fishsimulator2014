/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />
var FishSim;
(function (FishSim) {
    (function (Components) {
        var Bubble = (function () {
            function Bubble(position) {
                // Generate a new ID for this bubble
                Bubble.bubbleCount++;
                var id = 'bubble' + Bubble.bubbleCount;

                // Create the bubble element and add to the scene
                var content = '<div id="{id}" class="bubble"></div>'.format({ id: id });
                this.element = $('body').append(content);

                this.setPosition(position);
            }
            Bubble.prototype.setPosition = function (position) {
                this.element.css({ left: position.x + 'px', top: position.y + 'px' });
                this.position = position;
            };

            Bubble.prototype.tick = function (elapsed) {
                // Speed is pixels per second
                var speed = 150;

                var distanceToMove = speed * elapsed / 1000;

                this.setPosition({ x: this.position.x, y: this.position.y - distanceToMove });

                // If we've gone outside the top edge of the screen then
                // we can be cleaned up
                if (this.position.y + this.element.height() < 0) {
                    FishSim.App.removeComponent(this);
                }
            };
            Bubble.bubbleCount = 0;
            return Bubble;
        })();
        Components.Bubble = Bubble;
    })(FishSim.Components || (FishSim.Components = {}));
    var Components = FishSim.Components;
})(FishSim || (FishSim = {}));
//# sourceMappingURL=Bubble.js.map
