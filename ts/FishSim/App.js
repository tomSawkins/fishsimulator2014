/// <reference path="Libs/datejs.d.ts" />
/// <reference path="Libs/jquery.d.ts" />
/// <reference path="Libs/linq.d.ts" />
/// <reference path="Components/IComponent.ts" />
var FishSim;
(function (FishSim) {
    var Sim = (function () {
        function Sim() {
        }
        Sim.run = function () {
            alert('running');

            this.lastTickTime = (new Date());

            setInterval(this.tick, this.fps);
        };

        Sim.tick = function () {
            var tickTime = new Date();
            var elapsed = tickTime.getTime() - this.lastTickTime.getTime();

            var index = 0;
            while (index < this.components.length) {
                var component = this.components[index];

                component.tick(elapsed);
            }
        };
        Sim.components = [];

        Sim.fps = 50;
        return Sim;
    })();
    FishSim.Sim = Sim;

    window.onload = function () {
        Sim.run();
    };
})(FishSim || (FishSim = {}));
//# sourceMappingURL=App.js.map
