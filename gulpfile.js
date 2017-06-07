var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');

gulp.task('doc', function(cb) {
    gulp.src(['README.md', './doc/**/*.js'], {
        read: false
    })
        .pipe(jsdoc(cb));
});