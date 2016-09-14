var fs = require('fs');
var FileTree = require('./fileTree.js');
var File = require('./file.js')

class Folder {
    constructor(name, parent) {
        this.parent = parent || process.cwd();
        this.path = parent + '\\' + name;
        this.tree = new FileTree(this.path);
    }

    renew() {
        this.tree = new FileTree(this.path);
    }

    find(fileName, cb) {
        for (var k in this.tree) {
            if (this.tree[k] instanceof Folder) {
                this.tree[k].find(filename, cb);
            } else if (this.tree[k] instanceof File) {
                if (k == fileName) {
                    cb(this.tree[k]);
                    return
                }
            }
        }
    }
}

module.exports = Folder;