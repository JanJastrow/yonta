// Require all those npm-modules

var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cssmin          = require('gulp-cssmin'),
    rename          = require('gulp-rename'),
    del             = require('del'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    cache           = require('gulp-cache'),
    plumber         = require('gulp-plumber');


// render scss
gulp.task('styles', function() {var onError = function(err) {
        notify.onError({
                    title:    "Gulp",
                    subtitle: "Failure!",
                    message:  "Error: <%= error.message %>",
                    sound:    "Submarine"
                })(err);

        this.emit('end');
    };
    gulp.src('./src/main.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'IE 11', 'safari 9', 'Firefox ESR', 'ios 10', 'android 5'))
        .pipe(rename("app.unminified.css"))
        .pipe(gulp.dest('./css'))
        .pipe(cssmin())
        .pipe(rename("app.css"))
        .pipe(gulp.dest('./css'))
});

// watch it while working
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('src/*.scss', ['styles']);
});


// clean the folders
gulp.task('cleanup', function(cb) {
    del(['./css/*'], cb)
});


// default: all of them! \o/
gulp.task('default', function() {
    gulp.start('cleanup');
    gulp.start('styles');
});
