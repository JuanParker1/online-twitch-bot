// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    react = require('gulp-react'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    streamify = require('gulp-streamify'),
    watch = require('gulp-watch'),
    babelify = require("babelify");
var jsx = require('gulp-jsx');
var exec = require('child_process').exec;
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var resolutions = require('browserify-resolutions');

var removeEmptyLines = require('gulp-remove-empty-lines');

gulp.task('browserify', function() {
    setTimeout(function() {
        return browserify('./src/generated/js/App.js')
            .plugin(resolutions, '*')
            .transform(babelify, {presets: ["es2015", "react", "stage-0"]})
            .bundle()
            .pipe(source('./app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./'));
    }, 3000);
});
gulp.task('generateCss', function () {
    return gulp.src('./src/less/*.less')
      .pipe(less())
      .pipe(gulp.dest('./css'));
});

//var watcher = gulp.watch('src/generated/vb/*.vb', {debounceDelay: 5000}, ['generate']);
//watcher.on('change', function(event) {
//    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//});
//var watcher = gulp.watch('src/generated/less/*.less', ['generateCss']);
//watcher.on('change', function(event) {
//    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//});

//gulp.task('generate', function(callback) {
//    runSequence(['generateReactComponentsFromJSON', 'generateCss'], 'browserify', callback);
//});

// Just running the two tasks
// gulp.task('default', ['generate']);

