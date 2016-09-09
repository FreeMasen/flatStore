var rnd = require('crypto').randomBytes;
var fs = require('fs');
var EventEmitter = require('events');
class Doc extends EventEmitter {
	constructor(content, id, stats, path) {
		super()
		this.id = id || (Math.floor(new Date / 1000)) + rnd(8).toString('hex');
		this.stats = stats;
		this.content = content;
		this.path = path || process.cwd();
		this.path += this.id
	}
}

Doc.prototype.watchSelf = function() {
	console.log('watch self')
	fs.watchFile(this.path, (curr, prev) => {
		if (curr.mtime > prev.mtime) {
			Doc.emit('stale')
		}
	})
}

Doc.prototype.on('stale', () => {
	console.log('Doc stale event');
	fs.readFile(this.path, (err, content) => {
		if (!err) this.content = content;
	})
})

module.exports = Doc;
