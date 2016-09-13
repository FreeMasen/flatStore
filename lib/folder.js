var fs = require('fs');
var FileTree = require('./FileTree.js')

class Folder {
    constructor(name, parent) {
        this.parent = parent || process.cwd();
        this.path = parent + '\\' + name;
        this.renew();
    }

    renew() {
        this.fileTree = new FileTree(this.path);
    }
}

module.exports = Folder;