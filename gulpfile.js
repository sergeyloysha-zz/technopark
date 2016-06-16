var gulp        = require('gulp');
var browserSync = require('browser-sync');
var stylus        = require('gulp-stylus');
var jade        = require('gulp-jade');
var reload      = browserSync.reload;

sources = {
  jade: "./app/!(_)*.jade",
  stylus: "./app/stylus/**/*.styl",
  fonts: "./app/fonts/**/*.*",
  images: "./app/images/**/*.*"
};

destinations = {
  server: "./dist",
  html: "./dist/",
  css: "./dist/css",
  fonts: "./dist/fonts",
  images: "./dist/images",
};

/**
 * Compile jade files into HTML
 */
gulp.task('templates', function() {

    var YOUR_LOCALS = {};

    return gulp.src(sources.jade)
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest(destinations.html))
});

gulp.task('jade-watch', ['templates'], reload);

gulp.task('stylus', function () {
    return gulp.src(sources.stylus)
        .pipe(stylus({style: "compressed"}))
        .pipe(gulp.dest(destinations.css))
        .pipe(reload({stream: true}));
});

gulp.task('fonts', function () {
    return gulp.src(sources.fonts)
        .pipe(gulp.dest(destinations.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('images', function () {
    return gulp.src(sources.images)
        .pipe(gulp.dest(destinations.images))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['stylus', 'templates', 'fonts', 'images'], function () {

    browserSync({server: destinations.server});

    gulp.watch('./app/stylus/*.styl', ['stylus']);
    gulp.watch('./app/*.jade', ['jade-watch']);
    gulp.watch('./app/fonts/**/*.*', ['fonts']);
    gulp.watch('./app/images/**/*.*', ['images']);
});
