/// <reference path="Libs/jquery-blink.d.ts" />
/// <reference path="Libs/datejs.d.ts" />
/// <reference path="Libs/jquery.d.ts" />
/// <reference path="Libs/linq.d.ts" />
/// <reference path="Components/IComponent.ts" />
var FishSim;
(function (FishSim) {
    var App = (function () {
        function App() {
        }
        App.run = function () {
            var _this = this;
            $('.title').blink();

            this.components.push(this.fish = new FishSim.Components.Fish());

            this.lastTickTime = (new Date());

            setInterval(function () {
                _this.tick();
            }, 1000 / this.fps);
        };

        App.tick = function () {
            var tickTime = (new Date());
            var elapsed = tickTime.getTime() - this.lastTickTime.getTime();

            try  {
                // TODO: Need to make this loop safe for when
                // components are added/removed dynamically within
                // the loop itself. (e.g. a component may create
                // it's own components on the fly)
                var index = 0;
                while (index < App.components.length) {
                    var component = App.components[index];

                    component.tick(elapsed);

                    index++;
                }
            } finally {
                this.lastTickTime = tickTime;
            }
        };
        App.components = [];

        App.fps = 1;
        return App;
    })();
    FishSim.App = App;

    window.onload = function () {
        App.run();
    };
})(FishSim || (FishSim = {}));
//# sourceMappingURL=App.js.map
