var Folder = require('../lib/folder.js');
var assert = require('assert');

describe('Folder', function() {
        var folder = new Folder('test');
        it('Should not be undefined', function() {
            assert(folder != undefined)
        });
        it('Should have a string variable parent', function() {
            assert(folder.parent != undefined);
            assert(typeof folder.parent == 'string');
        });
        it('Should have a string variable path', function() {
            assert(folder.path != undefined);
            assert(typeof folder.path == 'string');
        });
        it('Should have a tree variable', function() {
            assert(folder.tree != undefined);
        });
        describe('.find(filename, cb)', function() {
            folder.find('folderTest.js', (file) => {
                assert(file != undefined)
            })
        })
});