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
  gulp.src('./js/**/*.js')
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('index.js'))
      .pipe(plugins.babel({
        presets: ['env']
      }))
      .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('build', {
      overwrite: true
    }));
});

gulp.task('sass', () => {
  return gulp.src('./scss/style.scss')
    .pipe(plugins.plumber({
      errorHandler: onError()
    }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      outputStyle: 'compressed'
    }))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('build', {
      overwrite: true
    }));
});

// It's useful to set a watch task to bundle many watch methods together. 
// The array runs tasks first, then proceeds to watch files.
gulp.task('watch', ['js', 'sass'], () => {
  gulp.watch('./js/**/*.js', ['js']);
  gulp.watch('./scss/**/*.scss', ['sass']);
});

// Runs if when you do gulp from the terminal
gulp.task('default', () => {
  console.log('The default gulp task ran!');
});