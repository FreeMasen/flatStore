var fs = require('fs');
var Doc = require('./Doc.js');
var util = require('util');
var e = require('events');


class Folder extends e {
	constructor(name, parent) {
		super()
		this.name = name;
		this.path = parent + '\\' + name;

		if (!exists(this.path)) {
			console.log('path exists fails, creating new path');
			fs.mkdirSync(this.path)
		} else {
			this.readFiles()
		}
		this.files = {};
		this.isEmpty = function() {
			return Object.keys(this.files).length > 0
		}
	}
}

Folder.prototype.readFiles = function() {
	var self = this
	fs.readdir(self.path, (err, files) => {
		for (i=0;i<files.length;i++) {
			var f = files[i];
			var filePath = self.path + '\\' + f
			fs.stat(filePath, (err, stat) => {
				if (!err && stat.isFile()) {
					fs.readFile(filePath, 'utf8', (data) => {
						var content = JSON.parse(data);
					})
				}
			})

			this.files[f] = new Doc()
		}
	})
}

Folder.prototype.save = function(object) {
	var self = this;
	console.log('start save')
	var doc = new Doc(object);
	var content = JSON.stringify(doc.content);
	fs.writeFile(this.path + '\\' + doc.id, content, function(e, w) {
		if (!e){
			self.emit('saveSuccess', doc);
		} else {
			self.emit('saveFailure', e);
		}
	});
}

Folder.prototype.removeFile = function(id) {
	var self = this
	fs.unlink(this.path + '\\' + id, function (e) {
		if (!e) {
			self.files[id] = 'undefined';
			self.emit('removeSuccess', id);
			if (self.isEmpty()) {
				self.emit('empty')
			}
		} else {
			self.emit('removeFailure', e);
		}
	});

}

Folder.prototype.destroy= function() {
  clearFolder(this.location);
	this.on('empty', function() {
		fs.rmdir(this.location, function(e) {
			if (e) {
				throw(e);
			}
		});
	});
};

function clearFolder(path) {
	fs.readdir(path, function(err, files) {
		for (i=0;i<files.length;i++) {
			var filePath = path + '\\' + files[i];
			console.log('checking ' + filePath);
			checkDirectory(files[i]);
		}
	});
}

function checkDirectory(filePath) {
	fs.lstat(filePath, function (err, stat) {
			if (!err) {
				if (stat.isDirectory()) {
					clearFolder(filePath);
				} else {
					this.removeFile(filePath);
				}
			}
	});
}

Folder.prototype.find = function(object, callback) {
	if (object.id !== 'undefined') {
		findById(object.id, callback)
	} else {
		findFromObjectProperty
	}
}

Folder.prototype.findOne = function(object, callback) {

}

function findById(id, callback) {
	if (this.files[id] !== 'undefined') {
		objectFromFile(id, callback)
	}
}

function objectFromFile(fileName, callback) {
	var filePath = this.location + '\\' + fileName
	fs.readFile(filePath, (err, data) => {
		callback(err, JSON.parse(data));
	})
}

Folder.prototype.allObjects = function(callback) {
	console.log('enter allObjects');
	var objects = [];
	var self = this;
	fs.readdir(this.path, function(err, files) {
		if (!err) {
			console.log('found ' +files.length +' files')
		for (i=0;i<files.length;i++) {
			var filePath = self.path + '\\' + files[i];
			console.log('filepath: ' + filePath)
			fs.readFile(filePath, 'utf8', (err, data) => {

				objects.push(JSON.parse(data));
				console.log('i: ' + i)
				if (i >= files.length -1) {
					console.log('last object pushed, sending to callback')
					callback(err, objects)
				}
			})
		}
	}
	});
}

Folder.prototype.insert = function(object, callback) {

}

Folder.prototype.remove = function(object, callback) {

}

Folder.prototype.update = function(object, callback) {

}


module.exports = Folder;

function exists(path) {
	try {
		fs.accessSync(path);
		return true
	} catch(e) {
		return false
	}
}
