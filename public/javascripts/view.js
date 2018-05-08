'use strict';

$(function(){

  let classNumber = 0;
  let len = $('.episodeTable tbody').children().length;
  console.log(`初期値です： ${classNumber}`);

  // animate.css config

  $.fn.extend({
    animateCss: function(animationName, callback) {
      var animationEnd = (function(el) {
        var animations = {
          animation: 'animationend',
          OAnimation: 'oAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          WebkitAnimation: 'webkitAnimationEnd',
        };
        for (var t in animations) {
          if (el.style[t] !== undefined) {
            return animations[t];
          }
        }
      })(document.createElement('div'));
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        // $(this).removeClass('animated ' + animationName);
        // if (typeof callback === 'function') callback();
      });
      return this;
    },
  });

  // javascript

   $('.episodeTable td').each(function(i){
       $(this).attr('class','number' + (i+1));
   });

  // countClassNumberFunc

  function countUp(){
    if(classNumber >= len) {
      return;
    } else {
      classNumber++;
    }
  };
  function countDown(){
    if(classNumber===0){
      return;
    } else {
      classNumber--;
    }
  };

  // keyupFunc

  for (let i=1; i<=len; i++){
    $(`.number${i}`).animateCss('fadeIn');
    if(classNumber <= len){
      classNumber++;
      console.log(`lenまで増加しました： ${classNumber}`); 
    }
  };

  $('html').keyup(function(e) {
    if(e.keyCode === 39){
        countUp();
        console.log(`++しました： ${classNumber}`);
        $(`.number${classNumber}`).animateCss('fadeIn');
    } else {
      return;
    }
  });

  $('html').keyup(function(e) {
    if(e.keyCode === 37){
      $('#currentEpisode').animateCss('fadeIn');
      $(`.number${classNumber}`).removeClass('animated fadeIn');
      countDown();
      console.log(`--しました： ${classNumber}`);
    } else {
      return;
    }
  });

  $('html').keyup(function(e) {
    if(e.keyCode === 13){
      for (let i=0; i<=len; i++){
        $(`.number${i}`).animateCss('fadeIn');
        countUp();
      }
      console.log(`Enterしました： ${classNumber}`);
    } else {
      return;
    }
  });

  $('html').keyup(function(e) {
    if(e.keyCode === 8){
      for (let i=1; i<=len; i++){
        $(`.number${i}`).removeClass('animated fadeIn');
          countDown();
      }
      console.log(`BackSpaceしました： ${classNumber}`);
    } else {
      return;
    }
  });


});
