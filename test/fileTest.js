var File = require('../lib/file.js');
var assert = require('assert');

describe('File', function() {
    describe('test.txt', function() {
        var f = new File(process.cwd() + '/test/test.txt');
        it('Should not be undefined', function() {
            assert(f != undefined);
        });
        it('Should have a path variable as a string', function() {
            assert(f.path != undefined);
            assert(typeof f.path == 'string');
        });;
        it('Should have lastAccess variable as a date', function() {
            assert(f.lastAccess != undefined);
            assert(f.lastAccess instanceof Date);
        });
        it('Should have lastMod variable as a date', function() {
            assert(f.lastMod != undefined);
            assert(f.lastMod instanceof Date)
        });
        it('Should have a size variable as a number', function() {
            assert(f.size != undefined);
            assert(typeof f.size == 'number');
        });
        it('Should not be a directory', function() {
            assert(f.isDir != true);
        });
        it('The getContent() callback should have data and no error', function() {
            f.getContent(function(err, data) {
                assert(err == undefined);
                assert(data != undefined);
            });
        });
        describe('Should have variables go stale', function() {
            var f2 = new File(process.cwd() + '/test/test.txt');
            it('After reading f2 f should have a smaller lastAccess variable', function() {
                f2.getContent(function() {
                    assert(f.lastAccess < f2.lastAccess, 'f: ' + f.lastAccess + ' f2: ' + f2.lastAccess);
                });
            });
            it('After mod from f2, f should have a smaller lastMod variable', function() {
                //TODO: Add the ability to modify a file
                f2.appendLine('testValue', function() {
                    assert(f.lastMod < f2.lastMod, 'f: ' + f.lastMod + ' f2: ' + f2.lastMod);
                });
            });
            it('After renew, lastAccess should be greater than or equal to f2', function() {
                f.renew();
                assert(f.lastAccess >= f2.lastAccess, 'f: ' + f.lastAccess + ' f2: ' + f2.lastAccess);
            });
            it('after renew, last mod should be >= to f2', function() {
                assert(f.lastMod >= f2.lastMod, 'f: ' + f.lastMod + ' f2: ' + f2.lastMod);
            });
        });
        describe('Should be interactive', function() {
            var readData;
            it('getContents should carry a string in the callback', function() {
                f.getContent((err, data) => {
                    assert(err == undefined, 'getContents returned error ' + err);
                    assert(data != undefined);
                    readData = data;
                })
            });
            it('Should be delete-able', function() {
                f.delete((err, data) => {
                    assert(err == undefined, 'delete returned error ' + err);
                    assert(data != undefined, 'data was undefined on delete');
                    assert(data = readData, 'data returned from delete was not the same as from the read');
                })
            })
        });
    });
    describe('Directory', function() {
        if('Should fail to init', function() {
            try {
                var f = new File(process.cwd());
                assert(false, 'File was generated from a directory');
            } catch(e) {
                assert(true)
            }
        });
    });
});