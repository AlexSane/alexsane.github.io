define(['makeSvg'], function(f){
    var textFile = null,
        makeSvgFile = function (text) {
            var data = new Blob([text], {type: 'image/svg+xml'});

            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);

            return textFile;
        };
    return makeSvgFile;
})