const webpack=require("webpack");
const path=require("path");

webpack({
    mode:"production",
    entry:".",

    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,".")
    }
},(err,stats)=>{
    if (err || stats.hasErrors())
    {
        console.log(stats.toJson().errors);
        return;
    }

    console.log("done");
});