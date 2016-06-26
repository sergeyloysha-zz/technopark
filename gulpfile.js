var gulp        = require('gulp');
var browserSync = require('browser-sync');
var stylus        = require('gulp-stylus');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var jade        = require('gulp-jade');
var ghPages = require('gulp-gh-pages');
var reload      = browserSync.reload;

sources = {
  jade: "./app/!(_)*.jade",
  js: "./app/js/**/*.js",
  stylus: "./app/stylus/**/*.*",
  fonts: "./app/fonts/**/*.*",
  images: "./app/images/**/*.*"
};

destinations = {
  server: "./dist",
  html: "./dist/",
  js: "./dist/js",
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
    var processors = [
      autoprefixer({browsers: ['last 2 versions', 'Safari <= 9']}),
    ];
    return gulp.src(sources.stylus)
        .pipe(stylus({style: "compressed"}))
        .pipe(postcss(processors))
        .pipe(gulp.dest(destinations.css))
        .pipe(reload({stream: true}));
});

gulp.task('fonts', function () {
    return gulp.src(sources.fonts)
        .pipe(gulp.dest(destinations.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('js', function () {
    return gulp.src(sources.js)
        .pipe(gulp.dest(destinations.js))
        .pipe(reload({stream: true}));
});

gulp.task('images', function () {
    return gulp.src(sources.images)
        .pipe(gulp.dest(destinations.images))
        .pipe(reload({stream: true}));
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['stylus', 'templates', 'js', 'fonts', 'images'], function () {

    browserSync({server: destinations.server});

    gulp.watch('./app/stylus/*.styl', ['stylus']);
    gulp.watch('./app/*.jade', ['jade-watch']);
    gulp.watch('./app/js/**/*.js', ['js']);
    gulp.watch('./app/fonts/**/*.*', ['fonts']);
    gulp.watch('./app/images/**/*.*', ['images']);
});
