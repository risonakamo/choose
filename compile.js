const gulp=require("gulp");
const less=require("gulp-less");
const babel=require("gulp-babel");

gulp.src("*.less",{base:"."}).pipe(less()).pipe(gulp.dest("."));

gulp.src("*.jsx",{base:"."}).pipe(babel({presets:["@babel/preset-react"]})).pipe(gulp.dest("."));