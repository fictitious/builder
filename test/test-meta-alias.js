var Builder = require('../index');
var Systemjs = require('systemjs');

suite('Test for meta: { "x": { alias: "y" }}', function() {
    
  test('package-local alias esm', function(done) {
      
      var builder = new Builder();
      builder.config({
        map: {
          'package-local-alias': 'test/fixtures/package-local-alias'
        },
        packages: {
          'package-local-alias': {
            main: 'index-esm.js',
            format: 'esm',
            meta: {
              './local': {alias: './local/index-esm.js'}
            }
          }
        }
      });
      
      builder.bundle('package-local-alias').then(function(output) {
          
          builder.loader.normalize('package-local-alias').then(function(normalized) {
              
              var System = new Systemjs.constructor(); // remove this line to make it work (that is, in this case systemjs needs config at runtime too)
              var testCode = ' return System.import("'+ normalized +'").then(function(m) { return {q: m.q, fromLocal: m.fromLocal};});';        
              eval('(function() {'+output.source + testCode + '})()').then(function(result) {    
                  console.dir(result);
                  
              }).then(done, done);
          });
      });
      
  });
    
});