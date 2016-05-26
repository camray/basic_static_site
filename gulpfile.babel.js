const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');
const livereload = require('gulp-livereload');
const babel = require('gulp-babel');
const concat = require('gulp-concat');


gulp.task('default', ['html', 'sass', 'javascript']);
gulp.task('develop', ['html', 'sass', 'javascript', 'serve', 'watch']);

gulp.task('html', () => {
   return gulp.src('./html/**/*.html')
      .pipe(gulp.dest('dist/html'))
      .pipe(livereload());
});


gulp.task('sass', () => {
   return gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(livereload());
});

gulp.task('javascript', () => {
   return gulp.src('./js/*.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(livereload());
});

gulp.task('watch', () => {
   livereload.listen();
   gulp.watch('./html/**/*.html', ['html']);
   gulp.watch('./sass/**/*.scss', ['sass']);
   gulp.watch('./js/**/*.js', ['javascript']);
});

gulp.task('serve', () => {
   gulp.src('dist/html')
      .pipe(webserver({
         livereload: true,
         open: true
      }));
});
