var gulp = require('gulp');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
// var sourcemaps = require("gulp-sourcemaps");

gulp.task('babel', function () {
    gulp.src(['src/**/*.js','src/**/*.jsx'])
        // .pipe(sourcemaps.init())
        .pipe(babel(
          {
            presets: [
              'react',
              'es2015'
            ],
            plugins: [
              // http://babeljs.io/docs/plugins/transform-object-rest-spread/ 
              "transform-object-rest-spread",
              // "syntax-object-rest-spread"
            ]
          }
        ))
        // .pipe(concat('../static/js/app.js'))
        //.pipe(sourcemaps.write("."))
        //.pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('watch',
          [
            'babel',
            //'css'
          ],
          function () {
            gulp.watch(['src/**/*.js','src/**/*.jsx'], ['babel']);
            // gulp.watch( 'src/**/*.scss', ['css'] );
          }
);
