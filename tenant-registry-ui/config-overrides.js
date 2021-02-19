const FileListPlugin = require('./scripts/FileListPlugin')

module.exports = function override(config, env) {
    if (env === 'production') {
        config.plugins.push(new FileListPlugin());
    }

    return config
}
