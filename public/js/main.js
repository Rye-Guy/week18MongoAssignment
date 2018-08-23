$.getJSON("/movies", function(data){
    console.log(data);
    if(data.length == 0){
        $("#moviesList").append("<h2>There are no movies saved to the database. Please feel free to press the scrape movies button</h2>");
    }else{
    for (i = 0; i < data.length; i++){
        $("#moviesList").append("<div class='movie card col s12' data-id='" + data[i]._id + "'>" + "<div class='card-image'><img src=" + data[i].moviePoster + "></div>" + "<span class='card-title'>" + data[i].movieTitle + "</span>" + "<div class='card-content'>" + "<p>" + "Movie Release: " + data[i].movieRelease + "</p>" + "<br>" + "<p>" + "Movie Rating: " + data[i].movieRating + "</p>" + "</div>" + "<button data-target='modal1' class='btn modal-trigger'>" + "Comment" + "</button>" + "</div>");
        }
    }
});

$.getJSON("/notes", function(data){
    console.log(data);
    if(data.length == 0){
        $("#notesList").append("<h2>There are no quotes saved to the database :(</h2>");
    }else{
    for(i = 0; i < data.length; i++){
        $("#notesList").append("<div class='card teal darken-2' data-id='" + data[i]._id + "'>" +  "<div class='card-content white-text'>"+ "<a id_><img class='close-btn' src='images/close-circular-button-of-a-cross.svg' style='cursor: pointer;' id='note' data-id='" + data[i]._id + "'></a>" + "<span class='card-title'>" + data[i].title + "</span>" + "<p>" + data[i].body + "</p>" + "</div>" + "</div>");
    }
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
        $("#notes").append(" <div class='input-field col s6'>" +"<input id='titleInput' type='text' name='title'>" + "<label for='titleInput'></label>" + "</div>");
        $("#notes").append("<div class='input-field col s12'>" + "<textarea id='bodyInput' class='materialize-textarea active' name='body'></textarea>" + "<label>Whats the Quote?</label>" + "</div>");
        $("#notes").append("<button data-id='" + data._id + "' id='saveNote' class='btn modal-close'>Save Note</button>");
        $("#titleInput").val(data.movieTitle);
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

$(document).on("click", "#note", function(){
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "DELETE",
        url: "/notes/" + thisId
    }).done(console.log("Deleted " + thisId), location.reload());
});


$(document).ready(function(){
    $('.modal').modal();
  });