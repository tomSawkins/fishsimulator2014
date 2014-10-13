var FishSim;
(function (FishSim) {
    /// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
    /// <reference path="IComponent.ts" />
    (function (Components) {
        var Seaweed = (function () {
            function Seaweed(xPosition) {
                this.updateLoop = 250;
                // Generate a new ID
                Seaweed.seaweedCount++;
                this.id = 'seaweed' + Seaweed.seaweedCount;

                // Create the bubble element and add to the scene
                var content = '<div id="{id}" class="seaweed"></div>'.format(this);
                $('body').append(content);
                this.element = $('#' + this.id);

                // Assign a random opacity & position
                this.element.css({ opacity: 0.5 + (Math.randomRange(1, 5) * 0.1) });
                this.setPosition(xPosition);
            }
            Seaweed.prototype.setPosition = function (xPosition) {
                this.element.css({ left: xPosition + 'px' });
            };

            Seaweed.prototype.makeBubble = function () {
                var bubble = new Components.Bubble({
                    x: this.element.position().left,
                    y: this.element.position().top
                }, true);

                FishSim.App.addComponent(bubble);
            };

            Seaweed.prototype.tick = function (time) {
                // Chance a bubble to occur roughly every x milliseconds
                if (Math.chance(time.elapsed, 15000)) {
                    this.makeBubble();
                }
            };

            Seaweed.prototype.cleanUp = function () {
                // Remove bubble from dom
                var body = document.getElementById('body');
                var element = document.getElementById(this.id);
                body.removeChild(element);

                this.element = null;
            };
            Seaweed.seaweedCount = 0;
            return Seaweed;
        })();
        Components.Seaweed = Seaweed;
    })(FishSim.Components || (FishSim.Components = {}));
    var Components = FishSim.Components;
})(FishSim || (FishSim = {}));
//# sourceMappingURL=Seaweed.js.map
