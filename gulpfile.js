var gulp = require('gulp');
var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
var less = require('gulp-less');
var babel = require('gulp-babel');
var sourcemaps = require("gulp-sourcemaps");

gulp.task('babel', function () {
    gulp.src(['src/**/*.js','src/**/*.jsx'])
        .pipe(sourcemaps.init())
        .pipe(babel(
          {
            presets: [
              'react',
              'es2015'
            ],
            plugins: [
              // http://babeljs.io/docs/plugins/transform-object-rest-spread/
              "transform-object-rest-spread",

              // export from ES6 to use ./src/components/core/index.js
              "transform-export-extensions",
            ]
          }
        ))
        // .pipe(concat('../static/js/app.js'))
        .pipe(sourcemaps.write("."))
        //.pipe(uglify())
        .pipe(gulp.dest('./build/'));
});

gulp.task('less', function () {
 return gulp.src('./src-style/**/*.less')
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(concat('app.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./public/css'));
});


var watchTaskList = [
  'babel',
  'less'
];

gulp.task('watch',
          // Jobs before watch
          watchTaskList,
          function () {
            gulp.watch(
              [
                'src/**/*.js','src/**/*.jsx',
                'src-style/**/*.less'
              ],
              // watch jobs
              watchTaskList
            );
            // gulp.watch( 'src/**/*.scss', ['css'] );
          }
);
