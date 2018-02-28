$(function(){
	var $wh = $(window).height();
	var $ww = $(window).width();
	$(".page_load_mask").width($ww).height($wh)
});
$(window).load(function() {

	// $("img").load(function(){
		  $(".page_load_mask").fadeOut("slow");
  		$("html").css({"overflow":"auto"});
	//});					   
 });


$(window).load(function() {
	$.toyJs.openModal();
	$.toyJs.dropdown();
  //页面载入效果
  $.toyJs.pageLoadCutover();

	// 滚动条
    $('.scroll-content>.inner').slimscroll({
            size: '4px',
            color: '#000',
            opacity: 1,
          //  position: isRTL ? 'left' : 'right',
            allowPageScroll: true,
            disableFadeOut: true,
            alwaysVisible: true,
            railVisible:true,
            borderRadius:0
      });
    //
$(".nav-justified li ul:last").css({"right":-25,"width":240});

if(!$.cookie('openMenu')){
 $.cookie("openMenu",true);

// 首页加载完成显示菜单
setTimeout(function(){
  $(".btn_menu_nav").hide();
  $("#pageNav").fadeIn("fast");
  $("#pageNav").find(".modal-dialog").css({"margin-top":-540}).animate({"margin-top":0},600);
},500);
setTimeout(function(){
    $(".btn_menu_nav").show();
    $("#pageNav").find(".modal-dialog").animate({"margin-top":-540},600);
    $("#pageNav").fadeOut("fast");
  },3000);
// end
}
 setFooterTop();
  
})
var prevTop=0;
$(window).scroll(function(){
  var _w = $(this);
  var scrollTop = _w.scrollTop();
 /* if(scrollTop>50){
    $(".body-shadow").fadeIn("slow");//addClass("body-shadow-show");
  }else{
    $(".body-shadow").fadeOut("slow");//removeClass("body-shadow-show");
  }
  */

  if(scrollTop>prevTop&&scrollTop>50){
    if(Math.abs(scrollTop-prevTop)>10){ 
       $("h1.logo").stop().animate({"top":-100},400);  
       $("a.btn_menu_nav").stop().animate({"top":-100},400); 
    }
  }else{
    if(Math.abs(scrollTop-prevTop)>10){
      $("h1.logo").stop().animate({"top":78},400);  
      $("a.btn_menu_nav").stop().animate({"top":70},400); 
    }

  }

  setTimeout(function(){prevTop=scrollTop;},0);
});
$(window).resize(function(){
  setFooterTop()
});
function setFooterTop(){
  var $f = $("#footer");
  var $wh = $(window).height();
  var $bh = $("body,html").height();
  var $ft = $wh>$bh?$wh-50:$bh+80;
  $f.wrapInner("<div class='container'></div>")
  $f.removeClass("container").css("top",$ft);
}



var browser = (function(){
  var userAgent = navigator.userAgent,
  ua = userAgent.toLowerCase(),
  browserList = {
    msie : /(?:msie\s|trident.*rv:)([\w.]+)/i,
    firefox : /Firefox\/([\w.]+)/i,
    chrome : /Chrome\/([\w.]+)/i,
    safari : /version\/([\w.]+).*Safari/i,
    opera : /(?:OPR\/|Opera.+version\/)([\w.]+)/i
  },
  kernels = {
    MSIE: /(compatible;\smsie\s|Trident\/)[\w.]+/i,
    Camino: /Camino/i,
    KHTML: /KHTML/i,
    Presto: /Presto\/[\w.]+/i,
    Gecko : /Gecko\/[\w.]+/i,
    WebKit: /AppleWebKit\/[\w.]+/i
  },
  browser = {
    kernel : 'unknow',
    version : 'unknow'
  }
  // 检测浏览器
  for(var i in browserList){
    var matchs = ua.match(browserList[i]);
    browser[i] = matchs ? true : false;
    if(matchs){
      browser.version = matchs[1];
    }
  }
  // 检测引擎
  for(var i in kernels){
    var matchs = ua.match(kernels[i]);
    if(matchs){
      browser.kernel = matchs[0];
    }
  }
  // 系统
  var os = ua.match(/(Windows\sNT\s|Mac\sOS\sX\s|Android\s|ipad.*\sos\s|iphone\sos\s)([\d._-]+)/i);
  browser.os = os!==null ? os[0] : false;
  // 是否移动端
  browser.mobile = ua.match(/Mobile/i)!==null ? true : false;
  return browser;
}());

$(function(){
	if(browser.mobile){
		window.location.href='http://m.villion.cn';
	}
});


