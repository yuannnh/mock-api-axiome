module.exports = function(app) {
  var documentController = require('../controllers/documentController');
  app.route('/documents')
    .get(documentController.list_docs)
    .post(documentController.create_a_doc)

  app.route('/document/:id')
    .get(documentController.read_doc_by_id)
    .delete(documentController.del_doc_by_id);

};

