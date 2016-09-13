var File = require('../lib/file.js');
var assert = require('assert');

describe('File', function() {
    describe('cwd', function() {
        var f = new File(process.cwd());
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
        it('Should have a isDir variable as a boolean', function() {
            assert(f.isDir != undefined);
            assert(typeof f.isDir == 'boolean');
        })
        it('Should be a directory', function() {
            assert(f.isDir == true);
        });
        it('The getContent() callback should have and error and no data', function() {
            f.getContent(function(err, data) {
                assert(err != undefined);
                assert(data == undefined);
            });
        });
    });
    describe('test.txt', function() {
        var f = new File(process.cwd() + '\\test\\test.txt');
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
        it('Should have a isDir variable as a boolean', function() {
            assert(f.isDir != undefined);
            assert(typeof f.isDir == 'boolean');
        })
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
            var f2 = new File(process.cwd() + '\\test\\test.txt');
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
    });
});