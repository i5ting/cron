var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha'); 

var src_dir = ['db/**/*.js']
var test_dir = ['test/*.js']
	
gulp.task('test', function (cb) {
  gulp.src(src_dir)
    .pipe(istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(test_dir)
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb);
    });
});

gulp.task('default',['test'], function() {
  gulp.watch(['./db/**/*','./test/**/*'], ['test']);
});

gulp.task('watch',['test'], function() {
  gulp.watch(['./db/**/*','./test/**/*'], ['test']);
});