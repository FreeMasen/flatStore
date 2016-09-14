var fs = require('fs');
var File = require('./file.js')
var Folder = require('./folder.js')

/* TODO: investigate why this failes using the 
class keyword but works with the function keyword

class FileTree {
    constructor(rootPath) {
        this.root = rootPath;
        this.content = {};
        scanContents(rootPath);
    }
}
*/

function FileTree(rootPath) {
    this.root = rootPath;
    this.content = {};
    scanContents;
}

function scanContents(path) {
        //console.log('scanning ' + path)
        var self = this;
        var files = fs.readdirSync(path)
            //console.log('readdir with ' + files.length + ' files')
        for (var i=0;i<files.length;i++) {
            
            var filename = files[i];
            var filePath = path + '\\' + filename;
            if (filename[0] == '.') continue
            if (fs.statSync(filePath).isDirectory()) {
                var folder = new Folder(filePath);
                self.content[filename] = folder;
            } else {
                var file = new File(filePath);
                self.content[filename] = folder;
            }
        }
    }

module.exports = FileTree;
