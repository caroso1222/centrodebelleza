$( document ).ready(function() {

  $(".my-loader").css("display","none");

  var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       false,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  }
  );
  wow.init();




  var slider = $('.banner').unslider({
    infinite:true,
    arrows: {
  //  Unslider default behaviour
  prev: '<a class="unslider-arrow prev fa fa-angle-left"></a>',
  next: '<a class="unslider-arrow next fa fa-angle-right"></a>'
}
});

  setTimeout(function(){
   $('.bxslider').bxSlider({
    video: true,
    width: 400
  });

   $('.bxslider-2').bxSlider({
    minSlides: 1,
    maxSlides: 4,
    slideWidth: 170,
    moveSlides: 1,
  slideMargin: 10,
  pager: false

  });

 }
 
 ,100);

  $().prettyEmbed({ 
    useFitVids: true,
    previewSize: 'hd',
    loop: false,
    showRelated: false 
  });


  contact_form_validate();

});

$("a[href^='http://']").attr("target","_blank");
$("a[href^='https://']").attr("target","_blank");

$("#know-more-btn").click(function(event){
  goToID("know-more",event);
});

$("#images-btn").click(function(event){
  goToID("images",event);
});


$(".hero-message span").click(function(event){
  goToID("description",event);
});

/* 
 * ----------------------------------------------------------
 * FUBCTIONS - Contact Validate
 * ----------------------------------------------------------
 */
 function contact_form_validate(t) {
  var e = void 0 !== t && t.length > 0 ? t : $("#contact-valid-form");
  e.each(function() {
    var t = $(this);
    t.find(".field-validation").each(function() {
      $(this).change(function() {
        if ($(this).siblings(".alert").remove().fadeOut("slow", function() {
          $(this).remove();
        }), "" !== $(this).val().trim()
          ) {
          var e = contact_field_validation(t, $(this));
          if (e.length > 0 && void 0 !== e[0].message && "" !== e[0].message && "success" !== e[0].message) {
            var i = '<div class="alert"><i class="fa fa-exclamation-triangle"></i> ' + e[0].message + "</div>";
            $(this).after(i), $(this).siblings(".alert").fadeIn("slow");
          }
        }
      })
    }), t.submit(function(e) {
      e.preventDefault(), $(this).find(".form-loader").fadeIn("slow");

      var i = $(this).attr("action");
      if (void 0 == i && "" == i)
        return !1;
      $(this).find(".alert").remove().fadeOut("fast", function() {
        $(this).remove();
      }), $(this).find(".alert-validate-form").fadeOut("fast", function() {
        $(this).empty();
      });
      var a = !1;
      return $(this).find(".field-validation").each(function() {
        var e = contact_field_validation(t, $(this));
        if (e.length > 0 && void 0 !== e[0].message && "" != e[0].message && "success" != e[0].message) {
          var i = '<div class="alert"><i class="fa fa-exclamation-triangle"></i> ' + e[0].message + "</div>";
          $(this).after(i), $(this).siblings(".alert").fadeIn(), a =! 0;

        }
      }), 1 == a ? ($(this).find(".form-loader").fadeOut("fast"), !1) : ($.ajax({
        type: "POST",
        url: i,
        data: $(this).serialize(),
        dataType: "json",
        success: function(e) {
          t.find(".form-loader").fadeOut("fast");
          var i = "1" == e.status ? !0 : !1, a = '<div class="alert ';
          a += 1 == i ? "success" : "error", a += '"><i class="fa fa-check-circle"></i> ' + e.text + '</div>', t.find(".alert-validate-form").html(a).fadeIn("fast", function() {
            $(this).delay(1e4).fadeOut("fast", function() {
                           // $(this).remove();
                         });
          }), 1 == i && t.find(".form-control").val("");
        },
        error: function() {
          t.find(".form-loader").fadeOut("fast");
          var e = '<div class="alert"><i class="fa fa-exclamation-triangle"></i> An error occured. Please try again later.</div>';
          t.find(".alert-validate-form").html(e).fadeIn("fast");
        }
      }), void 0)
    })
})
}
function contact_field_validation(t, e) {
  if (void 0 !== t && t.length > 0) {
    var i = void 0 !== e && e.length > 0 ? e : t.find(".validate"), a = new Array;
    return i.each(function() {
      var t = $(this).attr("data-validation-type"), e = $(this).hasClass("required"), i = $(this).val().trim(), n = new Array;
      n.field_object = $(this), n.message = "success", 1 != e || "" != i && null !== i && void 0 !== i || (n.message = "Este campo es obligatorio"), "string" == t && "" != i && null !== i && void 0 !== i ? null == i.match(/^[a-z0-9 .\-]+$/i) && (n.message = "Caracteres inválidos encontrados.") : "email" == t && "" != i && null !== i && void 0 !== i ? null == i.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && (n.message = "Por favor ingrese un email válido.") : "phone" == t && "" != i && null !== i && void 0 !== i && null == i.match(/^\(?\+?[\d\(\-\s\)]+$/) && (n.message = "Caracteres inválidos encontrados."), a.push(n)
    }), a
  }
}

