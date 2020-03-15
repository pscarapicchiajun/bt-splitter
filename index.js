var express = require('express');
var bp = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

var controller = require('./controller/controller.js');

app.set('json spaces', 2);

app.get('/', (req, res) =>
  res.render('home', {}));

app.listen(process.env.PORT, () => {
  console.log('Server init');
});

