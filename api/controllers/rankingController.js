var mongoose = require('mongoose'),
  Ranking = mongoose.model('Ranking');

exports.list_rankings = function(req, res) {
  Ranking.find(req.query, function(err, doc) {
    if (err)
      res.send(err);
    res.json(doc);
  });

};

exports.create_a_ranking = function(req,res){
  var ifId = false,ifValue = false;
  Ranking.find({rankingId:req.body.rankingId},function(err,rk){
    if(err)
      res.send('err when verify the existence of rankingId to post'+ err);
    console.log(rk)
    if(rk[0])
      ifId = true;
      console.log(ifId)
  });
  Ranking.find({rankingValue:req.body.rankingValue},function(err,rk){
    if(err)
      res.send('err when verify the existence of rankingValue to post'+ err);
    if(rk[0])
      ifValue = true;
  });
  console.log(ifId)
  if(ifId || ifValue){
    var new_ranking = new Ranking(req.body);
    new_ranking.save(function(err, rk) {
      if (err)
        res.send(err);
      res.json(rk);
    });
  }else{
    res.send('rankingId or rankingValue exist already, please check your post data or delet the existing one!')
  }
};

exports.del_ranking_by_id = function(req,res){
  console.log(req.params);
  Ranking.remove({_id:req.params.id},function(err,rk){
    if(err)
      res.send(err);
    res.json({message:'ranking successfully removed!'});
  });
};
