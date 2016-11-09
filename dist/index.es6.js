import express from 'express';
import cors from 'cors';

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
//# sourceMappingURL=index.es6.js.map
