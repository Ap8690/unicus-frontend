const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')

module.exports = function override(config, env) {
    config.plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
    )
    return config;
}
