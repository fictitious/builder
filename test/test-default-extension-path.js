var Builder = require('../index');

suite('Test path to package with defaultExtension', function(err) {
  
    
  test('path to package with defaultJSExtensions: false, package.defaultExtension: js', function() {
      var builder = new Builder('test/fixtures/default-extension-path');
      builder.config({
          defaultJSExtensions: false,
          paths: {
            "test-app*": "lib*"
          },
          packages: {
            "test-app": {
              "main": "main.js",
              "format": "esm",
              "defaultExtension": "js"
            }
          }
      });
      
      return builder.bundle('test-app').then(function(out) {
          assert(out.entryPoints.length == 1 && out.entryPoints[0] == 'test-app/main.js');
      });
  });
    
  test('path to package with defaultJSExtensions: true, package.defaultExtension: false', function() {
      var builder = new Builder('test/fixtures/default-extension-path');
      builder.config({
          defaultJSExtensions: true,
          paths: {
            "test-app*": "libjs*"
          },
          packages: {
            "test-app": {
              "main": "main.js",
              "format": "esm",
              "defaultExtension": false
            }
          }
      });
      
      return builder.bundle('test-app').then(function(out) {
          assert(out.entryPoints.length == 1 && out.entryPoints[0] == 'test-app/main.js');
      });
  });
    
/*
  test('path to package with defaultJSExtensions: true, package.defaultExtension: false, .js extension in the dir name', function() {
      var builder = new Builder('test/fixtures/default-extension-path');
      builder.config({
          defaultJSExtensions: true,
          paths: {
            "test-app*": "lib.js*"
          },
          packages: {
            "test-app": {
              "main": "main.js",
              "format": "esm",
              "defaultExtension": false
            }
          }
      });
      
      return builder.bundle('test-app').then(function(out) {
          assert(out.entryPoints.length == 1 && out.entryPoints[0] == 'test-app/main.js');
      });
  });
*/
    
});
