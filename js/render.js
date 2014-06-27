define(['Underscore', 'Snap', 'constants', 'functions'], function(_, Snap, c, f){
    return {
        renderBob: function(snap, start, finish, color){
            var sc = c.points[start];
            var fc = c.points[finish];
            var format = 'M-{s4},0 A{s4},{s4} 0 0,1 {s4},0 v{s} A{s4},{s4} 0 0,1 -{s4},{s} z';

            return snap.path(Snap.format(format, {
                s4: c.size / 4,
                s: f.distance(sc,fc)
            }))
                .attr({
                    fill: color
                })
                .transform(Snap.format('translate({x},{y}) rotate({a})', {
                    x: sc.x,
                    y: sc.y,
                    a: Snap.deg(-f.angle(fc, sc))
                }));
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