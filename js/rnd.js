define([],function(){
    function RND(seed) {
        // LCG using GCC's constants
        this.m = 0x80000000; // 2**31;
        this.a = 1103515245;
        this.c = 12345;

        this.state = seed;
    }
    RND.prototype.nextInt = function() {
        this.state = (this.a * this.state + this.c) % this.m;
        if (this.state < 0)
        {
            this.state = -this.state;
        }
        return this.state;
    };
    RND.prototype.nextFloat = function() {
        // returns in range [0,1]
        return this.nextInt() / (this.m - 1);
    };
    RND.prototype.nextRange = function(start, end) {
        // returns in range [start, end): including start, excluding end
        // can't modulu nextInt because of weak randomness in lower bits
        var rangeSize = end - start;
        var randomUnder1 = this.nextInt() / this.m;
        var result = start + Math.floor(randomUnder1 * rangeSize);
        return result >= end ? end : result;
    };
    RND.prototype.choice = function(array) {
        return array[this.nextRange(0, array.length)];
    };

    return RND;
});
