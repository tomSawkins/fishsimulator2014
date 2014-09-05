/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="IComponent.ts" />
var FishSim;
(function (FishSim) {
    (function (Components) {
        var DeathAnimation = (function () {
            function DeathAnimation() {
            }
            DeathAnimation.prototype.tick = function (time) {
            };

            DeathAnimation.prototype.cleanUp = function () {
            };
            return DeathAnimation;
        })();
        Components.DeathAnimation = DeathAnimation;
    })(FishSim.Components || (FishSim.Components = {}));
    var Components = FishSim.Components;
})(FishSim || (FishSim = {}));
//# sourceMappingURL=DeathAnimation.js.map
