/// <reference path="IComponent.ts" />
var FishSim;
(function (FishSim) {
    (function (Components) {
        var Fish = (function () {
            function Fish() {
            }
            Fish.prototype.tick = function (elapsed) {
            };
            return Fish;
        })();
        Components.Fish = Fish;
    })(FishSim.Components || (FishSim.Components = {}));
    var Components = FishSim.Components;
})(FishSim || (FishSim = {}));
//# sourceMappingURL=Fish.js.map
