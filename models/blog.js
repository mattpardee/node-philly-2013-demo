/**
 * Blog model
 */

module.exports = function(options) {
  options = options || {};
  var mongoose = options.mongoose || require('mongoose')
  , Schema = mongoose.Schema;

  var BlogSchema = new Schema({
    title:{type:String, index: true},
    body:{type:String},
    author:{type:String, index: true},
    date:{type:Date, default: new Date()},
    tags:{type:[String], index: true}
  });

  function setDate(next) {
    var now = Date.now();
    if (this.isNew) {
        this.date = now;
    }
    next();
  }

  BlogSchema.pre('save', setDate); 

  var Blog = mongoose.model("blogs", BlogSchema);

  module.exports = Blog;

  module.exports.createBlogPost = function(title, body, author, date, tags ) {
    Blog.create({title: title, body: body, author: author, date: date, tags:tags}, function(err, blog) {
        if(err) { 
            console.log(err);
        } else {
            console.log(blog);
        } 
    });
  }
}