var fs = require('fs');

class Collection {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        
        this.path = parent.path + '\\' + name
        confirmFolder();
        confirmIndex();
    }
}



function createFolder(filePath) {
    fs.mkdir(filePath, (err) => {
        if (err) throw err
    });
}