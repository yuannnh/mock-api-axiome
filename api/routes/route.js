module.exports = function(app) {
  var documentController = require('../controllers/documentController');
  var rankingController = require('../controllers/rankingController');
  app.route('/documents')
    .get(documentController.list_docs)
    .post(documentController.create_a_doc)

  app.route('/document/:id')
    .get(documentController.read_doc_by_id)
    .delete(documentController.del_doc_by_id);

  app.route('/rankings')
    .get(rankingController.list_rankings)
    .post(rankingController.create_a_ranking)

  app.route('/ranking/:id')
    .delete(rankingController.del_ranking_by_id);


};

