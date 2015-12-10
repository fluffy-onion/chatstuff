var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema ({
  url: String,
  nodes: Schema.Types.Mixed,
  email: String
});

module.exports = mongoose.model('Article', articleSchema);
