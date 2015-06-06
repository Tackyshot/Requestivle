var Lab = require('lab'),
    Code = require('code'),
    fs = require('fs'),
    Server = require('./server.js');

var testArray = fs.readDirSync('./tests');

testArray.forEach(function(file, index, array){

    var test = require(file);

    test.run();

});