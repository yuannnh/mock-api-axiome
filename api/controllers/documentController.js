var mongoose = require('mongoose'),
  Document = mongoose.model('Document');


exports.list_docs = function(req, res) {
  console.log(req.query)
  if (req.query.keywords){
    find_doc_by_keywords(req, res);
  } else {
    find_doc_by_attr(req,res);
  }

};


exports.list_all_docs = function(req, res) {
  Document.find({}, function(err, docs) {
    if (err)
      res.send(err);
    res.json(docs);
  });
};




exports.create_a_doc = function(req, res) {
  var new_doc = new Document(req.body);
  new_doc.save(function(err, doc) {
    if (err)
      res.send(err);
    res.json(doc);
  });
};


exports.read_doc_by_id = function(req, res) {
  Document.findById(req.params.id, function(err, doc) {
    if (err)
      res.send(err);
    res.json(doc);
  });
};


exports.del_doc_by_id = function(req, res) {
  console.log(req.params.id);
  Document.remove({_id:req.params.id}, function(err, doc) {
    if (err)
      res.send(err);
    res.json({message:'document successfully removed'});
  });
};


find_doc_by_keywords = function(req, res) {
  var keywords = req.params 
  Document.find({keywords:{$all:keywords}}, function(err, doc) {
    if (err)
      res.send(err);
    res.json(doc);
  });
};


find_doc_by_attr = function(req, res) {
  Document.find(req.query, function(err, doc) {
    if (err)
      res.send(err);
    res.json(doc);
  });
};

