function FileListPlugin(options) {
    this.options = Object.assign({}, options || {}, {
        filename: 'filelist.json'
    });
}

FileListPlugin.prototype.apply = function (compiler) {
    const options = this.options;

    compiler.plugin('emit', function (compilation, callback) {

        const fileMap = {};
        compilation.entrypoints.forEach(function(entrypoint, name) {
            const chunk = entrypoint.getRuntimeChunk();
            const chunkGroups = [...chunk.groupsIterable];
            const files = fileMap[name] || [];

            chunkGroups.forEach(chunkGroup => {
                chunkGroup.chunks.forEach(chunk => {
                    chunk.files.forEach(file => {
                        if (!file.endsWith('.map')) {
                            files.push(file);
                        }
                    });

                    fileMap[name] = files;
                });
            });
        });

        const content = JSON.stringify(fileMap, null, 4);

        // Insert this list into the webpack build as a new file asset:
        compilation.assets[options.filename] = {
            source: function () {
                return content;
            },
            size: function () {
                return content.length;
            }
        };

        callback();
    });
};

module.exports = FileListPlugin;
