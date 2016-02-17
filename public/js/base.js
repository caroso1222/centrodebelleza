
$("#open-nav").click(function(event){
  event.preventDefault();
  $(".nav").css({
    opacity:0,
    visibility:"visible"
  });
  $(".nav").animate({
    opacity:1
  },500,function(){

    $(".nav-wrapper a").css({
      transform:"translateY(-10px)",
      opacity: 1
    });

  });

});

$("#close-nav").click(function(event){
  event.preventDefault();
  $(".nav").animate({
    opacity:0
  },500,function(){
    $(this).css("visibility","hidden");
    $(".nav-wrapper a").css({
      transform:"translateY(10px)",
      opacity: 0
    });
  });

});

function goToID(id,event){
  event.preventDefault();
  $('html,body').animate({
    scrollTop: $("#"+id).offset().top
  },1500
  );
}