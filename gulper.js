const gulp=require("gulp");
const less=require("gulp-less");
const babel=require("gulp-babel");
const plumber=require("gulp-plumber");

var lognumber=1;
var plumberoptions={
    errorHandler:(err)=>{
        console.log("error but whatever");
    }
};

console.log("gulp is watching");

gulp.watch("*.less",()=>{
    gulp.src("*.less",{base:"."}).pipe(plumber(plumberoptions)).pipe(less()).pipe(gulp.dest("."));

    console.log(`${lognumber} compiled less`);
    lognumber++;
});

gulp.watch("*.jsx",()=>{
    gulp.src("*.jsx",{base:"."}).pipe(plumber(plumberoptions))
        .pipe(babel({presets:["@babel/preset-react"]}))
        .pipe(gulp.dest("."));

    console.log(`${lognumber} compiled jsx`);
    lognumber++;
});