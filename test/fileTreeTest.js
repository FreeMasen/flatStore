var FileTree = require('../lib/fileTree.js');
var File = require('../lib/file.js');
var Folder = require('../lib/folder.js');
var assert = require('assert');

describe('FileTree', function() {
    describe('constructor', function() {
        describe('cwd', function() {
            var cwdFT
            it('Should execute W/O error', function() {
                cwdFT = new FileTree(process.cwd());
                assert(cwdFT != undefined, 'constructor returned undefined');
            })
            it('Should have a string variable of root', function() {
                assert(cwdFT.root != undefined, 'root is undefined');
                assert(typeof cwdFT.root == 'string', 'root is of type ' + typeof cwdFT.root);
            });
            it('Should have an object variable content', function() {
                assert(cwdFT.content != undefined, 'content is undefined');
                assert(typeof cwdFT.content == 'object', 'content is of type ' + typeof cwdFT.content);
            });
            it('The content variable should be a collection of files and folders', function() {
                for (var k in cwdFT.content) {
                    var variable = cwdFT.content[k];
                    assert(variable != undefined, k + ' is undefined');
                    assert(variable instanceof Folder ||
                            variable instanceof File, k + ' is not a folder or a file instance');
                }
            });
        });
    });
});