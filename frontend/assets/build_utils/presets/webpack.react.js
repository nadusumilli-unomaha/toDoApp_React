const config = env => ({
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader"]
            }
        ]
    }
});

module.exports = config;
