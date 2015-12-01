var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var karma = require('gulp-karma-runner');

gulp.task('default', ['html', 'styles', 'minify-js'], function() {
  gulp.watch('./**/*.html',['html']);
  gulp.watch('./sass/**/*.scss',['styles']);
  gulp.watch('./js/**/*.js',['minify-js']);
});


gulp.task('html', function () {
  gulp.src('./**/*.html')
    .pipe(gulp.dest('../build/html/'));
});

gulp.task('styles', function() {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../build/css/'));
});

gulp.task('minify-js', function () {
  gulp.src('./js/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('../build/javascript/'));
});

gulp.task('karma', function() {
  gulp.src([
    './**/*.js',
    'test/**/*.js'
  ], {'read': false}).pipe(
    karma.server({
      'singleRun': true,
      'frameworks': ['mocha', 'chai'],
      'browsers': ['Chrome', 'Firefox']
    });
  );
});
