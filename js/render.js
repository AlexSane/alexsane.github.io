define(['Underscore', 'Snap', 'constants', 'functions'], function(_, Snap, c, f){
    return {
        renderBob: function(snap, start, finish, color){
            var sc = c.points[start];
            var fc = c.points[finish];

            return snap.line(sc.x,sc.y, fc.x, fc.y).attr({
                stroke:color,
                strokeWidth: c.size/2,
                strokeLinecap:"round"
            });
        },


        renderPoints: function(paper){
            for (var i = 0; i < c.points.length; i++) {
                paper.text(c.points[i].x, c.points[i].y, "" + i).attr({'font-size': 10});
            }
        },

        drawPolygon: function(paper, points, attr){

            return paper.polygon(f.flatten(points)).attr(attr);
        },

        renderSnowflake: function(paper){
            c.centerPoints.forEach(function(center){
                var hex = c.hexes[center];
                var points = c.index2points(hex);

                this.drawPolygon(paper, points,
                    {
                        fill: 'none',
                        stroke: '#000',
                        strokeWidth: '0.2px'
                    }
                );
            }, this);
        }


    };
});