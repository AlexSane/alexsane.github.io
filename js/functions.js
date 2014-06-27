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


            var x1, y1, x2, y2; // первый отрезок
            var x3, y3, x4, y4; // второй отрезок

            x1 = a.x;
            y1 = a.y;

            x2 = b.x;
            y2 = b.y;

            x3 = c.x;
            y3 = c.y;

            x4 = d.x;
            y4 = d.y;


            var A1 = y2 - y1;
            var B1 = x1 - x2;
            var C1 = -A1 * x1 - B1 * y1;

            var A2 = y4 - y3;
            var B2 = x3 - x4;
            var C2 = -A2 * x3 - B2 * y3;

            var f1 = A1 * x3 + B1 * y3 + C1;
            var f2 = A1 * x4 + B1 * y4 + C1;
            var f3 = A2 * x1 + B2 * y1 + C2;
            var f4 = A2 * x2 + B2 * y2 + C2;

            return (f1 * f2 <= 0 && f3 * f4 <= 0);

        }


    }
});
