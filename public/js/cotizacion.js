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


});

$("a[href^='http://']").attr("target","_blank");



angular.module("quote-app",[])
.constant("PROCEDURES",{
  "DEPILACION": "Depilación Láser",
  "MEDICINA": "Medicina Estética"
})
.constant("BODY_PARTS",{
  "ABDOMEN": "Abdomen",
  "BIKINI": "Bikini",
  "BRAZOS": "Brazos",
  "CUELLO": "Cuello",
  "ESCOTE": "Escote",
  "ESPALDA": "Espalda",
  "GLUTEOS": "Glúteos",
  "MANOS": "Manos",
  "MUSLOS": "Muslos",
  "PIERNAS": "Piernas",
  "ROSTRO": "Rostro",
})
.constant("ZONES",{
  "ARRUGAS": "Arrugas",
  "ARRUGAS_BOCA": "Arrugas - Boca",
  "ARRUGAS_FRENTE": "Arrugas - Frente",
  "BRILLO_PIEL": "Brillo de la piel",
  "CELULITIS": "Celulitis",
  "CICATRICES": "Cicatrices",
  "ESTRIAS": "Estrías",
  "FLACIDES": "Flacidéz",
  "HIPERPIGMENTACION": "Hiperpigmentación",
  "HIPOPIGMENTACION": "Hipopigmentación",
  "LINEAS_EXPRESION": "Líneas de expresión",
  "MANCHAS": "Manchas",
  "MEJORAR_TEXTURA": "Mejorar textura piel",
  "MELASMAS": "Melasmas",
  "OJERAS": "Ojeras",
  "PATAS_GALLO": "Patas de gallo",
  "POROS": "Poros",
  "POST_CIRUGIAS": "Post cirugías",
  "ANTIENVEJECIMIENTO": "Antienvejecimiento",
  "SECUELAS_ACNE": "Secuelas del acné",
  "BIGOTE": "Bigote",
  "BARBILLA": "Barbilla",
  "MEJILLAS": "Mejillas",
  "MEDIO": "Medio",
  "SENCILLO": "Sencillo",
  "COMPLETO": "Completo",
})
.constant("RECOMMENDATIONS",{
  "DEEP_3": "3 Deep - Endymed",
  "DERMATUDE": "Dermatude",
  "E_LASE": "E-Lase con motif",
  "IPL": "IPL - M22",
  "LASER_CO2": "Láser CO2",
  "BOTOX": "Botox",
  "ACIDO": "Ácido Hialurónico",
  "PLASMA": "Aplicación con plasma"
})
.constant("SESSIONS",{
  "SESIONES_3": "3",
  "SESIONES_8": "8",
  "SESIONES_1_2": "Entre 1 y 2",
  "SESIONES_6_8": "Entre 6 y 8",
  "DOS_VECES_ANHO": "2 veces al año",
  "SEGUN_PIEL": "Según tipo piel"
})
.constant("FREQUENCY",{
  "SEMANAS_4": "Cada 4 semanas",
  "SEMANAS_6": "Cada 6 semanas",
  "DESPUES_UNA_SEMANA": "Después de una semana de la primera sesión se realiza una cita de control y se evalua la necesidad de una segunda sesión.",
  "PRIMERAS_4": "Las primeras 4 una cada semana, las siguientes una cada 15 días.",
  "SE_RECOMIENDA": "Se recomienda una cada mes dependiendo la evolución."
})
.controller('QuoteController', function(PROCEDURES, BODY_PARTS, ZONES, RECOMMENDATIONS, SESSIONS, FREQUENCY){
  //Variable to activate the corresponding sections
  this.sections = [];
  this.sections.bodyParts = false;
  this.sections.zones = false;
  this.sections.recommendations = false;
  this.sections.footer = false; //hide footer, the footer is shown only in the last section

  //Variable that stores the buttons showing in each section
  this.bodyPartsActivated = [];
  this.zonesActivated = [];
  this.recommendationsActivated = [];

  this.currentProcedure = "";
  this.currentBodyPart = "";
  this.currentZone;
  this.PROCEDURES = PROCEDURES;

  this.num_recommendations = 0;

  this.activateBody = function activateBody($event,procedure){
    this.bodyPartsActivated = [""];
    this.sections.bodyParts = true;
    this.sections.footer = false; //hide footer, the footer is shown only in the last section

    //If the selected procedure is changed, the zones and recommendations sections must hide
    if(this.currentProcedure != procedure){
      this.sections.zones = false;
      this.sections.recommendations = false;
      $("#question-2 button").removeClass("button--aylen-active");
    }
    //Toggles classes to create active and inactive button
    var activatedButton = angular.element($event.target);
    $("#question-1 button").removeClass("button--aylen-active");
    activatedButton.addClass("button--aylen-active");
    this.currentProcedure = procedure;
    if (procedure == PROCEDURES.DEPILACION){
      this.bodyPartsActivated = [BODY_PARTS.BIKINI, BODY_PARTS.BRAZOS, BODY_PARTS.ESPALDA, BODY_PARTS.PIERNAS, BODY_PARTS.ROSTRO];
    }else{
      this.bodyPartsActivated = [BODY_PARTS.ABDOMEN, BODY_PARTS.BRAZOS, BODY_PARTS.CUELLO, BODY_PARTS.ESCOTE, BODY_PARTS.ESPALDA, 
      BODY_PARTS.GLUTEOS, BODY_PARTS.MANOS, BODY_PARTS.MUSLOS, BODY_PARTS.ROSTRO];
    }

  };

  this.activateZone = function activateZone($event,bodyPart){
    this.sections.zones = true;
    this.sections.footer = false; //hide footer, the footer is shown only in the last section
    //If the selected body part is changed, the recommendations sections must hide
    if(this.currentBodyPart != bodyPart){
      this.sections.recommendations = false;
      $("#question-3 button").removeClass("button--aylen-active");
    }

    this.currentBodyPart = bodyPart;
    //Toggles classes to create active and inactive button
    var activatedButton = angular.element($event.target);
    $("#question-2 button").removeClass("button--aylen-active");
    activatedButton.addClass("button--aylen-active");

    if (bodyPart == BODY_PARTS.ABDOMEN || bodyPart == BODY_PARTS.BRAZOS){
      if(this.currentProcedure == PROCEDURES.MEDICINA){
        this.zonesActivated = [ZONES.ARRUGAS, ZONES.CELULITIS, ZONES.CICATRICES, ZONES.ESTRIAS, ZONES.FLACIDES,
        ZONES.HIPERPIGMENTACION, ZONES.HIPOPIGMENTACION, ZONES.MANCHAS, ZONES.MEJORAR_TEXTURA, ZONES.MELASMAS, ZONES.ANTIENVEJECIMIENTO];
      }else{
        this.sections.zones = false;
        this.sections.recommendations = true;
        this.sections.footer = true;
        this.recommendationsActivated = [];
        var theRecomm = [];
        theRecomm = [RECOMMENDATIONS.E_LASE, SESSIONS.SESIONES_6_8, FREQUENCY.SEMANAS_6];
        this.recommendationsActivated.push(theRecomm); 
        this.num_recommendations = this.recommendationsActivated.length;

        setTimeout(
          function() 
          {
            goToID("recommendations",$event);
          }, 400);
      }

    }else if (bodyPart == BODY_PARTS.CUELLO){
      this.zonesActivated = [ZONES.ARRUGAS, ZONES.BRILLO_PIEL, ZONES.CELULITIS, ZONES.CICATRICES, ZONES.FLACIDES, 
      ZONES.MANCHAS, ZONES.MEJORAR_TEXTURA, ZONES.ANTIENVEJECIMIENTO, ZONES.SECUELAS_ACNE];

    }else if (bodyPart == BODY_PARTS.ESCOTE){  //Escote doesnt have midpoint with zones
      this.sections.zones = false;
      this.sections.recommendations = true;
      this.sections.footer = true;
      this.recommendationsActivated = [];
      var theRecomm = [];
      theRecomm = [RECOMMENDATIONS.DERMATUDE, SESSIONS.SESIONES_3, FREQUENCY.SE_RECOMIENDA];
      this.recommendationsActivated.push(theRecomm); 
      this.num_recommendations = this.recommendationsActivated.length;

      setTimeout(
        function() 
        {
          goToID("recommendations",$event);
        }, 400);

    }else if (bodyPart == BODY_PARTS.ESPALDA){
      this.sections.zones = false;
      this.sections.recommendations = true;
      this.sections.footer = true;
      this.recommendationsActivated = [];
      var theRecomm = [];
      theRecomm = [RECOMMENDATIONS.E_LASE, SESSIONS.SESIONES_6_8, FREQUENCY.SEMANAS_6];
      this.recommendationsActivated.push(theRecomm); 
      this.num_recommendations = this.recommendationsActivated.length;

      setTimeout(
        function() 
        {
          goToID("recommendations",$event);
        }, 400);

    }else if (bodyPart == BODY_PARTS.GLUTEOS){
      this.zonesActivated = [ZONES.ARRUGAS, ZONES.CELULITIS, ZONES.CICATRICES, ZONES.ESTRIAS, 
      ZONES.FLACIDES, ZONES.HIPERPIGMENTACION, ZONES.HIPOPIGMENTACION, ZONES.MANCHAS, ZONES.MEJORAR_TEXTURA, ZONES.MELASMAS, ZONES.ANTIENVEJECIMIENTO];

    }else if (bodyPart == BODY_PARTS.MANOS){
      this.zonesActivated = [ZONES.ARRUGAS, ZONES.CICATRICES, ZONES.ESTRIAS, 
      ZONES.HIPERPIGMENTACION, ZONES.HIPOPIGMENTACION, ZONES.MANCHAS, ZONES.MELASMAS];

    }else if (bodyPart == BODY_PARTS.MUSLOS){
      this.zonesActivated = [ZONES.ARRUGAS, ZONES.CELULITIS, ZONES.CICATRICES, ZONES.ESTRIAS, ZONES.HIPERPIGMENTACION, 
      ZONES.HIPOPIGMENTACION, ZONES.MANCHAS, ZONES.MEJORAR_TEXTURA, ZONES.MELASMAS, ZONES.FLACIDES, ZONES.ANTIENVEJECIMIENTO];

    }if (bodyPart == BODY_PARTS.ROSTRO){
      if (this.currentProcedure == PROCEDURES.MEDICINA){
        this.zonesActivated = [ZONES.ARRUGAS, ZONES.ARRUGAS_BOCA, ZONES.ARRUGAS_FRENTE, ZONES.BRILLO_PIEL, ZONES.CELULITIS, ZONES.CICATRICES, ZONES.ESTRIAS, 
        ZONES.FLACIDES, ZONES.HIPERPIGMENTACION, ZONES.HIPOPIGMENTACION, ZONES.MANCHAS, ZONES.MEJORAR_TEXTURA, ZONES.MELASMAS, ZONES.OJERAS,
        ZONES.PATAS_GALLO, ZONES.POROS, ZONES.POST_CIRUGIAS, ZONES.ANTIENVEJECIMIENTO, ZONES.SECUELAS_ACNE, ZONES.LINEAS_EXPRESION];
      }else{
        this.zonesActivated = [ZONES.BARBILLA, ZONES.BIGOTE, ZONES.MEJILLAS];
      }

    }else if (bodyPart == BODY_PARTS.BIKINI){
      if (this.currentProcedure == PROCEDURES.MEDICINA){
        this.zonesActivated = [ZONES.ARRUGAS, ZONES.CELULITIS, ZONES.CICATRICES, ZONES.ESTRIAS, ZONES.HIPERPIGMENTACION, 
        ZONES.HIPOPIGMENTACION, ZONES.MANCHAS, ZONES.MEJORAR_TEXTURA, ZONES.MELASMAS, ZONES.ANTIENVEJECIMIENTO];
      }else{
        this.zonesActivated = [ZONES.SENCILLO, ZONES.COMPLETO];
      }
    }else if(bodyPart == BODY_PARTS.PIERNAS){
      this.zonesActivated = [ZONES.MEDIO, ZONES.COMPLETO];
    }


  };

  this.activateRecomendation = function activateRecomendation($event,zone){
    this.currentZone = zone;
    this.sections.recommendations = true;
    this.sections.footer = true;
    this.recommendationsActivated = [];
    //Toggles classes to create active and inactive button
    var activatedButton = angular.element($event.target);
    $("#question-3 button").removeClass("button--aylen-active");
    activatedButton.addClass("button--aylen-active");


    //goToID("recommendations",$event)

    

    var theRecomm = [];
    if(zone == ZONES.BIGOTE || zone == ZONES.BARBILLA || zone == ZONES.MEJILLAS){
      theRecomm = [RECOMMENDATIONS.E_LASE,SESSIONS.SESIONES_6_8,FREQUENCY.SEMANAS_4];
      this.recommendationsActivated.push(theRecomm);
    }else if( zone == ZONES.COMPLETO || zone == ZONES.MEDIO || zone == ZONES.SENCILLO){
      theRecomm = [RECOMMENDATIONS.E_LASE, SESSIONS.SESIONES_6_8, FREQUENCY.SEMANAS_6];
      this.recommendationsActivated.push(theRecomm); 
    }else if (zone == ZONES.ANTIENVEJECIMIENTO || zone == ZONES.MEJORAR_TEXTURA || zone == ZONES.FLACIDES || zone == ZONES.CELULITIS){
      if(zone == ZONES.MEJORAR_TEXTURA && this.currentBodyPart == BODY_PARTS.ROSTRO){
        theRecomm = [RECOMMENDATIONS.ACIDO, SESSIONS.DOS_VECES_ANHO, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }

      if((zone == ZONES.FLACIDES || zone == ZONES.MEJORAR_TEXTURA) && this.currentBodyPart == BODY_PARTS.CUELLO){
        theRecomm = [RECOMMENDATIONS.BOTOX, SESSIONS.DOS_VECES_ANHO, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }
      theRecomm = [RECOMMENDATIONS.DEEP_3, SESSIONS.SESIONES_8, FREQUENCY.PRIMERAS_4];
      this.recommendationsActivated.push(theRecomm);
    }else if(zone == ZONES.POROS || zone == ZONES.PATAS_GALLO || zone == ZONES.OJERAS || zone == ZONES.LINEAS_EXPRESION 
      || zone == ZONES.BRILLO_PIEL || zone == ZONES.ARRUGAS_FRENTE || zone == ZONES.ARRUGAS_BOCA){
      theRecomm = [RECOMMENDATIONS.DERMATUDE, SESSIONS.SESIONES_3, FREQUENCY.SE_RECOMIENDA];
      this.recommendationsActivated.push(theRecomm);
      if((zone == ZONES.ARRUGAS_BOCA || ZONES.ARRUGAS_FRENTE || ZONES.LINEAS_EXPRESION || ZONES.PATAS_GALLO) && this.currentBodyPart == BODY_PARTS.ROSTRO){
        theRecomm = [RECOMMENDATIONS.ACIDO, SESSIONS.DOS_VECES_ANHO, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }
    }else if(zone == ZONES.CICATRICES){
      if(this.currentBodyPart == BODY_PARTS.ROSTRO || this.currentBodyPart == BODY_PARTS.CUELLO){
        theRecomm = [RECOMMENDATIONS.PLASMA, SESSIONS.SEGUN_PIEL, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }
      if(this.currentBodyPart == BODY_PARTS.ABDOMEN || this.currentBodyPart == BODY_PARTS.BRAZOS || this.currentBodyPart == BODY_PARTS.GLUTEOS 
        || this.currentBodyPart == BODY_PARTS.MANOS || this.currentBodyPart == BODY_PARTS.MUSLOS || this.currentBodyPart == BODY_PARTS.ROSTRO)
      {
        theRecomm = [RECOMMENDATIONS.IPL, SESSIONS.SESIONES_1_2, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }
      if(this.currentBodyPart == BODY_PARTS.ABDOMEN || this.currentBodyPart == BODY_PARTS.BRAZOS || this.currentBodyPart == BODY_PARTS.CUELLO || 
        this.currentBodyPart == BODY_PARTS.GLUTEOS || this.currentBodyPart == BODY_PARTS.MUSLOS || this.currentBodyPart == BODY_PARTS.ROSTRO)
      {
        theRecomm = [RECOMMENDATIONS.DEEP_3, SESSIONS.SESIONES_8, FREQUENCY.PRIMERAS_4];
        this.recommendationsActivated.push(theRecomm);
      }
      if(this.currentBodyPart == BODY_PARTS.CUELLO || this.currentBodyPart == BODY_PARTS.MANOS || this.currentBodyPart == BODY_PARTS.ROSTRO){
        theRecomm = [RECOMMENDATIONS.LASER_CO2, SESSIONS.SESIONES_1_2, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }
    }else if(zone == ZONES.HIPERPIGMENTACION || zone == ZONES.HIPOPIGMENTACION || zone == ZONES.ESTRIAS || zone == ZONES.MELASMAS){
      theRecomm = [RECOMMENDATIONS.IPL, SESSIONS.SESIONES_1_2, FREQUENCY.DESPUES_UNA_SEMANA];
      this.recommendationsActivated.push(theRecomm);
      if(zone == ZONES.HIPERPIGMENTACION){
        theRecomm = [RECOMMENDATIONS.PLASMA, SESSIONS.SEGUN_PIEL, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }
    }else if(zone == ZONES.POST_CIRUGIAS || zone == ZONES.SECUELAS_ACNE){
      theRecomm = [RECOMMENDATIONS.LASER_CO2, SESSIONS.SESIONES_1_2, FREQUENCY.DESPUES_UNA_SEMANA];
      this.recommendationsActivated.push(theRecomm);
    }else if(zone == ZONES.ARRUGAS){
      if(this.currentBodyPart == BODY_PARTS.ROSTRO || this.currentBodyPart == BODY_PARTS.CUELLO){
        theRecomm = [RECOMMENDATIONS.BOTOX, SESSIONS.DOS_VECES_ANHO, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }
      if(this.currentBodyPart == BODY_PARTS.ROSTRO){
        theRecomm = [RECOMMENDATIONS.ACIDO, SESSIONS.DOS_VECES_ANHO, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }
      if(this.currentBodyPart == BODY_PARTS.ROSTRO || this.currentBodyPart == BODY_PARTS.CUELLO || this.currentBodyPart == BODY_PARTS.MANOS){
        theRecomm = [RECOMMENDATIONS.LASER_CO2, SESSIONS.SESIONES_1_2, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }
      if(this.currentBodyPart == BODY_PARTS.ROSTRO || this.currentBodyPart == BODY_PARTS.CUELLO || this.currentBodyPart == BODY_PARTS.GLUTEOS || 
        this.currentBodyPart == BODY_PARTS.ABDOMEN || this.currentBodyPart == BODY_PARTS.BRAZOS || this.currentBodyPart == BODY_PARTS.MUSLOS)
      {
        theRecomm = [RECOMMENDATIONS.DEEP_3, SESSIONS.SESIONES_8, FREQUENCY.PRIMERAS_4];
        this.recommendationsActivated.push(theRecomm);
      }
      if(this.currentBodyPart == BODY_PARTS.ROSTRO || this.currentBodyPart == BODY_PARTS.CUELLO){
        theRecomm = [RECOMMENDATIONS.DERMATUDE, SESSIONS.SESIONES_3, FREQUENCY.SE_RECOMIENDA];
        this.recommendationsActivated.push(theRecomm);
      }
    }else if(zone == ZONES.MANCHAS){
      if(this.currentBodyPart == BODY_PARTS.ROSTRO || this.currentBodyPart == BODY_PARTS.CUELLO || this.currentBodyPart == BODY_PARTS.MANOS){
        theRecomm = [RECOMMENDATIONS.LASER_CO2, SESSIONS.SESIONES_1_2, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }
      if(this.currentBodyPart == BODY_PARTS.ROSTRO || this.currentBodyPart == BODY_PARTS.MANOS || this.currentBodyPart == BODY_PARTS.GLUTEOS || 
        this.currentBodyPart == BODY_PARTS.ABDOMEN || this.currentBodyPart == BODY_PARTS.BRAZOS || this.currentBodyPart == BODY_PARTS.MUSLOS)
      {
        theRecomm = [RECOMMENDATIONS.IPL, SESSIONS.SESIONES_1_2, FREQUENCY.DESPUES_UNA_SEMANA];
        this.recommendationsActivated.push(theRecomm);
      }
    }

    this.num_recommendations = this.recommendationsActivated.length;

    setTimeout(
      function() 
      {
        goToID("recommendations",$event);
      }, 400);
    
  }
});













