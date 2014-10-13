var FishSim;
(function (FishSim) {
    (function (Utils) {
        (function (HealthStatus) {
            HealthStatus[HealthStatus["Healthy"] = 0] = "Healthy";
            HealthStatus[HealthStatus["Poorly"] = 1] = "Poorly";
        })(Utils.HealthStatus || (Utils.HealthStatus = {}));
        var HealthStatus = Utils.HealthStatus;

        var HealthCheckResponse = (function () {
            function HealthCheckResponse() {
            }
            return HealthCheckResponse;
        })();
        Utils.HealthCheckResponse = HealthCheckResponse;

        Utils.checkServerHealth = function (serverName, callback) {
            // ts9.tatts.com
            var url = 'https://' + serverName + '/HealthCheck.aspx?extendedInfo=true';

            var settings = {
                type: 'GET',
                url: url,
                async: true,
                success: function (data, textStatus, jqXHR) {
                    var args = {
                        status: 0 /* Healthy */,
                        description: ''
                    };

                    var html = data;

                    var re = new RegExp('([^<>]*)<font.*?>(.*?)</font>', 'gi');

                    var match = re.exec(html);

                    var everythingIsAwesome = true;

                    while (match) {
                        var component = match[1].replace('&nbsp;', '').trim();
                        var componentStatus = match[2].trim();

                        args.description += component + ': ' + componentStatus + '\n';

                        if (componentStatus != 'OK') {
                            everythingIsAwesome = false;
                        }

                        match = re.exec(html);
                    }

                    args.status = everythingIsAwesome ? 0 /* Healthy */ : 1 /* Poorly */;
                    args.description = args.description.trim();
                },
                error: function () {
                    return {
                        status: 1 /* Poorly */,
                        description: 'Could not reach Health Check page for ' + serverName
                    };
                }
            };

            $.ajax(settings);
        };

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
