$.getJSON("/movies", function(data){
    console.log(data);

    for (i = 0; i < data.length; i++){
        $("#moviesList").append("<div class='movie' data-id='" + data[i]._id + "'>" + "<img src=" + data[i].moviePoster + ">" + "<p>" + "Movie Title: " + data[i].movieTitle + "</p>" + "<br>" + "<p>" + "Movie Release: " + data[i].movieRelease + "</p>" + "<br>" + "<p>" + "Movie Rating: " + data[i].movieRating + "</p>" + "<br>" + "</div>");
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
        $("#notes").append("<input id='titleInput' name='title'>");
        $("#notes").append("<textarea id='bodyInput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='saveNote'>Save Note</button>");
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