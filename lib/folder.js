var fs = require('fs');
var FileTree = require('./fileTree.js');

class Folder {
    constructor(name, parent) {
        this.parent = parent || process.cwd();
        this.path = parent + '\\' + name;
        this.content = new FileTree(this.path);
    }

    renew() {
        this.content = new FileTree(this.path);
    }
}

module.exports = Folder;