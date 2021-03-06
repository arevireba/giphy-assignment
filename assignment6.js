  var tags = ["Depeche Mode", "Erasure", "Duran Duran", "Devo", "Oingo Boingo", "The Human League", "INXS", "Kajagoogoo", "The Go Gos", "The Cure", "The Bangles", "U2", "Men Without Hats", "Eurythmics"];

function renderButtons() {

  $("#tags").empty();

  for (var i = 0; i < tags.length; i++) {
    $("#tags").append('<button class="tag-buttons btn btn-primary">' + tags[i] + '</button>');
  }      
} 

$(document).on('click', '#addTag', function(event) {

event.preventDefault();

var newTag = $("#category").val().trim();
tags.push(newTag);

$("#tags").append('<button class="tag-buttons btn btn-primary">' + newTag + '</button>');
});

$(document).on('click', '.tag-buttons', function(event) {

event.preventDefault();

var type = this.innerText;
console.log(this.innerText);
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + window.encodeURI(type) + "&limit=10&api_key=dc6zaTOxFJmzC";

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
  for (var i = 0; i < response.data.length; i++) {

    $("#photo").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');

    var rating = $("<h2>").text("Rating: " + response.data[i].rating);
    
    $("#rating").append(rating);

    console.log(response)
  }  
});

$("#photo").empty();

});
renderButtons();


$('body').on('click', '.gif', function() {
var src = $(this).attr("src");
if($(this).hasClass('playing')){
   //stop
   $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
   $(this).removeClass('playing');
} else {
  //play
  $(this).addClass('playing');
  $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
}
});