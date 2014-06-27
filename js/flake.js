require(['Underscore', 'Snap', 'render', 'constants', 'functions', 'rnd'], function(_, Snap, render, c,f, RND){

    var input = document.getElementById('seed');
    var rawSvg = document.getElementById('raw_svg');

    input.value = parseInt(window.location.hash.replace('#',''),10)||0;

    document.getElementById('random').addEventListener('click',function(e){
        input.value = parseInt(Math.random()*100000);
        window.location.hash='#'+input.value;
    });

    input.addEventListener('input', function(e){
        window.location.hash='#'+input.value;
    });

    window.addEventListener('hashchange', function(){
        input.value = parseInt(window.location.hash.replace('#',''),10)||0;
        drawLogo();
    });

    drawLogo();

    function drawLogo(){
        var seed = input.value || 0;
        window.rnd = new RND(seed);

        var snap = Snap("#flake");

        snap.clear();

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
        }, {});


        var points = [];

        var localColors = [];
        function color(){
            if (localColors.length == 0) {
                localColors = c.colors.slice(0);
            }
            var col = f.random(localColors);
            localColors = _.without(localColors, col);
            return col;
        }

        function intersect(bob, bobs){
            return _.any(bobs, function(anotherBob){


                var x1, y1, x2, y2; // первый отрезок
                var x3, y3, x4, y4; // второй отрезок

                x1 = c.index2points([bob.s])[0].x;
                y1 = c.index2points([bob.s])[0].y;

                x2 = c.index2points([bob.f])[0].x;
                y2 = c.index2points([bob.f])[0].y;

                x3 = c.index2points([anotherBob.s])[0].x;
                y3 = c.index2points([anotherBob.s])[0].y;

                x4 = c.index2points([anotherBob.f])[0].x;
                y4 = c.index2points([anotherBob.f])[0].y;


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


            });
        }


        var bobs = [];

        for (var i = 0; i < rnd.nextRange(2,6); i++) {
            do {
                var sc = f.random(startPoints);
                var fc = f.random(startPoints);
            } while (points[sc] || points[fc] || sc == fc || intersect({s: sc, f: fc}, bobs));

            points[sc] = true;
            points[fc] = true;

            bobs.push({s: sc, f: fc});


            render.renderBob(snap, sc, fc, color());

            render.renderBob(snap, symmetryGroups[sc][0], symmetryGroups[fc][0], color());
            render.renderBob(snap, symmetryGroups[sc][1], symmetryGroups[fc][1], color());



        }
        rawSvg.textContent = snap.toString();

//        render.renderPoints(snap);

    }
});
