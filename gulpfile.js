'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));;
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var Paths = {
  PUBLIC: './public',
  SCSS: './public/assets/scss/**/*.scss',
  CSS: './public/assets/css/',
  JS: './public/assets/*.js',
  HTML: './public/**/*.html'
}

// Compile sass into css.
gulp.task('sass', function() {
  return gulp.src(Paths.SCSS)
  .pipe(sourcemaps.init())
  .pipe(sass.sync({
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    overrideBrowsersList: ['last 2 versions']
  }))
  .pipe(gulp.dest(Paths.CSS))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream());
});

// Static server
gulp.task('serve', function(done) {
  browserSync.init({
    server: Paths.PUBLIC
  });
  done();
});

// Watching html/scss files
gulp.task('watch', function(done) {
  gulp.watch(Paths.SCSS, gulp.series('sass'));
  gulp.watch(Paths.SCSS).on('change', browserSync.reload);
  gulp.watch(Paths.HTML).on('change', browserSync.reload);
  gulp.watch(Paths.JS).on('change', browserSync.reload);
  done();
});

gulp.task('default', gulp.series('sass', 'serve', 'watch'));