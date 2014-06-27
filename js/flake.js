require(['Underscore', 'Snap', 'render', 'constants', 'functions'], function(_, Snap, render, c,f){

    var snap = Snap("#flake");
    //render.renderPoints(snap);
    render.renderSnowflake(snap);
    //render.renderBob(snap, 0, 5, c.colors[0]);
    //render.renderBob(snap, 11, 0, c.colors[1]);


    var startPoints = c.symmetries.map(function(s){
        return s[0];
    });


    //[[0,2,3]] => {0:[2,3]}

    var symmetryGroups = _.reduce(c.symmetries, function(memo, s){
        memo[s[0]] = _.without(s, s[0]);
        return memo;
    },{});


    var points = [];

    function color(){
        return f.random(c.colors);
    }

    for (var i = 0; i < 5; i++) {
        do {
            var sc = f.random(startPoints);
            var fc = f.random(startPoints);
        } while (points[sc] || points[fc]);

        points[sc] = true;
        points[fc] = true;

        render.renderBob(snap, sc, fc,color());

        render.renderBob(snap, symmetryGroups[sc][0], symmetryGroups[fc][0], color());
        render.renderBob(snap, symmetryGroups[sc][1], symmetryGroups[fc][1], color());




    }


});
