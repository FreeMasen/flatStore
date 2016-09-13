var fs = require('fs');
var FileTree = require('./fileTree.js')
var os = require('os');

class File {
    constructor(filePath) {
        this.path = filePath;
        this.renew()
    }

    getContent(cb) {
        var self = this;
        if (self.isDir) {
            cb(new Error('This File is a directory.'))
        } else {
            fs.readFile(this.path, 'utf8', (err, data) => {
                cb(err, data);
        });
        }
    }

    renew() {
        var stat = fs.statSync(this.path);
        this.lastAccess = stat.atime;
        this.lastMod = stat.mtime;
        this.size = stat.size;
        this.isDir = stat.isDirectory();
    }

    appendLine(line, cb) {
        fs.appendFile(this.path, line + os.EOL, (err) => {
            if (err) {
                cb(err);
            } else {
                cb(undefined, line);
            }
        });
    }

    clear(cb) {
        var self = this;
        fs.readFile(self.path, (err, data) => {
            if (err) {
                cb(err);
            } else {
                fs.truncate(self.path, 0, (trunkErr) => {
                    if (err) {
                        cb(trunkErr);
                    } else {
                        cb(undefined, data);
                    }
                })
            }
        })
    }

    removeLine(index, cb) {
        var opts = {
            flags: 'r',
            encoding: 'utf8',

        }
        // fs.createReadStream(this.path, )
    }
}

module.exports = File


