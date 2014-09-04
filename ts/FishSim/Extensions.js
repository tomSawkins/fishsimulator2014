String.prototype.format = function (hash) {
    var original = this;

    var result = original.replace(/\{.*?\}/gi, function (key) {
        key = key.substr(1, key.length - 2);
        return hash[key];
    });

    return result;
};

Math.randomRange = function (min, max) {
    var range = max - min + 1;

    return Math.floor(Math.random() * range) + min;
};

Math.chance = function (elapsedMs, averageFrequencyMs) {
    return Math.randomRange(1, averageFrequencyMs / Math.max(1, elapsedMs)) == 1;
};
//# sourceMappingURL=Extensions.js.map
