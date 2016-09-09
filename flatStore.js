var fs = require('fs');
var Folder = require('./Folder.js');

class FlatStore {
	constructor(name, folders, parentDirectory) {

		if (name === 'undefined') {
			throw(new Error('name must not be undefined'))
		}
		if (!folders) {
			throw(new Error('folders must not be undefined'))
		}
		if (!(Array.isArray(folders))) {
			throw(new Error('folders must be an array'))
		}

		this.name = name;

		var location = parentDirectory || process.cwd();
		this.folder = new Folder(this.name, location);
		this.location = location + '\\' + name

		for (var i=0;i<folders.length;i++) {
			this[folders[i]] = new Folder(folders[i], this.location)
		}
	}
}

module.exports = FlatStore
