require(['Underscore', 'Snap', 'render', 'constants', 'functions', 'rnd', 'makeSvg'], function(_, Snap, render, c, f, RND, makeSvg){
    var snap = Snap("#flake");
    var bobs = []; // [{s,f,color, bob}]
    render.renderSnowflake(snap);

    var symmetryGroups = c.symmetryGroups;
    var startPoints = _.keys(symmetryGroups);


    var input = document.getElementById('seed');
    var download = document.getElementById('download');

    input.value = parseInt(window.location.hash.replace('#', ''), 10) || 0;

    var randomRefresh = function () {
        input.value = parseInt(Math.random() * 10000000);
        window.location.hash = '#' + input.value;
    };
    document.getElementById('random').addEventListener('click', randomRefresh);
    document.querySelectorAll('.paper')[0].addEventListener('touchend', randomRefresh) ;

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

        if (bobs.length == 0)
        {
            bobs = generateBobs(true);
        }
        else
        {
            var newBobs = generateBobs(false);

            transform(bobs, newBobs, function(){
                var textContent = snap.toString();

                download.href = makeSvg(textContent);
                download.setAttribute('download', 'logo_' + seed + '.svg');
            });
        }



        function transform(oldBobs, newBobs, callback){
            var zipped = _.zip(oldBobs, newBobs);
            _.each(zipped, function(ar){
                var oldBob = ar[0];
                var newBob = ar[1];

                var points = c.index2points([newBob.s, newBob.f]);

                oldBob.svg.animate({
                    x1: points[0].x,
                    y1: points[0].y,
                    x2: points[1].x,
                    y2:points[1].y
                }, 500, callback);


                var oldColor = Snap.getRGB(oldBob.color);
                var newColor = Snap.getRGB(newBob.color);

                Snap.animate([oldColor.r, oldColor.g, oldColor.b], [newColor.r, newColor.g, newColor.b], function(v){

                    var rgb = Snap.rgb(v[0],v[1],v[2]);

                    oldBob.svg.attr({
                       stroke:rgb
                    });

                },500);


            });
        }


        function generateBobs(generateBobsSvg){

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

            var localBobs = [];

            for (var i = 0; i < 3; i++) {
                do {
                    var sc = f.random(startPoints);
                    var fc = f.random(startPoints);
                } while (points[sc] || points[fc] || sc == fc || intersect({s: sc, f: fc}, localBobs));

                points[sc] = true;
                points[fc] = true;


                for(var j=0;j<3;j++) {

                    var bob = {s: symmetryGroups[sc][j], f: symmetryGroups[fc][j], color: color()};
                    if (generateBobsSvg) {
                        bob.svg = render.renderBob(snap, bob.s, bob.f, bob.color);
                    }
                    localBobs.push(bob);
                }
            }

            return _.shuffle(localBobs);


        }


    }



});
