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
        App.addComponent = function (component) {
            this.components.push(component);
        };

        App.removeComponent = function (component) {
            component.flaggedForRemoval = true;
        };

        App.forEachComponent = function (action) {
            this.loopingThruComponentsCount++;
            try  {
                // Do a while loop to allow for additions to the components array
                var index = 0;
                while (index < this.components.length) {
                    var component = this.components[index];

                    if (!component.flaggedForRemoval) {
                        action(component);
                    }

                    index++;
                }
            } finally {
                this.loopingThruComponentsCount--;

                if (this.loopingThruComponentsCount == 0) {
                    var index = 0;
                    while (index < this.components.length) {
                        if (this.components[index].flaggedForRemoval) {
                            this.components.splice(index, 1);
                        } else {
                            index++;
                        }
                    }
                }
            }
        };

        App.run = function () {
            var _this = this;
            $('.title').blink();

            // Add components to the scene here (or alternatively on the fly within your own components)
            this.addComponent(this.fish = new FishSim.Components.Fish());

            this.lastTickTime = (new Date());

            setInterval(function () {
                _this.tick();
            }, 1000 / this.fps);
        };

        App.tick = function () {
            var tickTime = (new Date());
            var elapsed = tickTime.getTime() - this.lastTickTime.getTime();

            try  {
                // Loop through each component in the scene and call their tick handler
                this.forEachComponent(function (component) {
                    component.tick(elapsed);
                });
            } finally {
                this.lastTickTime = tickTime;
            }
        };
        App.components = [];

        App.loopingThruComponentsCount = 0;

        App.fps = 1;
        return App;
    })();
    FishSim.App = App;

    window.onload = function () {
        App.run();
    };
})(FishSim || (FishSim = {}));
//# sourceMappingURL=App.js.map
