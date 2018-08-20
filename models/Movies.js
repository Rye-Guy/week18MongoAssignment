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
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Movie = mongoose.model("Movie", MovieSchema);


module.exports = Movie; 

