$( ".feature1" )
 .on("mouseenter", function() {
  $(".button1").show();
})
.on("mouseleave", function() {
  $(".button1").hide();
});

$( ".feature2" )
 .on("mouseenter", function() {
  $(".button2").show();
})
.on("mouseleave", function() {
  $(".button2").hide();
});

$( ".feature3" )
 .on("mouseenter", function() {
  $(".button3").show();
})
.on("mouseleave", function() {
  $(".button3").hide();
});


$(document).ready(function(){
  $("#myModal").modal('show');
});

$(".subscribe-form").submit(function() {
  $("#myModal").modal('hide');
});
