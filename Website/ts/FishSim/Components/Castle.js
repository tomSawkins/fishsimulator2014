var FishSim;
(function (FishSim) {
    /// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
    /// <reference path="IComponent.ts" />
    (function (Components) {
        var Castle = (function () {
            function Castle() {
                // Generate a new ID for this bubble
                this.id = 'castle';

                // Create the bubble element and add to the scene
                var content = '<div id="{id}"></div>'.format(this);
                $('body').append(content);
                this.element = $('#' + this.id);
            }
            Castle.prototype.tick = function (time) {
            };

            Castle.prototype.cleanUp = function () {
                // Remove element from dom
                var body = document.getElementById('body');
                var element = document.getElementById(this.id);
                body.removeChild(element);

                this.element = null;
            };
            return Castle;
        })();
        Components.Castle = Castle;
    })(FishSim.Components || (FishSim.Components = {}));
    var Components = FishSim.Components;
})(FishSim || (FishSim = {}));
//# sourceMappingURL=Castle.js.map
