var mongoose = require("mongoose");
 
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    poster: {
        type: String
    },
    title: {
        type: String

    },
    release:{
        type: String
    },
    rating:{
        type: String
    }
});

var Movie = mongoose.model("Movie", MovieSchema);


module.exports = Movie; 

