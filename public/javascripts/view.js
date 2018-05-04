'use strict';

$(function(){

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
        $(this).removeClass('animated ' + animationName);
        if (typeof callback === 'function') callback();
      });
      return this;
    },
  });

  // ajaxFunc

  $('html').keyup(function(e) {
    if(e.keyCode === 39){
      $('#hogehoge').animateCss('fadeIn');
    $.ajax({
      url:'./view',
      type:'POST',
      data: {'goNext': true},
    })
    .done( (data) => {
      $('#hogehoge').text(data);
    });
    } else {
      return;
    }
  });
  $('html').keyup(function(e) {
    if(e.keyCode === 37){
      $('#hogehoge').animateCss('fadeIn');
    $.ajax({
      url:'./view',
      type:'POST',
      data: {'goBack': true},
    })
    .done( (data) => {
      $('#hogehoge').text(data);
    });
    } else {
      return;
    }
  });

  $('html').keyup(function(e) {
    if(e.keyCode === 13){
      $('#hogehoge').animateCss('fadeIn');
    $.ajax({
      url:'./view',
      type:'POST',
      data: {'backToTop': true},
    })
    .done( (data) => {
      $('#hogehoge').text(data);
    });
    } else {
      return;
    }
  });
  });
