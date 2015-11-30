
window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

var App = App === undefined ? {} : App;

App = {

  lang: 'es',

  // LIST OF PORPOUSES
  purposesLists: {
    es: [
      { id:0, text:'Leer por placer' },
      { id:1, text:'Aprender un idioma' },
      { id:2, text:'Viajar más. Y más lejos.' },
      { id:3, text:'Leer por placer 2' },
      { id:4, text:'Aprender un idioma 2' },
      { id:5, text:'Viajar más. Y más lejos. 2' }
    ],
    ca: [
      { id:0, text:'Llegir per plaer' },
      { id:1, text:'Apendre un idioma' },
      { id:2, text:'Viatjar més i més lluny' },
      { id:3, text:'Llegir per plaer2' },
      { id:4, text:'Apendre un idioma2' },
      { id:5, text:'Viatjar més i més lluny2' }
    ]
  },
  // LIST OF ACCEPTED PURPOUSES
  purposesAccepted: [],

  // BUSINESS APP CONTROLLER
  controller: {
    setPurpose: function(){
      $('.action-button').removeClass('active').addClass('blocked');
      var items = App.purposesLists.es;
      if(items.length >= 1){
        var idx = Math.floor(Math.random()*items.length),
          item = items[idx],
          img = $('<img class="purpose-item" id="purpose_'+item.id+'" data-index="'+idx+'">');
        img.attr('src', '/images/purposes/purpose_'+item.id+'.png');
        img.appendTo('#purpose-wrapper');
        img.one('load', function(){
          $(this).addClass('in');
          setTimeout(function(){
            $('.action-button').removeClass('blocked');
          },1000);
        });
      }else{
        $('.action-button').removeClass('active')
        // SHOW NO-MORE-PURPOSES MODAL
        console.log("No more purposes!");
      }
    },
    acceptPurpose: function(){
      $('#purpose-wrapper').addClass('active');
      var element = $('.purpose-item'),
        idx = element.data('index'),
        item = App.purposesLists.es[idx];

      App.controller.addPurposetoList(item);
      App.purposesLists.es.splice(idx,1);

      element.addClass('accept');
      setTimeout(function(){
        element.remove();
        if(App.purposesAccepted.length==5){
          $('.action-button').removeClass('active');
          // SHOW FINISH MODAL
          console.log("Finish?");
        }else{
          App.controller.setPurpose();
        }
        $('#purpose-wrapper').removeClass('active');
      },1000);
    },
    denyPurpose: function(){
      $('#purpose-wrapper').addClass('active');
      var element = $('.purpose-item'),
          idx = element.data('index');
      element.addClass('deny');
      setTimeout(function(){
        element.remove();
        App.purposesLists.es.splice(idx,1);
        App.controller.setPurpose();
        $('#purpose-wrapper').removeClass('active');
      },1000);
    },
    addPurposetoList: function(item){
      var idx = App.purposesAccepted.push(item),
        newItem = $('<div class="purpose" id="purpose_'+item.id+'"><span class="index">'+idx+'</span><span class="name">'+item.text+'</span><span class="remove"></span></div>');
      $('#topbar-badge').html(App.purposesAccepted.length)
      newItem.appendTo('#added-purposes');
    },
    removeAddedPurpose: function(){
      var item = $(this).parent(),
        idx = item.index('#added-purposes .purpose');
      App.purposesAccepted.splice(idx,1);
      item.addClass('removed');
      setTimeout(function(){
        $('#topbar-badge').html(App.purposesAccepted.length)
        item.addClass('erased');
        setTimeout(function(){
          item.remove();
        },125);
      },125);
    }
  },
  // USER INTERFACE CONTROLLER
  ui: {
    // Toggle Menu List
    toggleList: function(){
      $('#list').toggleClass('in');
    },
    hideList: function(){
      if($('#list').hasClass('in')){
        $('#list').removeClass('in');
      }
    },
    showList: function(){
      if($('#purposes').hasClass('in')){
        $('#list').addClass('in');
      }
    },
    // Hide Splash Screen
    hideHome: function(){
      $('#home').addClass('out');
      setTimeout(function(){
        $('#tutorial').addClass('in');
      },250);
    },
    hideTutorial: function(){
      $('#tutorial').removeClass('in');
      setTimeout(function(){
        $('#purposes').addClass('in');
        $('#topbar').addClass('in');
        setTimeout(function(){
          App.controller.setPurpose();
        },125);
      },125);
    },
    // Show next tutorial slide
    nextSlide: function(){
      var curSlide = $('.tutorial-slide .slide-item.active'),
        to = Number(curSlide.data('slide'))+1,
        toSlide = $('.tutorial-slide .slide-item#step-'+to);
      if(toSlide.size()) App.ui.setSlide(curSlide,toSlide);
    },
    // Show prev tutorial slide
    prevSlide: function(){
      var curSlide = $('.tutorial-slide .slide-item.active'),
        to = Number(curSlide.data('slide'))-1,
        toSlide = $('.tutorial-slide .slide-item#step-'+to);
      if(toSlide.size()) App.ui.setSlide(curSlide,toSlide);
    },
    // Navigate in tutorial slides
    navSlide: function(){
      var to = $(this).data('target'),
        curSlide = $('.tutorial-slide .slide-item.active'),
        toSlide = $('.tutorial-slide .slide-item#step-'+to);
      App.ui.setSlide(curSlide,toSlide);
    },
    // Show a slide
    setSlide: function(curSlide,toSlide){
      if(toSlide.data('slide') != curSlide.data('slide')){
        if(toSlide.data('slide') > curSlide.data('slide')) curSlide.removeClass('active').addClass('watched');
        else curSlide.removeClass('active').addClass('pending');
        toSlide.removeClass('watched').removeClass('pending').addClass('active');
        $('.tutorial-slide-nav .active').removeClass('active');
        $('.tutorial-slide-nav .nav-'+toSlide.data('slide')).addClass('active');
      }
    },
    events: function(){
      $('#app')
        // show/hide list
        .on('click', '.remove', App.controller.removeAddedPurpose)
        // show/hide list
        .on('click', '#list-button', App.ui.toggleList)
        // purpose action buttons 
        .on('click', '#accept:not(.active)', App.controller.acceptPurpose)
        .on('click', '#deny:not(.active)', App.controller.denyPurpose)
        // tutorial navigation
        .on('click', '#tutorial-next', App.ui.nextSlide)
        .on('click', '#tutorial-prev', App.ui.prevSlide)
        .on('click', '.tutorial-slide-nav li', App.ui.navSlide)
        .on('click', '#tutorial-button', App.ui.hideTutorial)
        // generic button hover
        .on('click', '.button', function(){$(this).addClass('active')})
        // hide home screen
        .one('click', '#start.ready', App.ui.hideHome);

      $('.mobile #tutorial').swipe( {
        swipeLeft:function() {
          App.ui.nextSlide();
        },
        swipeRight:function() {
          App.ui.prevSlide();
        }
      });
      $('.mobile #purpose-wrapper').swipe( {
        swipeLeft:function() {
          App.controller.denyPurpose();
        },
        swipeRight:function() {
          App.controller.acceptPurpose();
        }
      });
      /*$('.mobile #app').swipe( {
        swipeUp:function() {
          App.ui.hideList();
        },
        swipeDown:function() {
          App.ui.showList();
        }
      });*/
    }

  },
  // ROUTER CONTROLLER
  routes: {
    // TO DO
  },

  init: function () {
    if(window.mobilecheck()) $('body').addClass('mobile'); else $('body').addClass('desktop');
    setTimeout(function(){
      $('#app').addClass('loaded');
      setTimeout(function(){
        $('#start').addClass('ready');
      },1000);
    },500);

    App.ui.events();
  }
}

$(document).on('ready', function(){
  $(window).on('load', function(){
    App.init();
  });
});