var baseURL;

if (location.href.match('localhost')) {
  baseURL = location.protocol + '//localhost:8006';
}
else {
  if (location.href.match('www')) {
    baseURL = location.protocol + '//www.hys-inc.jp';
  } else {
    baseURL = location.protocol + '//hys-inc.jp';
  }
}

var setupNavi = function() {

  var $head = $('#head');
  var $gnav = $head.find('.gnav');

  var init = function() {
    addGnavHandler();
  }

  var addGnavHandler = function() {
    $gnav.find('a').on('click', function() {
      return gnavClick($(this));
    });
  }

  var removeGnavHandler = function() {
    $gnav.find('a').off('click');
  }

  var gnavClick = function($t) {
    changeContainer($t.attr('href'));
    return false;
  }

  init();

}

var setupPjaxBtn = function($cont) {

  if (!$cont) {
    $cont = $(document);
  }

  debug( 'setupPjaxBtn ' );
  debug( $cont );

  if ($.support.pjax) {
    $cont.find('a[data-pjax]').off('click');
    $cont.find('a[data-pjax]').on('click', function() {
      changeContainer($(this).attr('href'));
      return false;
    });
  }
}

var changeContainer = function(href) {

  debug( 'changeContainer ' + href  );

  var $cont = $('#contents');

  /*
  if( !$('#head').hasClass('on') ){
    $('#head').addClass('on').slideDown(400, 'easeInOutCubic', function(){});
  }
  */

  $cont.animate({
    opacity: '0'
  }, 300, 'linear', function() {
    $.pjax({
      url: href,
      container: '#contents',
      fragment: '#contents',
      timeout: 2000
    });
  });
}

var pageShowEvent = function(href) {
  debug('pageShowEvent ' + href);

  var $menu = $('#menu');
  var $head = $('#head');
  var $gnav = $head.find('.gnav');
  var $contents = $('#contents');

  // current reset
  $gnav.find('li > a').removeClass('on');


  if (href == '/' || href == '' || href == '/index.html' || href == 'index.html') {
    $head.addClass('top');
    $head.removeClass('second');
    $contents.addClass('top');
    $contents.removeClass('second');
  }
  else {
    $head.removeClass('top');
    $head.addClass('second');
    $contents.removeClass('top');
    $contents.addClass('second');

    // check gnav current
    if( href.match('work') || href.match('work_detail') ){
      $gnav.find('li:eq(0) > a').addClass('on');
    }
    else if( href.match('project') || href.match('project_detail') ){
      $gnav.find('li:eq(1) > a').addClass('on');
    }
    else if( href.match('about') ){
      $gnav.find('li:eq(2) > a').addClass('on');
    }
    else if( href.match('access') ){
      $gnav.find('li:eq(3) > a').addClass('on');
    }
    else if( href.match('contact') ){
      $gnav.find('li:eq(4) > a').addClass('on');
    }
  }
}

$(document).on('pjax:complete', function(e) {
  var $cont = $('#contents');

  var href = location.href.replace(baseURL, '');
  pageShowEvent(href);

  $cont.animate({
    opacity: '1'
  }, 300, 'linear', function() {
    setupPjaxBtn($('#contents').children());
  });

});
