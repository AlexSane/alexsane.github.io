define(['functions'], function(f){
    var c = {
        size: 50,
        center: {x: 200, y: 200},

        symmetries: [
            [0, 27, 30],
            [1, 31, 23],
            [3, 34, 16],
            [6, 36, 9],
            [13, 35, 5],
            [20, 33, 2],
            [4, 24, 26],
            [7, 28, 19],
            [10, 32, 12],
            [17, 29, 8],
            [11, 21, 22],
            [14, 25, 15]
        ],

        centerPoints: [4, 12, 26, 32, 24, 10, 18],
        hexes: {
            4: [0, 2, 8, 11, 7, 1],
            12: [5, 9, 16, 19, 15, 8],
            26: [19, 23, 30, 33, 29, 22],
            32: [25, 29, 35, 36, 34, 28],
            24: [17, 21, 28, 31, 27, 20],
            10: [3, 7, 14, 17, 13, 6],
            18: [11, 15, 22, 25, 21, 14]
        },


        index2points: function(indexes){
            return _.map(indexes, function(i){
                return this.points[i];
            }, this);
        },

        colors: [
            '#f0c500',
            '#e48b21',
            '#008bb9',
            '#91beaf',
            '#649791',
            '#a2163b',
            '#560604',
            '#b9bc63',
            '#4f9f4f'
        ]


    };

    c.points = [];
    c.points[18] = c.center;

    var centerCoords = f.hexPoints(c.center, 2 * c.size);
    for (var i = 0; i < 6; i++) {
        c.points[c.centerPoints[i]] = centerCoords[i];

        var localHex = f.hexPoints(centerCoords[i], c.size);
        for (var j = 0; j < 6; j++) {
            c.points[c.hexes[c.centerPoints[i]][j]] = localHex[j];
        }
    }

    c.symmetryGroups = _.reduce(c.symmetries, function(memo, s){
        memo[s[0]] = _.without(s, s[0]);
        return memo;
    }, {});

    return c;
});


