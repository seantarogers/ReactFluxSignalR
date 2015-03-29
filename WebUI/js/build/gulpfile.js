var gulp = require('gulp');
var args = require('yargs').argv; //goes out and gets args
var $ = require('gulp-load-plugins')({ lazy: true });
var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var config = require('./gulpconfig')();
var streamify = require('streamify');
var transform = require('vinyl-transform');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['main'], function () { });

var bundler = watchify(browserify(watchify.args));

// add the entry file to bundle
bundler.add(config.appEntryFile);
gulp.task('main', bundle);
bundler.on('update', bundle); // on any dependency update, runs the bundler
bundler.on('log', $.util.log); // output build logs to terminal

function bundle() {
    console.log('bundler running');
    runCodeQuality();

    if (config.isProduction) {

        return bundler.bundle()
            .pipe($.plumber())
            .pipe(source(config.bundleName))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(config.bundleDestination));
    }

    return bundler.bundle()
        .pipe($.plumber())
        .pipe(source(config.bundleName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest(config.bundleDestination));
}

function handleError(task) {
    return function (err) {
        $.log($.colors.red(err));
        notify.onError(task + ' failed, check the logs..')(err);
    };
}

//gulp watcher example...not as efficient
gulp.task('js-watcher', function () {
    gulp.watch([config.alljs], ['vetMyCode']);
});


gulp.task('styles', function () {
    log('about to run gulp to compile less>css');
    return gulp
            .src(config.allcss) //todo add the config
            .pipe($.less())
            //only get autoprefixer for >5% of the browser market
            .pipe($.autoprefixer({ browsers: ['last 2 versions', '> 5%'] }))
            .pipe(gulp.dest(config.dest));
}); //pass in a callback to ensure proper sequencing
gulp.task('cleanstyles', function (done) {
    var files = config.temp;
    clean(files, done);
});

function runCodeQuality() {
    gulp.src(config.alljs)
        .pipe($.plumber())
        .on('error', errorLogger) //better way of error handling is the plumber
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        //.pipe($.jscs()) //style cop..
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('gulp-jshint-file-reporter', {
            filename: config.jshintoutput + 'jshint-output.log'
        }))
        .pipe($.jshint.reporter('fail'));
}

//to compile less to css - not implemented yet as we dont have any less -  but we will have!
function errorLogger(error) {
    log("=====start of error");
    log('error: ' + $.util.colors.red(error));
    log("=====end of error");
    //this will end the pipeline
    this.emit('end');
}

//when clean is done call back to the original task - this ensures things are sequenced properly
function clean(path, done) {
    log('cleaning up the following: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));

            }
        }

    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}

//slow watchify one that recalculates all...
gulp.task('watchallscripts', function () {
    var bundler = browserify('../app.js', { debug: true });
    var stream = bundler.bundle();
    return stream
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./tmp'));
});

gulp.task('watchScripts', function () {
    gulp.watch(config.alljs, ['scripts']);
});

//replaced these below with $ - so any new gulp plugin added does not require a require statement
//var jshint = require('gulp-jshint');
//var jscs = require('gulp-jscs');
//var util = require('gulp-util');
//var gulpprint = require('gulp-print');
//var gulpif = require('gulp-if');

gulp.task('browserifyAndUglifyWorking', function () {
    var browserified = transform(function (filename) {
        var b = browserify({
            entries: filename, // browserify will load all dependencies
            debug: true, // sourcemapping for debugging
            cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
        });
        return b.bundle();
    });

    return gulp.src(config.appEntryFile)
      .pipe(browserified)
      .pipe(uglify())
      .pipe($.rename(config.bundleName))
      .pipe(gulp.dest(config.bundleDestination));
});


//gulp.task('images', function () {
//    return gulp.src('./src/images/**')
//        .pipe(imagemin())
//        .pipe(gulp.dest('./build/images'));
//});

//note we are requiring and then executing because this is a function


//gulp.task('browserify', function () {
//    return browserify('../app.js', {debug: true})
//           .bundle()
//           //output file name
//           .pipe(source('bundle.js'))
//           //output location
//           .pipe(gulp.dest('./build/dist'));
//});
