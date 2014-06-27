require(['Underscore', 'Snap', 'render', 'constants', 'functions', 'rnd', 'makeSvg'], function(_, Snap, render, c, f, RND, makeSvg){

    var input = document.getElementById('seed');
    var download = document.getElementById('download');

    input.value = parseInt(window.location.hash.replace('#', ''), 10) || 0;

    document.getElementById('random').addEventListener('click', function(e){
        input.value = parseInt(Math.random() * 10000000);
        window.location.hash = '#' + input.value;
    });

    input.addEventListener('input', function(e){
        window.location.hash = '#' + input.value;
    });

    window.addEventListener('hashchange', function(){
        input.value = parseInt(window.location.hash.replace('#', ''), 10) || 0;
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


        var symmetryGroups = c.symmetryGroups;
        var startPoints = _.keys(symmetryGroups);

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
                var bobPoints = c.index2points([bob.s, bob.f, anotherBob.s, anotherBob.f]);
                return f.intersect(bobPoints[0], bobPoints[1], bobPoints[2], bobPoints[3]);
            });
        }

        var bobs = [];

        for (var i = 0; i < 3; i++) {
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

        var textContent = snap.toString();

        download.href = makeSvg(textContent);
        download.setAttribute('download', 'logo_' + seed + '.svg');


//        render.renderPoints(snap);

    }

});
