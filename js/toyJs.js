if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }

$.toyJs = {
	/*
	实例：
	<a data-toggle="modal" data-target="#targetId"><a>
	<div id="targetId"></div>
	*/
	openModal:function(a){
		$("[data-toggle='modal']").each(function(){
			var _t = $(this);
			var _o = $(_t.data("target"));
			window.currentModal = _o;
			_t.on("click",function(event){
				_t.hide();
				_o.fadeIn("fast");
				_o.find(".modal-dialog").css({"margin-top":-540}).animate({"margin-top":0},300);
				 event.stopPropagation();
			});
			_o.on("click",function(event){
				if($(event.target).attr("id")==_o.attr("id")){
				_o.find(".modal-dialog").animate({"margin-top":-540},"fast");	
				 window.currentModal.fadeOut("slow");
				 _t.show();
				}

			});

	});
	},dropdown:function(){
		$("[data-toggle='dropdown']").each(function(){
			var _t = $(this);
			var _o = $(_t.siblings(".dropdown-menu").get(0));
			var _p = _t.parent();
			var _s = _p.siblings();
			window.activeMenu = _o;
			_p.hover(function(){
				//_s.removeClass("active");
				_p.addClass("active");
				_s.find("ul").stop().hide();
				_o.stop().show();
			},function(){
				//_s.removeClass("active");
				_p.stop().removeClass("active");
				// _o.stop().hide();
			});
		});
	},scrollPage:function(){
		$(window).scroll(function(){
			var btop = document.documentElement.scrollTop || document.body.scrollTop;
			$("[data-toggle='scrollPage']>.item").each(function(){
				var _t = $(this);
				var _n = $(_t.parent().data("nav-target"));
				var _n_li = _n.find("li");
				//_t.find(".item").each(function(){
					//var _tt = $(this);
					//$("title").html(_t.offset().top-btop);
					if(_t.offset().top-btop<160){
						//alert("ok");
						_n_li.removeClass("active");
						$(_n_li.get(_t.index())).addClass("active");
					}
				//})
			});
		});
		$(".page-scrollnav").find("a").on("click",function(){
				var _tt = $(this);
				var _oo = $(_tt.attr("href"));
				//alert(_oo.offset().top);
				$("body").stop().animate({scrollTop:_oo.offset().top},"slow")
				return false;
			});
	},showObject:function(){
		$("[data-toggle='showObject']").on("click",function(){
			var _t = $(this);
			var _o = $(_t.data("target"));
			var _s = $("[data-toggle='showObject']");
			window.openTargetId = _o;
			_s.each(function(){
				var _so = $($(this).data("target"));
				_s.removeClass("active");
				_so.hide();			
				_t.addClass("active");
				_o.show();
			});
			
		});
		
	},closeObject:function(){
		window.openTargetId.fadeOut("fast");
		$("[data-toggle='showObject']").removeClass("active");
	},slideDownNext:function(){
		$("[data-toggle='slideDownNext']").each(function(e){
			var _t = $(this);
			var _o = _t.next();
			var _s = $("[data-toggle='slideDownNext']").next();
			var _p = $("[data-toggle='slideDownNext']").parent();
			_t.on("click",function(){
				_s.stop().slideUp("slow");
				_p.removeClass("active");
				_o.stop().slideDown("slow");
				_t.parent().addClass("active");
			});
		});
	},scrollWidget:function(){
		$("[data-toggle='scrollWidget']").each(function(e){
			 var _t = $(this);
			 _t.josnObj = eval("("+_t.data("control")+")");
			 _t._next 	= $(_t.josnObj.next);
			 _t._prev 	= $(_t.josnObj.prev);
			 _t._page = $(_t.josnObj.page);
			 _t._o		= $(_t.josnObj.target);
			 _t.effect = _t.josnObj.effect;
			 _t.autoplay = _t.josnObj.autoplay;
			 _t.mark = "left";
			 _t.i = 0;
			 // 处理事件
				_t._c = _t._o.children(".item");
			 	_t.clen = _t._c.length;
			 	_t.cw = _t.width();
			 	_t.ww = _t.cw*_t.clen;//总宽度
			 //包装项目
			 	_t._c.wrapAll("<div class='scroll-widget-wrap'></div>").css("float","left");
			 	_t._s= $(_t.find(".scroll-widget-wrap").get(0));
			 	


			 	_t.first_item = _t._o.find(".item:first").clone();
			 	_t.last_item = _t._o.find(".item:last").clone();
			 	//复制最后一幅插入前面
			 	_t.first_item.appendTo(_t._s).addClass("copy1");
			 	//复制第一张插入后面
			 	_t.last_item.prependTo(_t._s).addClass("copy2");

			 	_t.setWidth = function(){
			 	_t.aw = _t.cw*(_t.clen+2);
			 	_t._s.css("margin-left",-_t.cw);
			 	_t._s.width(_t.aw);
			 	_t.sleft = _t._s.css("margin-left");
			 	} 
			 	//_t.sleft = undefined||0;
			 	_t.setWidth();
			
			 	_t.animateFun = function(){
			 	_t.setPage();
			 	if(_t.mark=="left"){
			 		_t.m = Math.abs(_t.sleft)<=_t.ww?_t.sleft-_t.cw:0;
			 		_t.i = _t.i + 1>=_t.clen?0:_t.i + 1;
			 		
			 	}else{
			 		_t.m = Math.abs(_t.sleft)<=0?-_t.ww:_t.sleft+_t.cw;
			 		_t.i = _t.i - 1<=0?_t.clen:_t.i - 1;
			 	}
			 	//var m = _t.i * cw;
			 	_t.sleft = _t.m;
			 	_t._c.removeClass("active");
			 	$(_t._c[_t.i]).addClass("active");
			 	_t._s.animate({"margin-left":_t.m},"slow",function(){
			 		if(_t.mark=="left"&&Math.abs(_t.m)==_t.ww+_t.cw){
			 			_t._s.css("margin-left",-_t.cw);
			 			_t.sleft = -_t.cw;
			 		}
			 		if(_t.mark=="right" && _t.m==0){
			 			_t._s.css("margin-left",-_t.ww);
			 			_t.sleft = -_t.ww;
			 		}
			 	});
			 }
			 _t.autoplayFun = function(){
			 	_t.mark="left";
			 	_t.si = setInterval(_t.animateFun,3000);
			 };
			 _t.setPage = function(){
			 	var _pageItem = _t._page.find("li");
			 	_pageItem.removeClass("active");
			 	$(_pageItem[_t.i]).addClass("active");
			 };
			 _t._page.find("li").on("click",function(){
			 	var _p_t	= $(this);
			 	var ind 	= _p_t.index();
			 	_t.sleft = -(ind*_t.cw);
			 	_t.i = ind;
			 	_t.mark="left";
			 	_t.animateFun();
			 });
			 _t._prev.on("click",function(){
			 	_t.mark="left";
			 	_t.animateFun();
			 });
			 _t._next.on("click",function(){
			 	_t.mark="right";
			 	_t.animateFun();
			 });
			 // 自动播放
			 if(_t.autoplay){
			 	_t.autoplayFun();
			 	_t.hover(function(){clearInterval(_t.si)},function(){_t.autoplayFun()});
			 	_t._page.hover(function(){clearInterval(_t.si)},function(){_t.autoplayFun()});
			 }
			 
		});
	},sideInDom:function(){
		$("[data-toggle='sideInDom']").each(function(){
			var _t = $(this);
			var _o = $(_t.attr("data-target"));//操作对象
			var dir = _t.attr("data-direction");//bottom,up,left,right
			_t.on("click",function(){
				if(!_t.hasClass("open")){
					_t.addClass("open");
					_t.find("span").attr("class","glyphicon glyphicon-chevron-down");
					
					$.data(document.body,"dirNumber",_o.css(dir));
					_o.animate({"bottom":0},"fade");
				}else{
					_t.removeClass("open");
					_t.find("span").attr("class","glyphicon glyphicon-chevron-up");
					_o.animate({"bottom":$.data(document.body,"dirNumber")},"fade",function(){_o.attr("style","")});
				}
			});
		});
	},pageLoadCutover:function(){
		// $(".nav a").on("click",function(){
		// 	var _t = $(this);
		// 	var url = _t.attr("href");
		// 	$("#tempLoadPage").load(url,function(response,status,xhr){
		// 		//window.location.href = url;
		// 	});
		// 	return false;
		// });
	}
}