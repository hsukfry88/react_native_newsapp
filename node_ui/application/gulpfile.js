const gulp=require('gulp');
const babel = require('gulp-babel');
gulp.task('build',function(){	
	return gulp.src('server/**/*.es')
		.pipe(babel({
				presets:[ 
					"es2015",
      		"stage-3"
      	]
		}))
		.pipe(gulp.dest('./build'))
})


gulp.task('watch',function(){
		gulp.watch('server/**/*.es', ['build']);
});