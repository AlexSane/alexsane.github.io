var gulp = require('gulp'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    watch = require('gulp-watch');

var batch = require('gulp-batch');


gulp.task('minify-css', function () {
    gulp.src('./css/style.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./deploy/'))
});
gulp.task('require', function () {
    gulp.src('./js/vendor/requirejs/require.js')
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest('./deploy/'))
});
gulp.task('requirejsBuild', function () {
    rjs({
        baseUrl: 'js',
        out: 'build.js',
        paths: {
            Underscore: 'vendor/underscore/underscore',
            Snap: 'vendor/snap.svg/dist/snap.svg'
        },
        name: "app",
        shim: {
            Underscore: {
                exports: '_'
            },
            Snap: {
                exports: 'Snap'
            }
        }
    })
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest('./deploy/')); // pipe it to the output DIR
});

/*gulp.task('css', function () {
 gulp.src(path)
 .pipe(stylus())
 .pipe(prefix("last 2 Chrome versions"))
 .pipe(gulp.dest(dest))
 });
 gulp.task('watch', function() {
 gulp.watch(path, ['css']);
 });*/


gulp.task('default', ['requirejsBuild', 'minify-css', 'require']);

gulp.task('watch', function () {
    watch('js/**/*.js', batch(function (events, done) {
        gulp.start('default', done);
    }));
});
