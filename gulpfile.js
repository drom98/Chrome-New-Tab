var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

// Define tasks after requiring dependencies
function style() {
	return (
  	gulp
    	.src("src/scss/*.scss")
      .pipe(sass())
        .on("error", sass.logError)
      .pipe(gulp.dest("src/css/"))
    	.pipe(browserSync.stream())
  );
}
 
// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;

function reload(done) {
	browserSync.reload();
	done();
}

function watch(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
	gulp.watch('src/scss/*.scss', style)
	gulp.watch("/*.html", reload);
}
    
// Don't forget to expose the task!
exports.watch = watch