define(['Underscore', 'constants'], function(_, c){
    var TAU = 2 * Math.PI;

    return {
        hexPoints: function(center, radius){
            var result = [];
            for (var i = 0; i < 6; i++) {
                var x = radius * Math.sin(TAU * i / 6) + center.x;
                var y = radius * Math.cos(TAU * i / 6) + center.y;

                result.push({x: x, y: y});
            }

            return result;
        },

        flatten: function(points){
            return _.reduce(points, function(memo, n){
                memo.push(n.x);
                memo.push(n.y);
                return memo;
            }, []);
        },


        distance: function(a, b){
            return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
        },

        angle: function(a, b){
            var x = a.x - b.x;
            var y = a.y - b.y;
            return Math.atan2(x,y);
        },

        random: function(arr){
            return window.rnd.choice(arr);
        },

        intersect: function(a,b,c,d){

            function intersects(a,b,c,d,p,q,r,s) {
                var det, gamma, lambda;
                det = (c - a) * (s - q) - (r - p) * (d - b);
                if (Math.abs(det) <0.0005) {
                    return false;
                } else {
                    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
                    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
                    return (-0.0001 <= lambda && lambda <= 1.0001) && (-0.0001 <= gamma && gamma <= 1.00001);
                }
            }

            return intersects(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y);
        }

    }
});
