var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RankingSchema = new Schema({
    rankingId:{
        type:String,
        required:'rankingId is required'
    },
    rankingValue:{
        type:String,
        required:'rankingValue is required'
    }
});

module.exports = mongoose.model('Ranking', RankingSchema);

