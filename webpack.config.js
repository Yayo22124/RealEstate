import path from "path"

export default {
    mode: "development",
    entry: "./src/lib/map.js",
    output: {
        filename: `map.js`,
        path: path.resolve("src/public/js")
    },
}