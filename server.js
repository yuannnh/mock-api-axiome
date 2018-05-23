var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Document = require('./api/models/documentModel'),
  Ranking = require('./api/models/rankingModel'), //created model loading here
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://mongo:27017/ApiAxiomeDB');
mongoose.connect('mongodb://127.0.0.1:27017/ApiAxiomeDB');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/route');
routes(app);
app.get('/',(req,res)=>{
  res.send('hello api axiome!')
});
app.listen(port);

console.log('Axiome RESTful API server started on: ' + port);

