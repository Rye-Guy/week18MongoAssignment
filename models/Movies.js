var mongoose = require("mongoose");
 
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    
    moviePoster: {
        type: String
    },
    movieTitle: {
        type: String

    },
    movieRelease:{
        type: String
    },
    movieRating:{
        type: String
    }
    // note: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Note"
    // }
},{
    // _id: ObjectIdSchema,
    versionKey: false

});

var Movie = mongoose.model("Movie", MovieSchema);


module.exports = Movie; 

