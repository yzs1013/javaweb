const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
    productionSourceMap: false,
    transpileDependencies: ['element-ui'],  // 需要兼容IE10要放开这个
    chainWebpack: config => {
        config.plugin('html').tap(options => {
            options[0].title = 'Ele+Vue旗舰版';
            return options;
        });
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin').use(new CompressionWebpackPlugin({
                test: /\.(js|css|less)$/,
                threshold: 10240,  // 对超过10kb的文件压缩
                deleteOriginalAssets: false
            }));
        }
    }
}