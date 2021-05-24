const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const rollup = require('rollup');
const sass = require('gulp-sass');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

function browserSyncInit(cb) {
  browserSync.init({
    server: true,
  });
  cb();
}

function js(cb) {
  return rollup
    .rollup({
      input: './assets/js/main.js',
      plugins: [
        nodeResolve(),
      ],
      context: 'window',
    })
    .then(bundle => {
      return bundle.write({
        file: './dist/js/main.js',
        sourcemap: true,
      });
    });
}

function scss() {
  return gulp
    .src('assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function watch() {
  gulp.watch('assets/scss/**/*.scss').on('change', scss);
  gulp.watch('assets/js/**/*.js').on('change', gulp.series(js, browserSync.reload));
  gulp.watch('index.html').on('change', browserSync.reload);
}

exports.watch = gulp.series(browserSyncInit, js, scss, watch);
exports.build = gulp.series(js, scss);
