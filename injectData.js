var mongoose = require('mongoose'),
  Document = require('./api/models/documentModel'),
  data = require('./data/data.js');
mongoose.connect('mongodb://localhost:27017/ApiAxiomeDB');
/*
console.log(data);
for(let i = 0; i < data.length; i++){
  var new_doc = new Document(data[i]);
  new_doc.save(function(err,doc){
    if(err)
      console.log(err);
    console.log(`Injected:_id = ${doc._id} `);
  });

}
*/

