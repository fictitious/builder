var Builder = require('../index');

var builder = new Builder('test/fixtures/default-extension-in-scope');

suite('Test map to package with defaultExtension', function(err) {
  test('map to package with defaultExtension', function() {
      builder.config({
          defaultJSExtensions: true,
          map: {
            "test-app": "lib"
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
          assert(out.entryPoints.length == 1 && out.entryPoints[0] == 'lib/main.js');
      });
  });
});
