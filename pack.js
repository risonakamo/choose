const webpack=require("webpack");
const path=require("path");

webpack({
    mode:"production",
    entry:".",

    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,".")
    },

    module:{
        rules:[
            {
                test:/\.jsx$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-react"]
                    }
                }
            },
            {
                test:/\.less$/,
                exclude:/node_modules/,
                use:{
                    loader:"less-loader"
                }
            }
        ]
    }
},(err,stats)=>{
    if (err || stats.hasErrors())
    {
        console.log(stats.toJson().errors);
        return;
    }

    console.log("done");
});