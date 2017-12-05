const gulp = require('gulp');
const jshint = require('jshint');
const stylish = require('jshint-stylish');
const pluginsOptions = {
  // enable debugging, camel case hyphenated names, and lazily load plugins.
  DEBUG: true,
  camelize: true,
  lazy: true
};
const plugins = require('gulp-load-plugins')(pluginsOptions);

const onError = (err) => {
  console.log(`Error = ${err}`);
}

gulp.task('js', () => {
  gulp.src('./js/index.js')
    .pipe(gulp.dest('build', {
      overwrite: true
    }));
});

// It's useful to set a watch task to bundle many watch methods together. 
// The array runs tasks first, then proceeds to watch files.
gulp.task('watch', ['js'], () => {
  gulp.watch('./js/**/*.js', ['js']);
});

// Runs if when you do gulp from the terminal
gulp.task('default', () => {
  console.log('The default gulp task ran!');
});