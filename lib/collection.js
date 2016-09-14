var fs = require('fs');
var Folder = require('./folder.js');
var File = require('./file.js');

class Collection extends Folder {
    constructor(name, parent) {
        this.name = name;
        this._content = new Folder(name, parent);
        this._indexes = [];
        this._establishIndexes();
    }

    find(query, cb) {
        for (var k in query) {
            this._findIndex(k, (index) => {

            });
        }
    }

    _findIndex(name, cb) {
        
    }
}