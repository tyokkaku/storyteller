'use strict';

$(function(){

  let classNumber = 1;
  let len = $('.episodeTable tbody').children().length;
  console.log(len);

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
    if(classNumber===1){
      return;
    } else {
      classNumber--;
    }
  };
  function resetCount(){
    classNumber = 1;
  };

  // ajaxFunc

  $(`.number${classNumber}`).addClass('hogera');
  $(`.number${classNumber}`).animateCss('fadeIn');

      for (let i=3; i<20; i++){
        $(`.number${i}`).animateCss('fadeIn');
      }    



  $('html').keyup(function(e) {
    if(e.keyCode === 39){
      $(`.number${classNumber}`).removeClass('hogera');
      $.ajax({
        url:'./view',
        type:'POST',
        data: {'goNext': true},
      })
      .done( (data) => {
        countUp();
        console.log(data);
        console.log(classNumber);
        $(`.number${classNumber}`).addClass('hogera');
        $(`.number${classNumber}`).animateCss('fadeIn');
      // $('.number1').text(data);
    });
    } else {
      return;
    }
  });


  $('html').keyup(function(e) {
    if(e.keyCode === 37){
      $(`.number${classNumber}`).removeClass('hogera');
      $('#currentEpisode').animateCss('fadeIn');
    $.ajax({
      url:'./view',
      type:'POST',
      data: {'goBack': true},
    })
    .done( (data) => {
      // countDown();
      console.log(data);
      console.log(classNumber);
      $(`.number${classNumber}`).animateCss('fadeIn');
      $(`.number${classNumber}`).addClass('hogera');
      // $('#currentEpisode').text(data);
    });
    } else {
      return;
    }
  });

  $('html').keyup(function(e) {
    if(e.keyCode === 13){
      $(`.number${classNumber}`).removeClass('hogera');
      $.ajax({
        url:'./view',
        type:'POST',
        data: {'backToTop': true},
      })
      .done( (data) => {
      resetCount();
      $(`.number${classNumber}`).animateCss('fadeIn');
      $(`.number${classNumber}`).addClass('hogera');
      $('#currentEpisode').text(data);
      
    });
    } else {
      return;
    }
  });
  });
