var FishSim;
(function (FishSim) {
    (function (Utils) {
        Utils.clone = function (object) {
            var result;

            // Handle the 3 simple types, and null or undefined
            if (object == null || typeof object != 'object') {
                return object;
            }

            // Handle Date
            if (object instanceof Date) {
                result = new Date();
                result.setTime(object.getTime());
                return result;
            }

            // Handle Array
            if (object instanceof Array) {
                result = [];
                for (var index = 0, len = object.length; index < len; index++) {
                    result[index] = this.clone(object[index]);
                }
                return result;
            }

            // Handle Object
            if (object instanceof Object) {
                result = {};
                for (var property in object) {
                    if (object.hasOwnProperty(property)) {
                        result[property] = this.clone(object[property]);
                    }
                }
                return result;
            }

            throw 'Unsupported type "' + typeof object + '"';
        };
    })(FishSim.Utils || (FishSim.Utils = {}));
    var Utils = FishSim.Utils;
})(FishSim || (FishSim = {}));
//# sourceMappingURL=Utils.js.map
