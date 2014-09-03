/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />
var FishSim;
(function (FishSim) {
    (function (Components) {
        var Seaweed = (function () {
            function Seaweed() {
                this.updateLoop = 250;
                // Generate a new ID
                Seaweed.seaweedCount++;
                this.id = 'seaweed' + Seaweed.seaweedCount;

                // Create the bubble element and add to the scene
                var content = '<div id="{id}" class="seaweed"></div>'.format(this);
                $('body').append(content);
                this.element = $('#' + this.id);

                this.setPosition();
            }
            Seaweed.prototype.setPosition = function () {
                var screenWidth = $(window).width();
                var screenHeight = $(window).height();
                var randomXPos = Math.randomRange(10, screenWidth - 10);

                this.element.css({ left: randomXPos + 'px', top: (screenHeight - 100) + 'px' });
            };

            Seaweed.prototype.tick = function (elapsed) {
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
