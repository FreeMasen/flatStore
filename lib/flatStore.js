
class Flatstore {
    constructor(storeName, collectionNames) {
        this.name = storeName;
        this.path = process.cwd() + storeName;
        checkFolder(this.path);
        this.collections = [];

        for (i=0;i<collectionNames.length;i++) {
            this.collections.push(new Collection(collectionNames[i], this));
        }
    }
}

function checkFolder(path) {
     var filePath = process.cwd() + '\\' + name
    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) createFolder(filePath)
    })
}