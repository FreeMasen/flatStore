var fs = require('fs');
var File = require('./file.js')

class FileTree {
    constructor(rootPath) {
        //console.log('constructing ' + rootPath)
        this.root = rootPath;
        this.content = {};
        this.scanContents(rootPath);
    }


    scanContents(path, parent) {
        //console.log('scanning ' + path)
        var self = parent || this;
        var files = fs.readdirSync(path)
            //console.log('readdir with ' + files.length + ' files')
        for (var i=0;i<files.length;i++) {
            
            var filename = files[i];
            if (filename[0] == '.') continue
            var filePath = path + '\\' + filename;
            //console.log('generating File object for ' + filename)
            var file = new File(filePath);
            if (file.isDir) {
                //console.log(filename + 'is a directory')
                self.scanContents(filePath, self);
            } else {
                //console.log(filename + 'is not a directory')
                self.content[filename] = file;
            }
        }
    }
}
module.exports = FileTree


