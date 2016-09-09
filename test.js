var FlatStore = require('./FlatStore.js');

var store = new FlatStore('testing', ['collection1', 'collection2']);
var objectToSave = {
	'appName': 'Tas Dashboard',
	'appPath': 'F:\\BUSAPPS\\TAS\\TAS Dashboard'
}

for (var key in db) {
	console.log(key)
	console.log(db[key])
}

store.collection1.save(objectToSave);

db.collection1.on('save', () => {
	console.log('save event started');
	db.collection1.allObjects(function(err, objs) {
		console.log('returned object/err')
		console.log(err || objs)
	})
})
