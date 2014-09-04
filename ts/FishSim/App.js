/// <reference path="Libs/jquery-blink.d.ts" />
/// <reference path="Libs/datejs.d.ts" />
/// <reference path="Libs/jquery.d.ts" />
/// <reference path="Libs/linq.d.ts" />
/// <reference path="Components/IComponent.ts" />
/// <reference path="Components/IVector.ts" />
/// <reference path="Components/Seaweed.ts" />
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

            if (component.cleanUp) {
                component.cleanUp();
            }

            if (this.loopingThruComponentsCount == 0) {
                this.removeFlaggedComponents();
            }
        };

        App.removeFlaggedComponents = function () {
            var index = 0;
            while (index < this.components.length) {
                if (this.components[index].flaggedForRemoval) {
                    this.components.splice(index, 1);
                } else {
                    index++;
                }
            }
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
                    this.removeFlaggedComponents();
                }
            }
        };

        App.getComponentById = function (id) {
            return Enumerable.From(this.components).FirstOrDefault(null, function (c) {
                return c.id == id;
            });
        };

        App.run = function () {
            var _this = this;
            $('.title').blink();

            // Subscribe to events
            var body = $('body');

            body.keydown(function (e) {
                return _this.keydown(e);
            });

            body.keypress(function (e) {
                return _this.keypress(e);
            });

            body.keyup(function (e) {
                return _this.keyup(e);
            });

            // Add components to the scene here (or alternatively on the fly within your own components)
            this.addComponent(this.ts8 = new FishSim.Components.Fish('ts8'));
            this.addComponent(this.ts9 = new FishSim.Components.Fish('ts9'));
            this.addComponent(new FishSim.Components.Castle());

            // Add a bunch of seaweed
            var seaweedCount = 7;
            var screenWidth = $(window).width();
            var space = (screenWidth / seaweedCount + 1);
            for (var i = 0; i < seaweedCount; i++) {
                var x = space * (i + 1) - (space / 2) + Math.randomRange(0, space);

                this.addComponent(new FishSim.Components.Seaweed(x));
            }

            this.lastTickTime = (new Date());

            setInterval(function () {
                _this.tick();
            }, 1000 / this.fps);
        };

        App.tick = function () {
            var tickTime = (new Date());
            var elapsed = tickTime.getTime() - this.lastTickTime.getTime();

            try  {
                if (!this.paused) {
                    // Loop through each component in the scene and call their tick handler
                    this.forEachComponent(function (component) {
                        component.tick(elapsed);
                    });
                }
            } finally {
                this.lastTickTime = tickTime;
            }
        };

        App.keydown = function (event) {
            this.forEachComponent(function (component) {
                if (component.keydown) {
                    component.keydown(event);
                }
            });
        };

        App.keypress = function (event) {
            this.forEachComponent(function (component) {
                if (component.keypress) {
                    component.keypress(event);
                }
            });
        };

        App.keyup = function (event) {
            if (event.keyCode == 80) {
                this.paused = !this.paused;
            }

            this.forEachComponent(function (component) {
                if (component.keyup) {
                    component.keyup(event);
                }
            });
        };
        App.components = [];

        App.loopingThruComponentsCount = 0;

        App.fps = 25;

        App.paused = false;
        return App;
    })();
    FishSim.App = App;

    window.onload = function () {
        App.run();
    };
})(FishSim || (FishSim = {}));
//# sourceMappingURL=App.js.map
