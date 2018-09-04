const gulp=require("gulp");
const less=require("gulp-less");
const babel=require("gulp-babel");

console.log("gulp is watching");

gulp.watch("*.less",()=>{
    gulp.src("*.less",{base:"."}).pipe(less()).pipe(gulp.dest("."));
    console.log("compiled less");
});

gulp.watch("*.jsx",()=>{
    gulp.src("*.jsx",{base:"."}).pipe(babel({presets:["@babel/preset-react","minify"]})).pipe(gulp.dest("."));
    console.log("compiled jsx");
});