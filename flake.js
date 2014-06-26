var TAU = 2*Math.PI;

var size = 50;
var center = {x:200,y:200};

function hex(center, radius){
    var result=[];
     for (var i=0;i<6;i++){
        var x = radius*Math.sin(TAU*i/6) + center.x;
        var y = radius*Math.cos(TAU*i/6) + center.y;
        
        result.push({x:x, y:y});
    }

    return result;
}

var points = [];
points[18] = center;

var centerCoords = hex(center, 2*size);
var centerPoints = [4,12,26,32,24,10];
var hexes = {
    4:[0,2,8,11,7,1],
    12:[5,9,16,19,15,8],
    26:[19,23,30,33,29,22],
    32:[25,29,35,36,34,28],
    24:[17,21,28,31,27,20],
    10:[3,7,14,17,13,6]
};


for (var i=0;i<6;i++) {
    points[centerPoints[i]] = centerCoords[i];
    
    var localHex = hex(centerCoords[i], size);
    for(var j=0;j<6;j++){
        points[hexes[centerPoints[i]][j]] = localHex[j];
    }
    
}
console.log(points);

var s = Snap("#flake");
for (var i=0;i<37;i++){
    s.text(points[i].x, points[i].y, ""+i).attr({'font-size':10});
}


var symmetry = [
    [0,27,30]
];
