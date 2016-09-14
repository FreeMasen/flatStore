var fs = require('fs');
var os = require('os');


/*
Underlying File object with be the
basis for our Doc object.  This
should just act as an API into fs
*/
class File {
    constructor(filePath) {
        this.path = filePath;
        this._ensureExists();
        this.renew();
    }
    /*
    Since the File object is just a container
    so we don't hold too much data in memory
    you can use this when you need to get the
    full contents of the file.
    */
    getContent(cb) {
        var self = this;
        fs.readFile(this.path, 'utf8', (err, data) => {
            cb(err, data);
        });
    }

    /*
    renews the stats of the file (would like to add this functionality
        into a watcher)
    */
    renew() {
        var stat = fs.statSync(this.path);
        if (stat.isDirectory()) throw new Error('Cannot treat directory as a file');
        this.lastAccess = stat.atime;
        this.lastMod = stat.mtime;
        this.size = stat.size;
    }

    /*
    Delete, removes the file, the callback will hold
    (err, data) where data is the contents of the 
    file that was just removed.
    */
    delete(cb) {
        var self = this;
        fs.readFile(self.path, (err, data) => {
            if (err) {
                cb(err);
            } else {
                fs.unlink(self.path, (unlinkErr) => {
                    if (err) {
                        cb(unlinkErr);
                    } else {
                        cb(undefined, data);
                    }
                });
            }
        });
    }

    /*
    Add a single line to the file, terminating with the os.EOL character
    */
    appendLine(content, cb) {
        var self = this;
        fs.appendFile(self.path, content + os.EOL, (err) => {
            if (err) {
                cb(err);
            } else {
                cb(undefined, content);
            }
        });
    }

    _ensureExists() {
        try {
            fs.accessSync(this.path);
        } catch(e) {
            fs.writeFileSync(this.path, '');
        }
    }
}


module.exports = File;