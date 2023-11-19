// ready
$(document).ready(function(){
	var init = function(){
		addSmoothScroll();
		imageLoaded();
    startAnimation();
    setupPjax();
    setupAudio();
	}
	init();
});

var addSmoothScroll = function(){
	$("a[href^='#']").click(function() {
		var href = this.hash;
		var $target = $(href == '#_top' ? 'body' : href);

		if($target.size()) {
			$.scrollTo( $target, 600, { easing: 'easeInOutExpo', offset: -100});
		}
		return false;
	});
}

var imageLoaded = function(){
	$("#wrap img").imgpreload({
		each: function(){
			//debug( "LOADED : " + this.src );
		},
		all: function(){
		}
	});
}

var startAnimation = function(){
  Background();
}

var setupPjax = function(){

    setupNavi();
    setupPjaxBtn();

    var href = location.href.replace(baseURL, '');
    pageShowEvent(href);
}

var setupAudio = function(){
  var audio = $('audio')[0];
  var $onBtn = $('.sound > a:eq(0)');
  var $offBtn = $('.sound > a:eq(1)');

  var init = function(){
    debug( audio );
    audio.volume = 0.5;
    if( cookieCheck() == 'true' ){
      playAudio();
    }
    else{
      stopAudio();
    }
    addBtnHandler();
  }

  var playAudio = function(){
    $onBtn.addClass('on');
    $offBtn.removeClass('on');
    audio.play();
    $.cookie('hys_autoplay', 'true', { expires: 365 });
  }

  var stopAudio = function(){
    $onBtn.removeClass('on');
    $offBtn.addClass('on');
    audio.pause();
    $.cookie('hys_autoplay', 'false', { expires: 365 });
  }

  var addBtnHandler = function(){
    $onBtn.on('click', function(){
      if( !$(this).hasClass('on') ) playAudio();
      return false;
    });

    $offBtn.on('click', function(){
      if( !$(this).hasClass('on') ) stopAudio();
      return false;
    });
  }

  var removeBtnHandler = function(){
    $onBtn.off('click');
    $offBtn.off('click');
  }

  // cookie
  var cookieCheck = function(){
    var c = $.cookie('hys_autoplay');
    debug( 'c = ' + c );

    if( c === undefined ){
      $.cookie('hys_autoplay', 'false', { expires: 365 });
    }
    return c;
  }

  init();
}


//********************** debug ****************************
// debug
var debug = function($obj) {
	if (window.console && window.console.log) {
		window.console.log($obj);
	}
}


//********************** param ****************************
// param
var getParams = function(){
	var obj = [];
	var params = location.href.split('?')[1];
	params = params.split('&');

	for( var i = 0; i < params.length; i++ ){
		obj[i] = [];
		var p = params[i].split('=');
		obj[i].key = p[0];
		obj[i].value = p[1];
	}

	return obj;
}

/**
 *  ブラウザ名を取得
 *
 *  @return     ブラウザ名(ie6、ie7、ie8、ie9、ie10、ie11、chrome、safari、opera、firefox、unknown)
 *
 */
var getBrowser = function(){
    var ua = window.navigator.userAgent.toLowerCase();
    var ver = window.navigator.appVersion.toLowerCase();
    var name = 'unknown';

    if (ua.indexOf("msie") != -1){
        if (ver.indexOf("msie 6.") != -1){
            name = 'ie6';
        }else if (ver.indexOf("msie 7.") != -1){
            name = 'ie7';
        }else if (ver.indexOf("msie 8.") != -1){
            name = 'ie8';
        }else if (ver.indexOf("msie 9.") != -1){
            name = 'ie9';
        }else if (ver.indexOf("msie 10.") != -1){
            name = 'ie10';
        }else{
            name = 'ie';
        }
    }else if(ua.indexOf('trident/7') != -1){
        name = 'ie11';
    }else if (ua.indexOf('chrome') != -1){
        name = 'chrome';
    }else if (ua.indexOf('safari') != -1){
        name = 'safari';
    }else if (ua.indexOf('opera') != -1){
        name = 'opera';
    }else if (ua.indexOf('firefox') != -1){
        name = 'firefox';
    }
    return name;
};

var isSmartDevice = function(){
	var ua = navigator.userAgent;
	var flag = false;

	if ( (ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 ) {
		flag = 'smartphone';
	}
	else if( ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0 ){
		flag = 'tablet';
	}
	return flag;
}


/**
 *  対応ブラウザかどうか判定
 *
 *  @param  browsers    対応ブラウザ名を配列で渡す(ie6、ie7、ie8、ie9、ie10、ie11、chrome、safari、opera、firefox)
 *  @return             サポートしてるかどうかをtrue/falseで返す
 *
 */
var isSupported = function(browsers){
    var thusBrowser = getBrowser();
    for(var i=0; i<browsers.length; i++){
        if(browsers[i] == thusBrowser){
            return true;
            exit;
        }
    }
    return false;
};


//********************** prototype ****************************
// set prototype.method to Function(object)
Function.prototype.method = function(name,func){
	if( !this.prototype[name]){
		this.prototype[name] = func;
		return this;
	}
};

//********************** AnimationFrame ****************************
//set requestAnimationFrame to window (with vendor prefixes)
(function (w, r){
    w['r'+r] = w['r'+r] || w['webkitR'+r] || w['mozR'+r] || w['msR'+r] || w['oR'+r] || function(c){ w.setTimeout(c, 1000 / 60); };
})(window, 'equestAnimationFrame');
