module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    devServer: {
        proxy: {
            "^/api": {
                target: "http://alegra-restaurant-vue:3080",
                changeOrigin: true,
            },
        },
    },
};