$.getJSON("/movies", function(data){
    console.log(data);

    for (i = 0; i < data.length; i++){
        $("#moviesList").append("<div class='movie card col s12' data-id='" + data[i]._id + "'>" + "<div class='card-image'><img src=" + data[i].moviePoster + "></div>" + "<span class='card-title'>" + data[i].movieTitle + "</span>" + "<div class='card-content'>" + "<p>" + "Movie Release: " + data[i].movieRelease + "</p>" + "<br>" + "<p>" + "Movie Rating: " + data[i].movieRating + "</p>" + "</div>" + "<button data-target='modal1' class='btn modal-trigger'>" + "Comment" + "</button>" + "</div>");
    }
});

$(document).on("click", ".movie", function(){
    $("#notes").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/movies/" + thisId
    }).done(function(data){
        console.log(data);
        $("#notes").append("<h2>" + data.movieTitle + "</h2>");
        $("#notes").append(" <div class='input-field col s6'>" +"<input id='titleInput' type='text' name='title'>" + "<label for='titleInput'>Title</label>" + "</div>");
        $("#notes").append("<div class='input-field col s12'>" + "<textarea id='bodyInput' class='materialize-textarea active' name='body'></textarea>" + "<label>Whats the Quote?</label>" + "</div>");
        $("#notes").append("<button data-id='" + data._id + "' id='saveNote' class='btn modal-close'>Save Note</button>");
    if(data.note){
        $("#titleInput").val(data.note.title);
        $("#bodyInput").val(data.note.body);
    }
    });
});

$(document).on("click", "#saveNote", function(){ 
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/movies/" + thisId,
        data:{
            title: $("#titleInput").val(),

            body: $("#bodyInput").val()
        }
    }).done(function(data){
        console.log(data);
        $("#notes").empty();
    });

});


$(document).ready(function(){
    $('.modal').modal();
  });