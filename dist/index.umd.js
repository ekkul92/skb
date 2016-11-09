(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('express'), require('cors')) :
  typeof define === 'function' && define.amd ? define(['express', 'cors'], factory) :
  (factory(global.express,global.cors));
}(this, (function (express,cors) { 'use strict';

express = 'default' in express ? express['default'] : express;
cors = 'default' in cors ? cors['default'] : cors;

var app = express();
app.use(cors());
app.get('/', function (req, res) {
  res.json({
    hello: 'JS World'
  });
});

app.get('/task2A', function (req, res) {
  var sum = (parseInt(req.query.a) || 0) + (parseInt(req.query.b) || 0);
  res.send(sum + '');
});

app.listen(3000, function () {
  console.log('Your app listening on port 3000!');
});

})));
//# sourceMappingURL=index.umd.js.map
