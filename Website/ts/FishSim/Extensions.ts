interface String
{
    format(hash: Object): string;
}

String.prototype.format = function(hash: any): string
{
    var original = <string>this;

    var result = original.replace(/\{.*?\}/gi, (key) =>
    {
        key = key.substr(1, key.length - 2);
        return hash[key];
    });

    return result;
};

interface Math
{
    randomRange(min: number, max: number): number;
    chance(elapsedMs: number, averageFrequencyMs: number): boolean;
}

Math.randomRange = (min: number, max: number) =>
{
    var range = max - min + 1;

    return Math.floor(Math.random() * range) + min;
};

Math.chance = (elapsedMs: number, averageFrequencyMs: number) =>
{
    return Math.randomRange(1, averageFrequencyMs / Math.max(1, elapsedMs)) == 1;
};