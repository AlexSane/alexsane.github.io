define(['functions'], function(f){
    var c = {
        size: 45,
        symmetries: [
            [0, 27, 30],
            [1, 31, 23],
            [3, 34, 16],
            [4, 24, 26],
            [6, 36, 9],
            [7, 28, 19],
            [10, 32, 12],
            [11, 21, 22],
            [13, 35, 5],
            [14, 25, 15],
            [17, 29, 8],
            [20, 33, 2]
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

        allowed:{
            '0-1':[],
            '0-3':[1],
            '0-4':[],
            '0-11':[4],
            '1-3':[],
            '1-4':[],
            '1-6':[3],
            '1-7':[],
            '1-14':[7],
            '3-6':[],
            '3-7':[],
            '3-10':[],
            '3-11':[7],
            '3-17':[10],
            '4-7':[],
            '4-10':[7],
            '4-11':[],
            '4-13':[10,7],
            '6-10':[],
            '6-13':[],
            '6-14':[10],
            '6-20':[13],
            '7-10':[],
            '7-11':[],
            '7-13':[10],
            '7-14':[],
            '10-13':[],
            '10-14':[],
            '10-17':[],
            '11-14':[],
            '11-17':[14],
            '11-20':[14,17],
            '13-17':[],
            '13-20':[],
            '14-17':[],
            '14-20':[17],
            '17-20':[]
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

    var center = (c.size*Math.sqrt(3)/2)*4 - c.size/8 ;
    c.center = {
        x: center,
        y: center
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
        memo[s[0]] = s;
        return memo;
    }, {});




    return c;
});


