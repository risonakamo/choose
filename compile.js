const gulp=require("gulp");
const less=require("gulp-less");

gulp.src("index.less",{base:"."}).pipe(less()).pipe(gulp.dest("."));