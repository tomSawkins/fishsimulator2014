var FishSim;
(function (FishSim) {
    /// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
    /// <reference path="IComponent.ts" />
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
