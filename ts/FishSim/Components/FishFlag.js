/// <reference path="IVector.ts" />
/// <reference path="../Extensions.ts" />
/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />
var FishSim;
(function (FishSim) {
    (function (Components) {
        var FishFlag = (function () {
            function FishFlag() {
                this.updateLoop = 250;
                // Generate a new ID
                this.id = 'fish-flag';

                // Create the bubble element and add to the scene
                var content = '<div id="{id}" class="fish-flag"></div>'.format(this);
                $('body').append(content);
                this.element = $('#' + this.id);
            }
            FishFlag.prototype.tick = function (elapsed) {
            };

            FishFlag.prototype.cleanUp = function () {
                // Remove bubble from dom
                var body = document.getElementById('body');
                var element = document.getElementById(this.id);
                body.removeChild(element);

                this.element = null;
            };
            FishFlag.seaweedCount = 0;
            return FishFlag;
        })();
        Components.FishFlag = FishFlag;
    })(FishSim.Components || (FishSim.Components = {}));
    var Components = FishSim.Components;
})(FishSim || (FishSim = {}));
//# sourceMappingURL=FishFlag.js.map
