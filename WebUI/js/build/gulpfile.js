var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jshintstylish = require('gulp-jscs');

gulp.task('vetMyCode', function() {
    gulp.src([
            '../actions/*.js',
            '../components/*.js',
           '../constants/*.js',
           '../dispatcher/*.js',
           '../repositories/*.js',
           '../stores/*.js',
           '../app.js'
        ])
        .pipe(jshint())
        .pipe(jscs())
        .pipe(jshint.reporter('jshint-stylish',{verbose: true}));
});
//gulp.task('hello-world-task', function () {
//    console.log("our first hello world task");
//});

//'./components/*.js',
//           './constants/*.js',
//           './dispatcher/*.js',
//           './repositories/*.js',
//           './stores/*.js',
//           './app.js'
