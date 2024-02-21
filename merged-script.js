(function($)
{ 
	"use strict";
	
	// -------------------------------------------------------------------------------------------
	// Avia Text Rotator
	// 
	// accordion slider script
	// -------------------------------------------------------------------------------------------

	$.AviaTextRotator  =  function(options, slider)
	{
	    this.$win	  	= $( window );
	    this.$slider  	= $( slider );
	    this.$inner	  	= this.$slider.find('.av-rotator-text');
	    this.$slides	= this.$inner.find('.av-rotator-text-single');
	    this.$current   = this.$slides.eq(0);
	    this.open		= 0;
	    this.count		= this.$slides.length;
	    
	    if($.avia_utilities.supported.transition === undefined)
		{
			$.avia_utilities.supported.transition = $.avia_utilities.supports('transition');
		}
		
		this.browserPrefix 	= $.avia_utilities.supported.transition;
	    this.cssActive 		= this.browserPrefix !== false ? true : false;
		this.property		= this.browserPrefix + 'transform',
		
		//this.cssActive    = false; //testing no css3 browser
		
	    this._init( options );
	}

  	$.AviaTextRotator.prototype =
    {
    	_init: function( options )
    	{
    		var _self = this;
    		
    		if(this.count <= 1) return;
    		
    		_self.options = $.extend({}, options, this.$slider.data());
			_self.$inner.addClass('av-rotation-active');
			//if(_self.options.fixwidth == 1) this.$inner.width(this.$current.width());
			_self._autoplay();
			
			if(_self.options.animation == "typewriter")
			{
				_self.$slider.addClass('av-caret av-blinking-caret');
			}
			
			
    	},
    	
    	_autoplay: function()
    	{
    		var _self = this;
    		
			_self.autoplay = setTimeout(function()
			{
				_self.open = _self.open === false ? 0 : _self.open + 1;
				if(_self.open >= _self.count) _self.open = 0;
				
				if(_self.options.animation != "typewriter")
				{
					_self._move({}, _self.open);
					_self._autoplay();
				}
				else
				{
					_self._typewriter();
				}
				
				
			}, _self.options.interval * 1000)
    	},
    	
    	_typewriter: function(event)
    	{
	    	var _self = this;
	    	
	    	//mark text
	    	_self.$current.css('background-color', _self.$current.css('color') );
	    	_self.$slider.removeClass('av-caret av-blinking-caret').addClass('av-marked-text');  
		    
		    
		    //store and hide text
		    setTimeout(function()
	    	{ 
		    	_self.$slider.addClass('av-caret av-blinking-caret').removeClass('av-marked-text');  
		    	_self.$current.data('av_typewriter_text', _self.$current.html());
		    	_self.$current.css('background-color', 'transparent');
		    	_self.$current.html("");
		    
		    }, 800 );
	    	
	    	
	    	//start typing new text
	    	setTimeout(function()
	    	{ 
		    	_self.$slider.removeClass('av-blinking-caret');  
		    	_self.$next = _self.$slides.eq(_self.open);
		    	var content = _self.$next.data('av_typewriter_text') || _self.$next.html();
		    	_self.$current.css({display:'none'});
		    	_self.$next.css({display:'inline'});
		    	_self.$next.html("");
		    	
		    	var i = 0;
				var speed = 50; /* The speed/duration of the effect in milliseconds */
				
				function typeWriter() {
					
				  if (i < content.length) {
				    _self.$next[0].innerHTML += content.charAt(i);
				    i++;
				    setTimeout(typeWriter, speed + Math.floor(Math.random() * 100 ) );
				  }
				  else
				  {
					  _self.$slider.addClass('av-caret av-blinking-caret'); 
					  _self.$current = _self.$slides.eq(_self.open);
					  _self._autoplay();
				  }
				  
				}
				
				typeWriter();
		    	
	    	}, 1500 );
	    },
    	 	
    	_move: function(event)
    	{
	    	var _self 		= this, 
	    		modifier 	= 30 * _self.options.animation, 
	    		fade_out 	= {opacity:0}, 
	    		fade_start  = {display:'inline-block', opacity:0},
	    		fade_in		= {opacity:1};
	    		
    		this.$next = _self.$slides.eq(this.open);
    		
    		if(this.cssActive)
    		{
	    		fade_out[_self.property] 	= "translate(0px," + modifier +"px)";
	    		fade_start[_self.property] 	= "translate(0px," + (modifier * -1) +"px)";
	    		fade_in[_self.property] 	= "translate(0px,0px)";
    		}
    		else
    		{
	    		fade_out['top'] 	= modifier;
	    		fade_start['top'] 	= (modifier * -1);
	    		fade_in['top'] 		= 0;
    		}
    		
    		
    		_self.$current.avia_animate(fade_out, function()
    		{
	    		_self.$current.css({display:'none'});
	    		_self.$next.css(fade_start).avia_animate(fade_in, function()
	    		{
		    		_self.$current = _self.$slides.eq(_self.open);
	    		});
    		});
    	}
    };


	$.fn.avia_textrotator = function( options )
	{
		return this.each(function()
		{
			var active = $.data( this, 'AviaTextRotator' );
	
			if(!active)
			{
				//make sure that the function doesnt get aplied a second time
				$.data( this, 'AviaTextRotator', 1 );
				
				//create the preparations for fullscreen slider
				new $.AviaTextRotator( options, this );
			}
		});
	}
	
}(jQuery));;(function($)
{ 
	"use strict";
	
	// -------------------------------------------------------------------------------------------
	// Iconlist shortcode javascript
	// -------------------------------------------------------------------------------------------
	
	$.fn.avia_sc_iconlist = function(options)
	{
		return this.each(function()
		{
			var iconlist = $(this), elements = iconlist.find('>li');
	
	
			//trigger displaying of thumbnails
			iconlist.on('avia_start_animation', function()
			{
				elements.each(function(i)
				{
					var element = $(this);
					setTimeout(function(){ element.addClass('avia_start_animation') }, (i * 350));
				});
			});
		});
	}
	
	
}(jQuery));;// -------------------------------------------------------------------------------------------
// AVIA Image Hotspots
// -------------------------------------------------------------------------------------------

(function($)
{ 
	"use strict";

	$.fn.aviaHotspots = function( options )
	{
		if(!this.length) return; 

		return this.each(function()
		{
			var _self = {};
			
			_self.container	= $(this);
			_self.hotspots	= _self.container.find('.av-image-hotspot');
			
				_self.container.on('avia_start_animation', function()
				{
					setTimeout(function()
					{
						_self.hotspots.each(function(i)
						{
							var current = $(this);
							setTimeout(function(){ current.addClass('av-display-hotspot'); },300 * i);
						});
					},400);
				});

		});
	};
	
}(jQuery));;/*!
 * Isotope PACKAGED v3.0.2
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2016 Metafizzy
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,n){var o,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,n);o=void 0===o?l:o}),void 0!==o?o:t}function h(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new s(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return u(this,t,e)}return h(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return n.indexOf(e)==-1&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return n!=-1&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var s=this._onceEvents&&this._onceEvents[t];o;){var r=s&&s[o];r&&(this.off(t,o),delete s[o]),o.apply(this,e),n+=r?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=u[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);s.isBoxSizeOuter=r=200==t(o.width),i.removeChild(e)}}function s(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=n(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;l<h;l++){var f=u[l],c=s[f],m=parseFloat(c);a[f]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,I=a.borderTopWidth+a.borderBottomWidth,z=d&&r,x=t(s.width);x!==!1&&(a.width=x+(z?0:p+_));var S=t(s.height);return S!==!1&&(a.height=S+(z?0:y+I)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+I),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),s=0;s<i.length;s++)o.push(i[s])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,s=this;this[o]=setTimeout(function(){n.apply(s,e),delete s[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var s=i.toDashed(o),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,o,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=h[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],s=this.layout.size,r=n.indexOf("%")!=-1?parseFloat(n)/100*s.width:parseInt(n,10),a=o.indexOf("%")!=-1?parseFloat(o)/100*s.height:parseInt(o,10);r=isNaN(r)?0:r,a=isNaN(a)?0:a,r-=e?s.paddingLeft:s.paddingRight,a-=i?s.paddingTop:s.paddingBottom,this.position.x=r,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[o];e[s]=this.getXValue(a),e[r]="";var u=n?"paddingTop":"paddingBottom",h=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),s=parseInt(e,10),r=o===this.position.x&&s===this.position.y;if(this.setPosition(t,e),r&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,u=e-n,h={};h.transform=this.getTranslate(a,u),this.transition({to:h,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var c={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(c)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,s){return e(t,i,n,o,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function s(t,e){var i=n.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,f[o]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=o,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var c=s.prototype;n.extend(c,e.prototype),c.option=function(t){n.extend(this.options,t)},c._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},c._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},c.reloadItems=function(){this.items=this._itemize(this.element.children)},c._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var s=e[o],r=new i(s,this);n.push(r)}return n},c._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},c.getItemElements=function(){return this.items.map(function(t){return t.element})},c.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},c._init=c.layout,c._resetLayout=function(){this.getSize()},c.getSize=function(){this.size=i(this.element)},c._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},c.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},c._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},c._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},c._getItemLayoutPosition=function(){return{x:0,y:0}},c._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},c.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},c._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},c._postLayout=function(){this.resizeContainer()},c.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},c._getContainerSize=d,c._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},c._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){r++,r==s&&i()}var o=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,n)})},c.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),h)if(this.$element=this.$element||h(this.element),e){var o=h.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},c.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},c.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},c.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},c.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},c._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)},c._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},c._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},c._manageStamp=d,c._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),s={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return s},c.handleEvent=n.handleEvent,c.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},c.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},c.onresize=function(){this.resize()},n.debounceMethod(s,"onresize",100),c.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},c.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},c.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},c.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},c.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},c.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},c.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},c.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},c.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},c.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},c.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},c.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},c.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=n.extend({},s.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(o),n.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var m={ms:1,s:1e3};return s.Item=o,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),n=i._create;i._create=function(){this.id=this.layout.itemGUID++,n.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var n=e[i];this.sortData[i]=n(this.element,this)}}};var o=i.destroy;return i.destroy=function(){o.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var n=i.prototype,o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return o.forEach(function(t){n[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),n.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},n._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},n.getColumnWidth=function(){this.getSegmentSize("column","Width")},n.getRowHeight=function(){this.getSegmentSize("row","Height")},n.getSegmentSize=function(t,e){var i=t+e,n="outer"+e;if(this._getMeasurement(i,n),!this[i]){var o=this.getFirstItemSize();this[i]=o&&o[n]||this.isotope.size["inner"+e]}},n.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},n.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},n.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=Object.create(n),o.prototype.constructor=o,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");return i.compatOptions.fitWidth="isFitWidth",i.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0},i.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,s=o/n,r=n-o%n,a=r&&r<1?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},i.prototype.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},i.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&e<1?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this._getColGroup(n),s=Math.min.apply(Math,o),r=o.indexOf(s),a={x:this.columnWidth*r,y:s},u=s+t.size.outerHeight,h=this.cols+1-o.length,d=0;d<h;d++)this.colYs[r+d]=u;return a},i.prototype._getColGroup=function(t){if(t<2)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;n<i;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},i.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),s=o?n.left:n.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?n.top:n.bottom)+i.outerHeight,l=a;l<=u;l++)this.colYs[l]=Math.max(d,this.colYs[l])},i.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},i.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},i.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),n=i.prototype,o={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)o[s]||(n[s]=e.prototype[s]);var r=n.measureColumns;n.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=n._getOption;return n._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var n={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,n},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(i,n,o,s,r,a){return e(t,i,n,o,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope/js/item"),require("isotope/js/layout-mode"),require("isotope/js/layout-modes/masonry"),require("isotope/js/layout-modes/fit-rows"),require("isotope/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,n,o,s,r){function a(t,e){return function(i,n){for(var o=0;o<t.length;o++){var s=t[o],r=i.sortData[s],a=n.sortData[s];if(r>a||r<a){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var n=t[i];n.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?o.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&n&&o.dispatchEvent("arrangeComplete",null,[o.filteredItems])}var e,i,n,o=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){n=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],n=[],o=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?n.push(a):u||a.isHidden||o.push(a)}}return{matches:i,needReveal:n,needHide:o}},l._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return n(e.element,t)}},l.updateSortData=function(t){var e;t?(t=o.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&i<e;i++){var n=t[i];n.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),n=i[0],o=n.match(/^\[(.+)\]$/),s=o&&o[1],r=e(s,n),a=d.sortDataParsers[i[1]];
return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=a(e,this.options.sortAscending);this.filteredItems.sort(i),t!=this.sortHistory[0]&&this.sortHistory.unshift(t)}},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,n,o=e.length;for(i=0;i<o;i++)n=e[i],this.element.appendChild(n.element);var s=this._filter(e).matches;for(i=0;i<o;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;i<o;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var c=l.remove;return l.remove=function(t){t=o.makeArray(t);var e=this.getItems(t);c.call(this,t);for(var i=e&&e.length,n=0;i&&n<i;n++){var s=e[n];o.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var n=t.apply(this,e);return this.options.transitionDuration=i,n},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});

/*!
 * Packery layout mode PACKAGED v2.0.0
 * sub-classes Packery
 */

!function(a,b){"function"==typeof define&&define.amd?define("packery/js/rect",b):"object"==typeof module&&module.exports?module.exports=b():(a.Packery=a.Packery||{},a.Packery.Rect=b())}(window,function(){function a(b){for(var c in a.defaults)this[c]=a.defaults[c];for(c in b)this[c]=b[c]}a.defaults={x:0,y:0,width:0,height:0};var b=a.prototype;return b.contains=function(a){var b=a.width||0,c=a.height||0;return this.x<=a.x&&this.y<=a.y&&this.x+this.width>=a.x+b&&this.y+this.height>=a.y+c},b.overlaps=function(a){var b=this.x+this.width,c=this.y+this.height,d=a.x+a.width,e=a.y+a.height;return this.x<d&&b>a.x&&this.y<e&&c>a.y},b.getMaximalFreeRects=function(b){if(!this.overlaps(b))return!1;var c,d=[],e=this.x+this.width,f=this.y+this.height,g=b.x+b.width,h=b.y+b.height;return this.y<b.y&&(c=new a({x:this.x,y:this.y,width:this.width,height:b.y-this.y}),d.push(c)),e>g&&(c=new a({x:g,y:this.y,width:e-g,height:this.height}),d.push(c)),f>h&&(c=new a({x:this.x,y:h,width:this.width,height:f-h}),d.push(c)),this.x<b.x&&(c=new a({x:this.x,y:this.y,width:b.x-this.x,height:this.height}),d.push(c)),d},b.canFit=function(a){return this.width>=a.width&&this.height>=a.height},a}),function(a,b){if("function"==typeof define&&define.amd)define("packery/js/packer",["./rect"],b);else if("object"==typeof module&&module.exports)module.exports=b(require("./rect"));else{var c=a.Packery=a.Packery||{};c.Packer=b(c.Rect)}}(window,function(a){function b(a,b,c){this.width=a||0,this.height=b||0,this.sortDirection=c||"downwardLeftToRight",this.reset()}var c=b.prototype;c.reset=function(){this.spaces=[];var b=new a({x:0,y:0,width:this.width,height:this.height});this.spaces.push(b),this.sorter=d[this.sortDirection]||d.downwardLeftToRight},c.pack=function(a){for(var b=0;b<this.spaces.length;b++){var c=this.spaces[b];if(c.canFit(a)){this.placeInSpace(a,c);break}}},c.columnPack=function(a){for(var b=0;b<this.spaces.length;b++){var c=this.spaces[b],d=c.x<=a.x&&c.x+c.width>=a.x+a.width&&c.height>=a.height-.01;if(d){a.y=c.y,this.placed(a);break}}},c.rowPack=function(a){for(var b=0;b<this.spaces.length;b++){var c=this.spaces[b],d=c.y<=a.y&&c.y+c.height>=a.y+a.height&&c.width>=a.width-.01;if(d){a.x=c.x,this.placed(a);break}}},c.placeInSpace=function(a,b){a.x=b.x,a.y=b.y,this.placed(a)},c.placed=function(a){for(var b=[],c=0;c<this.spaces.length;c++){var d=this.spaces[c],e=d.getMaximalFreeRects(a);e?b.push.apply(b,e):b.push(d)}this.spaces=b,this.mergeSortSpaces()},c.mergeSortSpaces=function(){b.mergeRects(this.spaces),this.spaces.sort(this.sorter)},c.addSpace=function(a){this.spaces.push(a),this.mergeSortSpaces()},b.mergeRects=function(a){var b=0,c=a[b];a:for(;c;){for(var d=0,e=a[b+d];e;){if(e==c)d++;else{if(e.contains(c)){a.splice(b,1),c=a[b];continue a}c.contains(e)?a.splice(b+d,1):d++}e=a[b+d]}b++,c=a[b]}return a};var d={downwardLeftToRight:function(a,b){return a.y-b.y||a.x-b.x},rightwardTopToBottom:function(a,b){return a.x-b.x||a.y-b.y}};return b}),function(a,b){"function"==typeof define&&define.amd?define("packery/js/item",["outlayer/outlayer","./rect"],b):"object"==typeof module&&module.exports?module.exports=b(require("outlayer"),require("./rect")):a.Packery.Item=b(a.Outlayer,a.Packery.Rect)}(window,function(a,b){var c=document.documentElement.style,d="string"==typeof c.transform?"transform":"WebkitTransform",e=function(){a.Item.apply(this,arguments)},f=e.prototype=Object.create(a.Item.prototype),g=f._create;f._create=function(){g.call(this),this.rect=new b};var h=f.moveTo;return f.moveTo=function(a,b){var c=Math.abs(this.position.x-a),d=Math.abs(this.position.y-b),e=this.layout.dragItemCount&&!this.isPlacing&&!this.isTransitioning&&1>c&&1>d;return e?void this.goTo(a,b):void h.apply(this,arguments)},f.enablePlacing=function(){this.removeTransitionStyles(),this.isTransitioning&&d&&(this.element.style[d]="none"),this.isTransitioning=!1,this.getSize(),this.layout._setRectSize(this.element,this.rect),this.isPlacing=!0},f.disablePlacing=function(){this.isPlacing=!1},f.removeElem=function(){this.element.parentNode.removeChild(this.element),this.layout.packer.addSpace(this.rect),this.emitEvent("remove",[this])},f.showDropPlaceholder=function(){var a=this.dropPlaceholder;a||(a=this.dropPlaceholder=document.createElement("div"),a.className="packery-drop-placeholder",a.style.position="absolute"),a.style.width=this.size.width+"px",a.style.height=this.size.height+"px",this.positionDropPlaceholder(),this.layout.element.appendChild(a)},f.positionDropPlaceholder=function(){this.dropPlaceholder.style[d]="translate("+this.rect.x+"px, "+this.rect.y+"px)"},f.hideDropPlaceholder=function(){this.layout.element.removeChild(this.dropPlaceholder)},e}),function(a,b){"function"==typeof define&&define.amd?define("packery/js/packery",["get-size/get-size","outlayer/outlayer","./rect","./packer","./item"],b):"object"==typeof module&&module.exports?module.exports=b(require("get-size"),require("outlayer"),require("./rect"),require("./packer"),require("./item")):a.Packery=b(a.getSize,a.Outlayer,a.Packery.Rect,a.Packery.Packer,a.Packery.Item)}(window,function(a,b,c,d,e){function f(a,b){return a.position.y-b.position.y||a.position.x-b.position.x}function g(a,b){return a.position.x-b.position.x||a.position.y-b.position.y}function h(a,b){var c=b.x-a.x,d=b.y-a.y;return Math.sqrt(c*c+d*d)}c.prototype.canFit=function(a){return this.width>=a.width-1&&this.height>=a.height-1};var i=b.create("packery");i.Item=e;var j=i.prototype;j._create=function(){b.prototype._create.call(this),this.packer=new d,this.shiftPacker=new d,this.isEnabled=!0,this.dragItemCount=0;var a=this;this.handleDraggabilly={dragStart:function(){a.itemDragStart(this.element)},dragMove:function(){a.itemDragMove(this.element,this.position.x,this.position.y)},dragEnd:function(){a.itemDragEnd(this.element)}},this.handleUIDraggable={start:function(b,c){c&&a.itemDragStart(b.currentTarget)},drag:function(b,c){c&&a.itemDragMove(b.currentTarget,c.position.left,c.position.top)},stop:function(b,c){c&&a.itemDragEnd(b.currentTarget)}}},j._resetLayout=function(){this.getSize(),this._getMeasurements();var a,b,c;this._getOption("horizontal")?(a=1/0,b=this.size.innerHeight+this.gutter,c="rightwardTopToBottom"):(a=this.size.innerWidth+this.gutter,b=1/0,c="downwardLeftToRight"),this.packer.width=this.shiftPacker.width=a,this.packer.height=this.shiftPacker.height=b,this.packer.sortDirection=this.shiftPacker.sortDirection=c,this.packer.reset(),this.maxY=0,this.maxX=0},j._getMeasurements=function(){this._getMeasurement("columnWidth","width"),this._getMeasurement("rowHeight","height"),this._getMeasurement("gutter","width")},j._getItemLayoutPosition=function(a){if(this._setRectSize(a.element,a.rect),this.isShifting||this.dragItemCount>0){var b=this._getPackMethod();this.packer[b](a.rect)}else this.packer.pack(a.rect);return this._setMaxXY(a.rect),a.rect},j.shiftLayout=function(){this.isShifting=!0,this.layout(),delete this.isShifting},j._getPackMethod=function(){return this._getOption("horizontal")?"rowPack":"columnPack"},j._setMaxXY=function(a){this.maxX=Math.max(a.x+a.width,this.maxX),this.maxY=Math.max(a.y+a.height,this.maxY)},j._setRectSize=function(b,c){var d=a(b),e=d.outerWidth,f=d.outerHeight;(e||f)&&(e=this._applyGridGutter(e,this.columnWidth),f=this._applyGridGutter(f,this.rowHeight)),c.width=Math.min(e,this.packer.width),c.height=Math.min(f,this.packer.height)},j._applyGridGutter=function(a,b){if(!b)return a+this.gutter;b+=this.gutter;var c=a%b,d=c&&1>c?"round":"ceil";return a=Math[d](a/b)*b},j._getContainerSize=function(){return this._getOption("horizontal")?{width:this.maxX-this.gutter}:{height:this.maxY-this.gutter}},j._manageStamp=function(a){var b,d=this.getItem(a);if(d&&d.isPlacing)b=d.rect;else{var e=this._getElementOffset(a);b=new c({x:this._getOption("originLeft")?e.left:e.right,y:this._getOption("originTop")?e.top:e.bottom})}this._setRectSize(a,b),this.packer.placed(b),this._setMaxXY(b)},j.sortItemsByPosition=function(){var a=this._getOption("horizontal")?g:f;this.items.sort(a)},j.fit=function(a,b,c){var d=this.getItem(a);d&&(this.stamp(d.element),d.enablePlacing(),this.updateShiftTargets(d),b=void 0===b?d.rect.x:b,c=void 0===c?d.rect.y:c,this.shift(d,b,c),this._bindFitEvents(d),d.moveTo(d.rect.x,d.rect.y),this.shiftLayout(),this.unstamp(d.element),this.sortItemsByPosition(),d.disablePlacing())},j._bindFitEvents=function(a){function b(){d++,2==d&&c.dispatchEvent("fitComplete",null,[a])}var c=this,d=0;a.once("layout",b),this.once("layoutComplete",b)},j.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&(this.options.shiftPercentResize?this.resizeShiftPercentLayout():this.layout())},j.needsResizeLayout=function(){var b=a(this.element),c=this._getOption("horizontal")?"innerHeight":"innerWidth";return b[c]!=this.size[c]},j.resizeShiftPercentLayout=function(){var b=this._getItemsForLayout(this.items),c=this._getOption("horizontal"),d=c?"y":"x",e=c?"height":"width",f=c?"rowHeight":"columnWidth",g=c?"innerHeight":"innerWidth",h=this[f];if(h=h&&h+this.gutter){this._getMeasurements();var i=this[f]+this.gutter;b.forEach(function(a){var b=Math.round(a.rect[d]/h);a.rect[d]=b*i})}else{var j=a(this.element)[g]+this.gutter,k=this.packer[e];b.forEach(function(a){a.rect[d]=a.rect[d]/k*j})}this.shiftLayout()},j.itemDragStart=function(a){if(this.isEnabled){this.stamp(a);var b=this.getItem(a);b&&(b.enablePlacing(),b.showDropPlaceholder(),this.dragItemCount++,this.updateShiftTargets(b))}},j.updateShiftTargets=function(a){this.shiftPacker.reset(),this._getBoundingRect();var b=this._getOption("originLeft"),d=this._getOption("originTop");this.stamps.forEach(function(a){var e=this.getItem(a);if(!e||!e.isPlacing){var f=this._getElementOffset(a),g=new c({x:b?f.left:f.right,y:d?f.top:f.bottom});this._setRectSize(a,g),this.shiftPacker.placed(g)}},this);var e=this._getOption("horizontal"),f=e?"rowHeight":"columnWidth",g=e?"height":"width";this.shiftTargetKeys=[],this.shiftTargets=[];var h,i=this[f];if(i=i&&i+this.gutter){var j=Math.ceil(a.rect[g]/i),k=Math.floor((this.shiftPacker[g]+this.gutter)/i);h=(k-j)*i;for(var l=0;k>l;l++)this._addShiftTarget(l*i,0,h)}else h=this.shiftPacker[g]+this.gutter-a.rect[g],this._addShiftTarget(0,0,h);var m=this._getItemsForLayout(this.items),n=this._getPackMethod();m.forEach(function(a){var b=a.rect;this._setRectSize(a.element,b),this.shiftPacker[n](b),this._addShiftTarget(b.x,b.y,h);var c=e?b.x+b.width:b.x,d=e?b.y:b.y+b.height;if(this._addShiftTarget(c,d,h),i)for(var f=Math.round(b[g]/i),j=1;f>j;j++){var k=e?c:b.x+i*j,l=e?b.y+i*j:d;this._addShiftTarget(k,l,h)}},this)},j._addShiftTarget=function(a,b,c){var d=this._getOption("horizontal")?b:a;if(!(0!==d&&d>c)){var e=a+","+b,f=-1!=this.shiftTargetKeys.indexOf(e);f||(this.shiftTargetKeys.push(e),this.shiftTargets.push({x:a,y:b}))}},j.shift=function(a,b,c){var d,e=1/0,f={x:b,y:c};this.shiftTargets.forEach(function(a){var b=h(a,f);e>b&&(d=a,e=b)}),a.rect.x=d.x,a.rect.y=d.y};var k=120;j.itemDragMove=function(a,b,c){function d(){f.shift(e,b,c),e.positionDropPlaceholder(),f.layout()}var e=this.isEnabled&&this.getItem(a);if(e){b-=this.size.paddingLeft,c-=this.size.paddingTop;var f=this,g=new Date;this._itemDragTime&&g-this._itemDragTime<k?(clearTimeout(this.dragTimeout),this.dragTimeout=setTimeout(d,k)):(d(),this._itemDragTime=g)}},j.itemDragEnd=function(a){function b(){d++,2==d&&(c.element.classList.remove("is-positioning-post-drag"),c.hideDropPlaceholder(),e.dispatchEvent("dragItemPositioned",null,[c]))}var c=this.isEnabled&&this.getItem(a);if(c){clearTimeout(this.dragTimeout),c.element.classList.add("is-positioning-post-drag");var d=0,e=this;c.once("layout",b),this.once("layoutComplete",b),c.moveTo(c.rect.x,c.rect.y),this.layout(),this.dragItemCount=Math.max(0,this.dragItemCount-1),this.sortItemsByPosition(),c.disablePlacing(),this.unstamp(c.element)}},j.bindDraggabillyEvents=function(a){this._bindDraggabillyEvents(a,"on")},j.unbindDraggabillyEvents=function(a){this._bindDraggabillyEvents(a,"off")},j._bindDraggabillyEvents=function(a,b){var c=this.handleDraggabilly;a[b]("dragStart",c.dragStart),a[b]("dragMove",c.dragMove),a[b]("dragEnd",c.dragEnd)},j.bindUIDraggableEvents=function(a){this._bindUIDraggableEvents(a,"on")},j.unbindUIDraggableEvents=function(a){this._bindUIDraggableEvents(a,"off")},j._bindUIDraggableEvents=function(a,b){var c=this.handleUIDraggable;a[b]("dragstart",c.start)[b]("drag",c.drag)[b]("dragstop",c.stop)};var l=j.destroy;return j.destroy=function(){l.apply(this,arguments),this.isEnabled=!1},i.Rect=c,i.Packer=d,i}),function(a,b){"function"==typeof define&&define.amd?define(["isotope/js/layout-mode","packery/js/packery"],b):"object"==typeof module&&module.exports?module.exports=b(require("isotope-layout/js/layout-mode"),require("packery")):b(a.Isotope.LayoutMode,a.Packery)}(window,function(a,b){var c=a.create("packery"),d=c.prototype,e={_getElementOffset:!0,_getMeasurement:!0};for(var f in b.prototype)e[f]||(d[f]=b.prototype[f]);var g=d._resetLayout;d._resetLayout=function(){this.packer=this.packer||new b.Packer,this.shiftPacker=this.shiftPacker||new b.Packer,g.apply(this,arguments)};var h=d._getItemLayoutPosition;d._getItemLayoutPosition=function(a){return a.rect=a.rect||new b.Rect,h.call(this,a)};var i=d.needsResizeLayout;d.needsResizeLayout=function(){return this._getOption("horizontal")?this.needsVerticalResizeLayout():i.call(this)};var j=d._getOption;return d._getOption=function(a){return"horizontal"==a?void 0!==this.options.isHorizontal?this.options.isHorizontal:this.options.horizontal:j.apply(this.isotope,arguments)},c});;// -------------------------------------------------------------------------------------------
// Masonry
// -------------------------------------------------------------------------------------------

(function($)
{ 
	"use strict";

	$.fn.avia_masonry = function(options)
	{
		//return if we didnt find anything
		if(!this.length) return this;
		
		var the_body = $('body'),
			the_win	 = $(window),
			isMobile = $.avia_utilities.isMobile,
			loading = false,
			methods = {
		
			
			masonry_filter: function()
			{
				var current		= $(this),
					linktext	= current.html(),
			  		selector	= current.data('filter'),
			  		masonry 	= current.parents('.av-masonry:eq(0)'),
			  		container 	= masonry.find('.av-masonry-container:eq(0)'),
			  		links		= masonry.find('.av-masonry-sort a'),
			  		activeCat	= masonry.find('.av-current-sort-title');
					
					links.removeClass('active_sort');
					current.addClass('active_sort');
					container.attr('id', 'masonry_id_'+selector);
					
					if(activeCat.length) activeCat.html(linktext);
					
					methods.applyMasonry(container, selector, function()
					{
						container.css({overflow:'visible'});
					});
				
					setTimeout(function() { the_win.trigger('debouncedresize'); }, 500);
					
					return false;
			},
			
			applyMasonry: function(container, selector, callback)
			{
				var filters = selector ? {filter: '.'+selector} : {};
				
				filters['layoutMode'] = 'packery';
				filters['packery'] = {gutter:0};
				filters['percentPosition'] = true;
				filters['itemSelector'] = "a.isotope-item, div.isotope-item";
				
				container.isotope(filters, function()
				{
					the_win.trigger('av-height-change');
				});
				
				if(typeof callback === 'function')
				{
					setTimeout(callback, 0);
				}
			},
			
			show_bricks: function(bricks, callback)
			{
				bricks.each(function(i)
				{
					var currentLink 	= $(this),
						browserPrefix 	= $.avia_utilities.supports('transition'),
						multiplier		= isMobile ? 0 : 100;
					
					setTimeout(function()
					{
						if(browserPrefix === false)
						{
							currentLink.css({visibility:"visible", opacity:0}).animate({opacity:1},1500);
						}
						else
						{
							currentLink.addClass('av-masonry-item-loaded');
						}
						
						if(i == bricks.length - 1 && typeof callback == 'function')
						{
							callback.call();
							the_win.trigger('av-height-change');
						}
						
					}, (multiplier * i));
				});
			},
			
			loadMore: function(e)
			{
				e.preventDefault();
				
				if(loading) return false;
				
				loading = true;
			
				var current		= $(this),
			  		data		= current.data(),
			  		masonry 	= current.parents('.av-masonry:eq(0)'),
			  		container	= masonry.find('.av-masonry-container'),
			  		items		= masonry.find('.av-masonry-entry'),
			  		loader		= $.avia_utilities.loading(),
			  		finished	= function(){ loading = false; loader.hide(); the_body.trigger('av_resize_finished'); };
			  			  	
			  	//calculate a new offset	
			  	if(!data.offset){ data.offset = 0; }	
			  	data.offset += data.items;
			  	data.action = 'avia_ajax_masonry_more';
			  	data.loaded = []; //prevents duplicate entries from beeing loaded when randomized is active
			  	
			  	items.each(function(){
				  	var item_id = $(this).data('av-masonry-item');
				  	if(item_id) data.loaded.push( item_id );
			  	});
			  	
			  	 $.ajax({
					url: avia_framework_globals.ajaxurl,
					type: "POST",
					data:data,
					beforeSend: function()
					{
						loader.show();
					},
					success: function(response)
					{
						if(response.indexOf("{av-masonry-loaded}") !== -1)
						{
							//fetch the response. if any php warnings were displayed before rendering of the items the are removed by the string split
							var response  = response.split('{av-masonry-loaded}'),
								new_items = $(response.pop()).filter('.isotope-item');
								
								//check if we got more items than we need. if not we have reached the end of items
								if(new_items.length > data.items)
								{
									new_items = new_items.not(':last');
								}
								else
								{
									current.addClass('av-masonry-no-more-items');
								}
								
								var load_container = $('<div class="loadcontainer"></div>').append(new_items);
								
								
								
								$.avia_utilities.preload({container: load_container, single_callback:  function()
								{
									var links = masonry.find('.av-masonry-sort a'),
										filter_container = masonry.find('.av-sort-by-term'),
										allowed_filters = filter_container.data("av-allowed-sort");
									
									filter_container.hide();
									
									loader.hide();
									container.isotope( 'insert', new_items); 
									$.avia_utilities.avia_ajax_call(masonry);
									setTimeout( function(){ methods.show_bricks( new_items , finished); },150);
									setTimeout(function(){ the_win.trigger('av-height-change'); }, 550);
									if(links)
									{
										$(links).each(function(filterlinkindex)
										{
											var filterlink = $(this),
											sort = filterlink.data('filter');
	
											if(new_items)
											{
											    $(new_items).each(function(itemindex){
											        var item = $(this);
													
											        if(item.hasClass(sort) && allowed_filters.indexOf(sort) !== -1)
											        {
											            var term_count = filterlink.find('.avia-term-count').text();
											            filterlink.find('.avia-term-count').text(' ' + (parseInt(term_count) + 1) + ' ');
											
											            if(filterlink.hasClass('avia_hide_sort'))
											            {
											                filterlink.removeClass('avia_hide_sort').addClass('avia_show_sort');
											                masonry.find('.av-masonry-sort .'+sort+'_sep').removeClass('avia_hide_sort').addClass('avia_show_sort');
											                masonry.find('.av-masonry-sort .av-sort-by-term').removeClass('hidden');
											            }
											        }
											    });
											}
										});
	
									}
	
	                                				filter_container.fadeIn();
								}
							});
						}
						else
						{
							finished();
						}
					},
					error: finished,
					complete: function()
					{
					    setTimeout(function() { the_win.trigger('debouncedresize'); }, 500);
					}
				});
			}
	
		};
	
		return this.each(function()
		{	
			var masonry			= $(this),
				container 		= masonry.find('.av-masonry-container'),
				bricks			= masonry.find('.isotope-item'), 
				filter			= masonry.find('.av-masonry-sort').css({visibility:"visible", opacity:0}).on('click', 'a',  methods.masonry_filter),
				load_more		= masonry.find('.av-masonry-load-more').css({visibility:"visible", opacity:0});
				
			$.avia_utilities.preload({container: container, single_callback:  function()
			{
				var start_animation = function()
				{ 
					filter.animate({opacity:1}, 400);
					
					//fix for non aligned elements because of scrollbar
					if(container.outerHeight() + container.offset().top + $('#footer').outerHeight() > $(window).height())
					{
						$('html').css({'overflow-y':'scroll'});
					}
					
					methods.applyMasonry(container, false, function()
					{
						masonry.addClass('avia_sortable_active');
						container.removeClass('av-js-disabled '); 
					});
					
					methods.show_bricks(bricks, function()
					{
						load_more.css({opacity:1}).on('click',  methods.loadMore);
					});
					
					//container.isotope( 'reLayout' );
	
				};
				
				if(isMobile)
				{
					start_animation();
				}
				else
				{
					masonry.waypoint(start_animation , { offset: '80%'} );
				}
						
				// update columnWidth on window resize
				$(window).on( 'debouncedresize', function()
				{
				  	methods.applyMasonry(container, false, function()
					{
						masonry.addClass('avia_sortable_active');
					});
				});
			}
		});
			
			
		});
	};

	
}(jQuery));
;// -------------------------------------------------------------------------------------------
// Message Box
// -------------------------------------------------------------------------------------------

(function($)
{
    "use strict";

    $.fn.avia_sc_messagebox = function (options) {

        "use strict";

        return this.each(function () {

            var container = $(this),
                close_btn = container.find('.av_message_close'),
                mbox_ID = container.attr('id'),

                aviaSetCookie = function(CookieName,CookieValue,CookieDays) {
                    if (CookieDays) {
                        var date = new Date();
                        date.setTime(date.getTime()+(CookieDays*24*60*60*1000));
                        var expires = "; expires="+date.toGMTString();
                    }
                    else var expires = "";
                    document.cookie = CookieName+"="+CookieValue+expires+"; path=/";
                },

                aviaGetCookie = function(CookieName) {
                    var docCookiesStr = CookieName + "=";
                    var docCookiesArr = document.cookie.split(';');
                    for(var i=0; i < docCookiesArr.length; i++) {
                        var thisCookie = docCookiesArr[i];
                        while (thisCookie.charAt(0)==' ') {
                            thisCookie = thisCookie.substring(1,thisCookie.length);
                        }
                        if (thisCookie.indexOf(docCookiesStr) == 0) {
                            var cookieContents = container.attr('data-contents');
                            var savedContents = thisCookie.substring(docCookiesStr.length,thisCookie.length);
                            if (savedContents == cookieContents) {
                                return savedContents;
                            }
                        }
                    }
                    return null;
                };

            // check if cookie is set and display message box
            if ( ! aviaGetCookie(mbox_ID)){
                container.removeClass('messagebox-hidden');
            }

            // set cookie when button clicked
            close_btn.on('click', function() {
                var cookieContents = container.attr('data-contents');

                // set session cookie
                if ( container.hasClass('messagebox-session_cookie') ) {
                    var cookieLifetime = "";
                }
                // set cookie with defined lifetime
                else if ( container.hasClass('messagebox-custom_cookie') ) {
                    var cookieLifetime = parseInt(container.attr('data-cookielifetime'));
                }

                aviaSetCookie(mbox_ID,cookieContents,cookieLifetime);
                container.addClass('messagebox-hidden');
            });

        });

    };


    // activate message box
    $('.avia_message_box').avia_sc_messagebox();


}(jQuery));

;// -------------------------------------------------------------------------------------------
// Big Number animation shortcode javascript
// -------------------------------------------------------------------------------------------

(function($)
{
	// options.simple_up = dont prepend leading zeros, options.instant_start = trigger counting instantly, options.start_timer = delay when to start counting
	$.fn.avia_sc_animated_number = function(options) 
	{
		if(!this.length) return;
		if(this.is('.avia_sc_animated_number_active')) return;
		
		this.addClass('avia_sc_animated_number_active');
	
		var skipStep = false,
			simple_upcount 	= (options && options.simple_up) ? true : false,
			start_timer 	= (options && options.start_timer) ? options.start_timer : 300,
		start_count = function(element, countTo, increment, current, fakeCountTo)
		{
			
			
			//calculate the new number
			var newCount = current + increment;
			
			//if the number is bigger than our final number set the number and finish
			if(newCount >= fakeCountTo) 
			{
				element.text(countTo); //exit
				
			}
			else
			{
				var prepend = "", addZeros = countTo.toString().length - newCount.toString().length
				
				//if the number has less digits than the final number some zeros where omitted. add them to the front
				for(var i = addZeros; i > 0; i--){ prepend += "0"; }
				
				if(simple_upcount) prepend = 0;
				element.text(prepend + newCount);
				
				window.requestAnimationFrame(function(){ start_count(element, countTo, increment, newCount, fakeCountTo) });
			}
		};
	
		return this.each(function()
		{
			var number_container = $(this), elements = number_container.find('.__av-single-number'), countTimer = number_container.data('timer') || 3000;
			
			//prepare elements
			elements.each(function(i)
			{
				var element = $(this), text = element.text();
				if(window.addEventListener) element.text( text.replace(/./g, "0")); /*https://github.com/AviaThemes/wp-themes/issues/812*/
			});
			
			//trigger number animation
			number_container.addClass('number_prepared').on('avia_start_animation', function()
			{
				if(number_container.is('.avia_animation_done')) return;
				number_container.addClass('avia_animation_done');
				
				elements.each(function(i)
				{
					var element = $(this), countTo = element.data('number'), fakeCountTo = countTo, current = parseInt(element.text(),10), zeroOnly = /^0+$/.test(countTo), increment = 0;
					
					//fallback for decimals like 00 or 000
					if(zeroOnly && countTo !== 0) fakeCountTo = countTo.replace(/0/g, '9');
					
					increment = Math.round( fakeCountTo * 32 / countTimer);
					if(increment == 0 || increment % 10 == 0) increment += 1;
					
					setTimeout(function(){ start_count(element, countTo, increment, current, fakeCountTo);}, start_timer);
				});
			});
			
			if(options && options.instant_start == true)
			{
				number_container.trigger('avia_start_animation');
			}
			
			
		});
	}
})(jQuery);;// -------------------------------------------------------------------------------------------
// Avia AJAX Portfolio
// -------------------------------------------------------------------------------------------

(function($)
{ 
	"use strict";
	$.avia_utilities = $.avia_utilities || {};
	
	
	// -------------------------------------------------------------------------------------------
	//Portfolio sorting
	// -------------------------------------------------------------------------------------------

    $.fn.avia_iso_sort = function(options)
	{
		return this.each(function()
		{
			var the_body		= $('body'),
				container		= $(this),
				portfolio_id	= container.data('portfolio-id'),
				parentContainer	= container.parents('.entry-content-wrapper, .avia-fullwidth-portfolio'),
				filter			= parentContainer.find('.sort_width_container[data-portfolio-id="' + portfolio_id + '"]').find('#js_sort_items').css({visibility:"visible", opacity:0}),
				links			= filter.find('a'),
				imgParent		= container.find('.grid-image'),
				isoActive		= false,
				items			= $('.post-entry', container);

			function applyIso()
			{
				container.addClass('isotope_activated').isotope({
					layoutMode : 'fitRows', itemSelector : '.flex_column'
				});
				
				container.isotope( 'on', 'layoutComplete', function()
				{
					container.css({overflow:'visible'});
					the_body.trigger('av_resize_finished');
				}); 
				
				isoActive = true;
				setTimeout(function(){ parentContainer.addClass('avia_sortable_active'); }, 0);
			};

			links.bind('click',function()
			{
				var current		= $(this),
			  		selector	= current.data('filter'),
			  		linktext	= current.html(),
			  		activeCat	= parentContainer.find('.av-current-sort-title');

			  		if(activeCat.length) activeCat.html(linktext);
			  		
					links.removeClass('active_sort');
					current.addClass('active_sort');
					container.attr('id', 'grid_id_'+selector);

					parentContainer.find('.open_container .ajax_controlls .avia_close').trigger('click');
					//container.css({overflow:'hidden'})
					container.isotope({ layoutMode : 'fitRows', itemSelector : '.flex_column' , filter: '.'+selector});

					return false;
			});

			// update columnWidth on window resize
			$(window).on( 'debouncedresize', function()
			{
			  	applyIso();
			});

			$.avia_utilities.preload({container: container, single_callback:  function()
				{
					filter.animate({opacity:1}, 400); applyIso();

					//call a second time to for the initial resizing
					setTimeout(function(){ applyIso(); });

					imgParent.css({height:'auto'}).each(function(i)
					{
						var currentLink = $(this);

						setTimeout(function()
						{
							currentLink.animate({opacity:1},1500);
						}, (100 * i));
					});
				}
			});

		});
	};
	
	
	
	
	
	$.fn.avia_portfolio_preview = function(passed_options) 
	{	
		var win  = $(window),
		the_body = $('body'),
		isMobile = $.avia_utilities.isMobile,
		defaults = 
		{
			open_in:	'.portfolio-details-inner',
			easing:		'easeOutQuint',
			timing:		800,
			transition:	'slide' // 'fade' or 'slide'
		},
		
		options = $.extend({}, defaults, passed_options);
	
		return this.each(function()
		{	
			var container			= $(this),
				portfolio_id		= container.data('portfolio-id'),
				target_wrap			= $('.portfolio_preview_container[data-portfolio-id="' + portfolio_id + '"]'),
				target_container	= target_wrap.find(options.open_in),
				items				= container.find('.grid-entry'),
				content_retrieved	= {},
				is_open				= false,
				animating			= false,
				index_open			= false,
				ajax_call			= false,
				methods,
				controls,
				loader				= $.avia_utilities.loading();
				
			methods = 
			{
				load_item: function(e)
				{
					e.preventDefault();

					var link			= $(this),
						post_container	= link.parents('.post-entry:eq(0)'),
						post_id			= "ID_" + post_container.data('ajax-id'),
						clickedIndex	= items.index(post_container);
					
					//check if current item is the clicked item or if we are currently animating
					if(post_id === is_open || animating == true) 
					{
						return false;
					}
					
					animating = true;
					
					container.find('.active_portfolio_item').removeClass('active_portfolio_item');
					post_container.addClass('active_portfolio_item');
					loader.show();
					
					methods.ajax_get_contents(post_id, clickedIndex);
				},
				
				scroll_top: function()
				{
					setTimeout(function()
					{
						var target_offset = target_wrap.offset().top - 175,
							window_offset = win.scrollTop();
											
						if(window_offset > target_offset || target_offset - window_offset > 100  )
						{
							$('html:not(:animated),body:not(:animated)').animate({ scrollTop: target_offset }, options.timing, options.easing);
						}
					},10);
				},
				
				attach_item: function(post_id)
				{
					content_retrieved[post_id] = $(content_retrieved[post_id]).appendTo(target_container);
					ajax_call = true;
				},
				
				remove_video: function()
				{
					var del = target_wrap.find('iframe, .avia-video').parents('.ajax_slide:not(.open_slide)');	
					
						if(del.length > 0)
						{
							del.remove();
							content_retrieved["ID_" + del.data('slideId')] = undefined;
						}
				},
				
				show_item: function(post_id, clickedIndex)
				{
				
					//check if current item is the clicked item or if we are currently animating
					if(post_id === is_open) 
					{
						return false;
					}
					animating = true;
					
					
					loader.hide();
					
					if(false === is_open)
					{
						target_wrap.addClass('open_container');
						content_retrieved[post_id].addClass('open_slide');
						
						methods.scroll_top();
						
						target_wrap.css({display:'none'}).slideDown(options.timing, options.easing, function()
						{
							if(ajax_call)
							{ 
								$.avia_utilities.activate_shortcode_scripts(content_retrieved[post_id]); 
								$.avia_utilities.avia_ajax_call(content_retrieved[post_id]);
								the_body.trigger('av_resize_finished');
								ajax_call = false; 
							}
							
							methods.remove_video();
							the_body.trigger('av_resize_finished');
						});
						
							index_open	= clickedIndex;
							is_open		= post_id;
							animating	= false;
						
						
						
					}
					else
					{
						methods.scroll_top();
					
						var initCSS = { zIndex:3 },
							easing	= options.easing;
							
						if(index_open > clickedIndex) { initCSS.left = '-110%'; }
						if(options.transition === 'fade'){ initCSS.left = '0%'; initCSS.opacity = 0; easing = 'easeOutQuad'; }
						
						//fixate height for container during animation
						target_container.height(target_container.height()); //outerHeight = border problems?
						
						content_retrieved[post_id].css(initCSS).avia_animate({'left':"0%", opacity:1}, options.timing, easing);
						content_retrieved[is_open].avia_animate({opacity:0}, options.timing, easing, function()
						{
							content_retrieved[is_open].attr({'style':""}).removeClass('open_slide');
							content_retrieved[post_id].addClass('open_slide');
																										  //+ 2 fixes border problem (slides move up and down 2 px on transition)
							target_container.avia_animate({height: content_retrieved[post_id].outerHeight() + 2}, options.timing/2, options.easing, function()
							{
								target_container.attr({'style':""});
								is_open		= post_id;
								index_open	= clickedIndex;
								animating	= false;
								
								methods.remove_video();
								if(ajax_call)
								{ 
									the_body.trigger('av_resize_finished');
									$.avia_utilities.activate_shortcode_scripts(content_retrieved[post_id]); 
									$.avia_utilities.avia_ajax_call(content_retrieved[post_id]);
									ajax_call = false; 
								}
	
							});
							
						});		
					}
				},
				
				ajax_get_contents: function(post_id, clickedIndex)
				{
					if(content_retrieved[post_id] !== undefined)
					{
						methods.show_item(post_id, clickedIndex);
						return;
					}
					
					content_retrieved[post_id] = $('#avia-tmpl-portfolio-preview-' + post_id.replace(/ID_/,"")).html();
					
					//this line is necessary to prevent w3 total cache from messing up the portfolio if inline js is compressed
					content_retrieved[post_id] = content_retrieved[post_id].replace('/*<![CDATA[*/','').replace('*]]>','');
					
					methods.attach_item(post_id);
					
					$.avia_utilities.preload({container: content_retrieved[post_id] , single_callback:  function(){ methods.show_item(post_id, clickedIndex); }});
				},
				
				add_controls: function()
				{
					controls = target_wrap.find('.ajax_controlls');

					target_wrap.avia_keyboard_controls({27:'.avia_close', 37:'.ajax_previous', 39:'.ajax_next'});
					//target_wrap.avia_swipe_trigger({prev:'.ajax_previous', next:'.ajax_next'});
					
					items.each(function(){
					
						var current = $(this), overlay;
						
						current.addClass('no_combo').bind('click', function(event)
						{
							overlay = current.find('.slideshow_overlay');
							
							if(overlay.length)
							{
								event.stopPropagation();
								methods.load_item.apply(current.find('a:eq(0)'));
								return false;
							}
						});
						
						
					});
				},
				
				control_click: function()
				{
					var showItem,
						activeID = container.find('.active_portfolio_item').data('ajax-id'),
						active   = container.find('.post-entry-'+activeID);
				
					switch(this.hash)
					{
						case '#next': 
						
							showItem = active.nextAll('.post-entry:visible:eq(0)').find('a:eq(0)');
							if(!showItem.length) { showItem = $('.post-entry:visible:eq(0)', container).find('a:eq(0)'); }
							showItem.trigger('click');
					
						break;
						case '#prev': 
							
							showItem = active.prevAll('.post-entry:visible:eq(0)').find('a:eq(0)');
							if(!showItem.length) { showItem = $('.post-entry:visible:last', container).find('a:eq(0)'); }
							showItem.trigger('click');
						
						break;
						case '#close':
						
							animating = true;
							
							target_wrap.slideUp( options.timing, options.easing, function()
							{ 
								container.find('.active_portfolio_item').removeClass('active_portfolio_item');
								content_retrieved[is_open].attr({'style':""}).removeClass('open_slide');
								target_wrap.removeClass('open_container');
								animating = is_open = index_open = false;
								methods.remove_video();
								the_body.trigger('av_resize_finished');
							});
							
						break;
					}
					return false;
				},
				
				
				resize_reset: function()
				{
					if(is_open === false)
					{
						target_container.html('');
						content_retrieved	= [];
					}
				}
			};
			
			methods.add_controls();
			
			container.on("click", "a", methods.load_item);
			controls.on("click", "a", methods.control_click);
			if(jQuery.support.leadingWhitespace) { win.bind('debouncedresize', methods.resize_reset); }
			
		});
	};
}(jQuery));	


;(function($)
{ 
	"use strict";
	
	// -------------------------------------------------------------------------------------------
	// Progress bar shortcode javascript
	// -------------------------------------------------------------------------------------------
	
	$.fn.avia_sc_progressbar = function(options)
	{
		return this.each(function()
		{
			var container = $(this), elements = container.find('.avia-progress-bar');
			
			
			//trigger displaying of progress bar
			container.on('avia_start_animation', function()
			{
				elements.each(function(i)
				{
					var element = $(this)
					
					setTimeout(function()
					{ 
						element.find('.progress').addClass('avia_start_animation') 
						element.find('.progressbar-percent').avia_sc_animated_number(
						{
							instant_start:true, simple_up:true, start_timer: 10
						});
						
					}, (i * 250));
				});
			});
		});
	}
	
}(jQuery));;(function($)
{
	"use strict";
// -------------------------------------------------------------------------------------------
// Aviaccordion Slideshow 
// 
// accordion slider script
// -------------------------------------------------------------------------------------------

	$.AviaccordionSlider  =  function(options, slider)
	{
	    this.$slider  	= $( slider );
	    this.$inner	  	= this.$slider.find('.aviaccordion-inner');
	    this.$slides	= this.$inner.find('.aviaccordion-slide');
	    this.$images	= this.$inner.find('.aviaccordion-image');
	    this.$last		= this.$slides.filter(':last');
	    this.$titles  	= this.$slider.find('.aviaccordion-preview');
	    this.$titlePos  = this.$slider.find('.aviaccordion-preview-title-pos');
	    this.$titleWrap = this.$slider.find('.aviaccordion-preview-title-wrap');
	    this.$win	  	= $( window );
	    
	    if($.avia_utilities.supported.transition === undefined)
		{
			$.avia_utilities.supported.transition = $.avia_utilities.supports('transition');
		}
		
		this.browserPrefix 	= $.avia_utilities.supported.transition;
	    this.cssActive 		= this.browserPrefix !== false ? true : false;
	    this.transform3d	= document.documentElement.className.indexOf('avia_transform3d') !== -1 ? true : false;
		this.isMobile 		= $.avia_utilities.isMobile;
		this.property		= this.browserPrefix + 'transform',
		this.count			= this.$slides.length;
		this.open			= false;
		this.autoplay		= false;
		this.increaseTitle  = this.$slider.is(".aviaccordion-title-on-hover");
		// this.cssActive    = false; //testing no css3 browser
		
	    this._init( options );
	}

  	$.AviaccordionSlider.prototype =
    {
    	_init: function( options )
    	{
    		var _self = this;
    		_self.options = $.extend({}, options, this.$slider.data());
			 $.avia_utilities.preload({container: this.$slider , single_callback:  function(){ _self._kickOff(); }});
    	},
    	
    	_kickOff: function()
    	{
    		var _self = this;
    		
    		_self._calcMovement();
    		_self._bindEvents();
    		_self._showImages();
    		_self._autoplay();
    	},
    	
    	_autoplay: function()
    	{
    		var _self = this;
    		
    		if(_self.options.autoplay)
    		{
    			_self.autoplay = setInterval(function()
    			{
    				_self.open = _self.open === false ? 0 : _self.open + 1;
    				if(_self.open >= _self.count) _self.open = 0;
    				_self._move({}, _self.open);
    				
    			}, _self.options.interval * 1000)
    		}
    	},
    	
    	_showImages: function()
    	{
    		var _self = this, counter = 0, delay = 300, title_delay = this.count * delay;
    		
    		if(this.cssActive)
    		{
    			setTimeout(function(){ _self.$slider.addClass('av-animation-active'); } , 10);
    		}
    		
    		this.$images.each(function(i)
    		{
    			var current = $(this), timer = delay * (i + 1);
    				
    			setTimeout(function()
    			{ 
    				current.avia_animate({opacity:1}, 400, function()
    				{
    					current.css($.avia_utilities.supported.transition + "transform", "none");
    				}); 
    			},timer);
    		});
    		
    		if(_self.increaseTitle) title_delay = 0;
    		
    		this.$titlePos.each(function(i)
    		{
    			var current = $(this), new_timer = title_delay + 100 * (i + 1);
    					
    			setTimeout(function()
    			{ 
    				current.avia_animate({opacity:1}, 200, function()
    				{
    					current.css($.avia_utilities.supported.transition + "transform", "none");
    				}); 
    			},new_timer);
    		});
    	},
    	
    	_bindEvents: function()
    	{
    		var trigger = this.isMobile ? "click" : "mouseenter";
    	
    		this.$slider.on(trigger,'.aviaccordion-slide', $.proxy( this._move, this));
    		this.$slider.on('mouseleave','.aviaccordion-inner', $.proxy( this._move, this));
    		this.$win.on('debouncedresize', $.proxy( this._calcMovement, this));
    		this.$slider.on('av-prev av-next', $.proxy( this._moveTo, this));
    		
    		if(this.isMobile)
    		{
    			this.$slider.avia_swipe_trigger({next: this.$slider, prev: this.$slider, event:{prev: 'av-prev', next: 'av-next'}});
    		}
    		
    	},
    	
    	_titleHeight: function()
    	{
    		var th = 0;
    		
    		this.$titleWrap.css({'height':'auto'}).each(function()
    		{
    			var new_h = $(this).outerHeight();
    			if( new_h > th) th = new_h;
    		
    		}).css({'height':th + 2});
    		
    	},
    	
    	_calcMovement: function(event, allow_repeat)
    	{ 
    		var _self			= this,
    			containerWidth	= this.$slider.width(),
    			defaultPos		= this.$last.data('av-left'),
    			imgWidth		= this.$images.filter(':last').width() || containerWidth,
    			imgWidthPercent = Math.floor((100 / containerWidth) * imgWidth),
    			allImageWidth	= imgWidthPercent * _self.count,
    			modifier		= 3, // 10 - _self.count,
    			tempMinLeft		= 100 - imgWidthPercent,
    			minLeft 		= tempMinLeft > defaultPos / modifier ? tempMinLeft : 0,
    			oneLeft			= minLeft / (_self.count -1 ),
    			titleWidth		= imgWidth;
    		
    		
    		
    		if(allImageWidth < 110 && allow_repeat !== false)
    		{
    			//set height if necessary	
    			var slideHeight = this.$slider.height(), 
    				maxHeight 	= (slideHeight / allImageWidth) * 110 ;
    			
    			this.$slider.css({'max-height': maxHeight});
    			_self._calcMovement(event, false);
    			return;
    		}
    		
    		//backup so the minimized slides dont get too small
    		if(oneLeft < 2) minLeft = 0;
    		
			this.$slides.each(function(i)
			{
				var current = $(this), newLeft = 0, newRight = 0, defaultLeft = current.data('av-left');
					
				if( minLeft !== 0)
				{
					newLeft  = oneLeft * i;
					newRight = imgWidthPercent + newLeft - oneLeft;
				}
				else
				{
					newLeft  = defaultLeft / Math.abs(modifier);
					newRight = 100 - ((newLeft / i) * (_self.count - i));
				}
				
				if(i == 1 && _self.increaseTitle) { titleWidth = newRight + 1; } 
				
				if(_self.cssActive)
				{	
					//if we are not animating based on the css left value but on css transform we need to subtract the left value
					newLeft = newLeft - defaultLeft;
					newRight = newRight - defaultLeft;
					defaultLeft = 0;
				}
				
				current.data('av-calc-default', defaultLeft);
				current.data('av-calc-left', newLeft);
				current.data('av-calc-right', newRight);
				
			});
			
			if(_self.increaseTitle) { _self.$titles.css({width: titleWidth + "%"});} 
    	},
    	
    	_moveTo: function(event)
    	{
    		var direction 	= event.type == "av-next" ? 1 : -1,
    			nextSlide 	= this.open === false ? 0 : this.open + direction;
    			
    		if(nextSlide >= 0 && nextSlide < this.$slides.length) this._move(event, nextSlide);
    	},
    	
    	_move: function(event, direct_open)
    	{
    		var _self  = this,
    			slide  = event.currentTarget,
    			itemNo = typeof direct_open != "undefined" ? direct_open : this.$slides.index(slide);
    			
    		this.open = itemNo;
    		
    		if(_self.autoplay && typeof slide != "undefined") { clearInterval(_self.autoplay); _self.autoplay = false; }
    		
    		this.$slides.removeClass('aviaccordion-active-slide').each(function(i)
    		{
    			var current 	= $(this),
    				dataSet 	= current.data(),
    				trans_val	= i <= itemNo ? dataSet.avCalcLeft : dataSet.avCalcRight,
					transition 	= {},
					reset		= event.type == 'mouseleave' ? 1 : 0,
					active 		= itemNo === i ? _self.$titleWrap.eq(i) : false;
    			
    			if(active) current.addClass('aviaccordion-active-slide');
    				
    			if(reset)
    			{
    				trans_val = dataSet.avCalcDefault; 
    				this.open = false;
    			}
    				
				if(_self.cssActive) //do a css3 animation
				{
					//move the slides
					transition[_self.property]  = _self.transform3d ? "translate3d(" + trans_val  + "%, 0, 0)" : "translate(" + trans_val + "%,0)"; //3d or 2d transform?
					current.css(transition);
				}
				else
				{
					transition.left =  trans_val + "%";
					current.stop().animate(transition, 700, 'easeOutQuint');
				}	
    		});
    	}
    };


$.fn.aviaccordion = function( options )
{
	return this.each(function()
	{
		var active = $.data( this, 'AviaccordionSlider' );

		if(!active)
		{
			//make sure that the function doesnt get aplied a second time
			$.data( this, 'AviaccordionSlider', 1 );
			
			//create the preparations for fullscreen slider
			new $.AviaccordionSlider( options, this );
		}
	});
}

})(jQuery);
;// -------------------------------------------------------------------------------------------
// Fullscreen Slideshow 
// 
// extends avia slideshow script with a more sophisticated preloader and fixed size for slider
// -------------------------------------------------------------------------------------------

(function($)
{
    "use strict";

	$.AviaFullscreenSlider  =  function(options, slider)
	{
	    this.$slider  	= $( slider ); 
	    this.$inner	  	= this.$slider.find('.avia-slideshow-inner');
	    this.$innerLi	= this.$inner.find('>li');
	    this.$caption 	= this.$inner.find('.avia-slide-wrap .caption_container');
	    this.$win	  	= $( window );
	    this.isMobile 	= $.avia_utilities.isMobile;
	    this.property 	= {};
	    this.scrollPos	= "0";
	    this.transform3d= document.documentElement.className.indexOf('avia_transform3d') !== -1 ? true : false;
	    this.ticking 	= false; 
	    
	    
	    if($.avia_utilities.supported.transition === undefined)
		{
			$.avia_utilities.supported.transition = $.avia_utilities.supports('transition');
		}
		
	    this._init( options );
	}

	$.AviaFullscreenSlider.defaults  = {

		//height of the slider in percent
		height: 100,
		
		//subtract elements from the height
		subtract: '#wpadminbar, #header, #main>.title_container'
		
		
	};

  	$.AviaFullscreenSlider.prototype =
    {
    	_init: function( options )
    	{
    		var _self = this;
    		//set the default options
    		this.options = $.extend( true, {}, $.AviaFullscreenSlider.defaults, options );
    		
    		if(this.$slider.data('slide_height')) this.options.height = this.$slider.data('slide_height');
    		
    		//if background attachment is set to fixed or scroll disable the parallax effect
    		this.options.parallax_enabled = this.$slider.data('image_attachment') == "" ? true : false;
    		
    		//elements that get subtracted from the image height
    		this.$subtract = $(this.options.subtract);
    		
    		
			// set the slideshow size
			this._setSize(); 
    		
			// set resizing script on window resize
			this.$win.on( 'debouncedresize',  $.proxy( this._setSize, this) );
    		
    		//parallax scroll if element if leaving viewport
			setTimeout(function()
			{
				if(!_self.isMobile && _self.options.parallax_enabled) //disable parallax scrolling on mobile
    			{
	    			_self.$win.on( 'scroll', $.proxy( _self._on_scroll, _self) );
    			}
    			
    		},100);
			/**/
    		
			//activate the defaule slider
			this.$slider.aviaSlider({bg_slider:true});
			
			
    	},
    	
    	_on_scroll: function(e)
    	{
	    	var _self = this;
	    	
	    	if(!_self.ticking) {
		     _self.ticking = true;
		      window.requestAnimationFrame( $.proxy( _self._parallax_scroll, _self) );
		    }
    	},
    	
    	
    	_fetch_properties: function(slide_height)
		{
			this.property.offset 	= this.$slider.offset().top;
			this.property.wh 		= this.$win.height();
			this.property.height 	= slide_height || this.$slider.outerHeight();
			
			//re-position the slider
			this._parallax_scroll();
		},
    	
    	_setSize: function( )
    	{	
    		if(!$.fn.avia_browser_height)
    		{
    	
    		var viewport		= this.$win.height(),
    			slide_height	= Math.ceil( (viewport / 100) * this.options.height );
			
			if(this.$subtract.length && this.options.height == 100)
			{
	    		this.$subtract.each(function()
	    		{
	    			slide_height -= this.offsetHeight - 0.5;
	    		});
    		}
    		else
    		{
    			slide_height -= 1;
    		}
    		this.$slider.height(slide_height).removeClass('av-default-height-applied');
    		this.$inner.css('padding',0);
    		}
    		
    		
    		this._fetch_properties(slide_height);
    	},
    	
    	_parallax_scroll: function(e)
    	{
    		if(this.isMobile || ! this.options.parallax_enabled) return; //disable parallax scrolling on mobile
    	
    		var winTop 		= this.$win.scrollTop(),
    			winBottom	=  winTop + this.property.wh,
    			scrollPos 	= "0", 
    			prop 		= {}, prop2 = {};
    		
    		if(this.property.offset < winTop && winTop <= this.property.offset + this.property.height)
    		{	
    			scrollPos = Math.round( (winTop - this.property.offset) * 0.3 );
    		}
    		
    		if(this.scrollPos != scrollPos)
    		{	
    			//slide background parallax
    			this.scrollPos = scrollPos;
    			
    			//currently no 3d transform, because of browser quirks
    			//this.transform3d = false;
    			
    			if(this.transform3d)
    			{
    				prop[$.avia_utilities.supported.transition+"transform"] = "translate3d(0px,"+ scrollPos +"px,0px)";
    			}
    			else
    			{
    				prop[$.avia_utilities.supported.transition+"transform"] = "translate(0px,"+ scrollPos +"px)";
    			}
    			
    			
    			this.$inner.css(prop);
    			
    			
    			
    			//slider caption parallax
    			
				// prop2[$.avia_utilities.supported.transition+"transform"] = "translate(0px,-"+ ( scrollPos * 1) +"px)";
				/*
	    		prop2['opacity'] = Math.ceil((this.$slider.height() - (scrollPos * 2)) / 100)/ 10;
	    		prop2['opacity'] = prop2['opacity'] < 0 ? 0 : prop2['opacity'];
	    		this.$caption.css(prop2);
				*/
    		}
    		
    		this.ticking = false;
    	}
    };



	$.fn.aviaFullscreenSlider = function( options )
	{
		return this.each(function()
		{
			var active = $.data( this, 'aviaFullscreenSlider' );
	
			if(!active)
			{
				//make sure that the function doesnt get aplied a second time
				$.data( this, 'aviaFullscreenSlider', 1 );
				
				//create the preparations for fullscreen slider
				new $.AviaFullscreenSlider( options, this );
			}
		});
	}
	
})(jQuery);	
	;(function($)
{	
"use strict";

// -------------------------------------------------------------------------------------------
// makes sure that the fixed container height is removed once the layerslider is loaded, so it adapts to the screen resolution
// -------------------------------------------------------------------------------------------

$.fn.layer_slider_height_helper = function(options)
{
	return this.each(function()
	{
		var container 	= $(this),
			first_div 	= container.find('>div:first'),
			timeout 	= false,
			counter 	= 0,
			reset_size 	= function()
			{
				if(first_div.height() > 0 || counter > 5)
				{
					container.height('auto');
				}
				else
				{
					timeout = setTimeout(reset_size, 500);
					counter++;
				}
			};

		if(!first_div.length) return;

		timeout = setTimeout(reset_size, 0);
	});
}


}(jQuery));;(function($)
{ 
	"use strict";
	
	// -------------------------------------------------------------------------------------------
	// Tab Section
	// -------------------------------------------------------------------------------------------
	
	$.fn.avia_sc_tab_section= function()
	{
		var win 			= $(window),
			browserPrefix 	= $.avia_utilities.supports('transition'),
			cssActive 		= this.browserPrefix !== false ? true : false,
			isMobile 		= $.avia_utilities.isMobile,
			transform3d		= document.documentElement.className.indexOf('avia_transform3d') !== -1 ? true : false,
			transition		= {};
			
		return this.each(function()
		{
			var container 		= $(this),
				tabs			= container.find('.av-section-tab-title'),
			    tab_outer		= container.find('.av-tab-section-outer-container'),
				tab_wrap		= container.find('.av-tab-section-tab-title-container'),
				tab_nav			= container.find('.av_tab_navigation'), 
				content_wrap	= container.find('.av-tab-section-inner-container'),
				single_tabs		= container.find('.av-animation-delay-container'), //for elements inside the tab that receive waypoint animation
				inner_content	= container.find('.av-layout-tab-inner'),
				sliding_active  = container.is('.av-tab-slide-transition'),
				flexible    	= container.is('.av-tab-content-auto'),
				current_content = container.find('.__av_init_open'),
				min_width		= 0,
				change_tab 		= function(e, prevent_hash)
				{
					e.preventDefault();
					
					var current_tab 	= $(e.currentTarget),
						current_arrow	= current_tab.find('.av-tab-arrow-container span'),
						tab_nr			= current_tab.data('av-tab-section-title');
						
						current_content = container.find('[data-av-tab-section-content="'+tab_nr+'"]');
					
					var new_bg			= current_content.data('av-tab-bg-color'),
						new_font		= current_content.data('av-tab-color'),
						prev_container 	= container.find('.av-active-tab-content').not('[data-av-tab-section-content="'+tab_nr+'"]');
	
					tabs.attr('style','').removeClass('av-active-tab-title');
					current_tab.addClass('av-active-tab-title');
					current_content.addClass("av-active-tab-content");
					
					if(new_bg !== "") current_arrow.css('background-color', new_bg);
					if(new_font !== "") current_tab.css('color', new_font);
						
					var new_pos = ((parseInt(tab_nr,10) - 1) * -100 );
					    if ($('body').hasClass('rtl')) {
	        				new_pos = ((parseInt(tab_nr,10) - 1) * 100 );
	    					}
					
					if(cssActive)
					{
						//move the slides
						new_pos = new_pos / tabs.length;
						transition['transform']  = transform3d ? "translate3d(" + new_pos  + "%, 0, 0)" : "translate(" + new_pos + "%,0)"; //3d or 2d transform?
						transition['left'] = "0%";
						content_wrap.css(transition);
					}
					else
					{
						content_wrap.css('left',  new_pos + "%");
					}
					
					set_tab_titlte_pos();
					set_slide_height();
					
					if(!prevent_hash) location.hash = current_tab.attr('href');
					
					setTimeout(function()
					{
						current_content.trigger('avia_start_animation_if_current_slide_is_active');
						single_tabs.not(current_content).trigger('avia_remove_animation');
						
					}, 600);	
					
				},
				set_min_width = function()
				{
					min_width = 0;
					tabs.each(function()
					{ 
						min_width += $(this).outerWidth(); 
					});
					
					tab_wrap.css('min-width',min_width);
				},
				
				set_slide_height = function()
				{				
					if(current_content.length && flexible)
					{
						var old_height = inner_content.height();
						inner_content.height('auto');
						
						var height = current_content.find('.av-layout-tab-inner').height(),
						    add_height = tab_wrap.height();
						
						tab_outer.css('max-height', height + add_height + 100);
						inner_content.height(old_height);
						inner_content.height(height);
						
						inner_content.css( 'overflow', 'hidden' );
						
						setTimeout(function() { win.trigger('av-height-change'); }, 600);
					}
				},
				
				set_tab_titlte_pos = function()
				{
					//	scroll the tabs if there is not enough room to display them all - rtl allign right to left !!
					var current_tab = container.find('.av-active-tab-title'),
						viewport	= container.width(),
						left_pos	= ( current_tab.position().left * - 1) - (current_tab.outerWidth() / 2) + (viewport / 2);
				
					if( ! $('body').hasClass("rtl") )
					{
						if( viewport >= min_width )
						{
							left_pos = 0;
						}
						
						if(left_pos + min_width < viewport) left_pos = (min_width - viewport) * -1;
						if(left_pos > 0) left_pos = 0;
					
						tab_wrap.css('left',left_pos );
					}
					else
					{
						var right_pos = 0;
						
						if( viewport < min_width )
						{
							if( left_pos + min_width > viewport )
							{
								if( left_pos > 0 ) left_pos = 0;
								
								var right_pos = (left_pos + min_width - viewport) * -1;
								tab_wrap.css('left', 'auto' );
								tab_wrap.css('right', right_pos );
							}
						}
						tab_wrap.css('left', 'auto' );
						tab_wrap.css('right', right_pos );
					}
				},
				switch_to_next_prev = function(e)
				{
					if(!isMobile) return;
					
					var clicked 		= $(e.currentTarget),
						current_tab 	= container.find('.av-active-tab-title');
						
						if(clicked.is('.av_prev_tab_section'))
						{
							current_tab.prev('.av-section-tab-title').trigger('click');
						}
						else
						{
							current_tab.next('.av-section-tab-title').trigger('click');
						}
				},
				
				get_init_open = function()
				{
					if(!hash && window.location.hash) var hash = window.location.hash;
		            		
					var open = tabs.filter('[href="'+hash+'"]');
					
					if(open.length)
					{
						if(!open.is('.active_tab')) open.trigger('click');
					}
					else
					{
						//set correct color
						container.find('.av-active-tab-title').trigger('click', true);
					}
				};
					
			$.avia_utilities.preload({
				
				container: current_content , 
				single_callback:  function(){ 
				
					tabs.on('click', change_tab);
					tab_nav.on('click', switch_to_next_prev);
					win.on('debouncedresize', set_tab_titlte_pos);	
					
					/**
					 * We had to remove av-height-change because this event is recursivly triggered in set_slide_height and lead to performance problems 
					 * AND broken layout - content was not displayed completly
					 * 
					 * Content elements that can can change their height and trigger av-height-change should trigger this additional event after to
					 * allow layout elements like tab section to react on this and then call av-height-change by themself
					 * 
					 * @since 4.2.3
					 */
					win.on('debouncedresize av-content-el-height-changed', set_slide_height);	
					
					set_min_width();
					set_slide_height(); 
					get_init_open();
				}
				
			});	
			
			content_wrap.avia_swipe_trigger({prev:'.av_prev_tab_section', next:'.av_next_tab_section'});
				
		});
	};
	
	
}(jQuery));;// -------------------------------------------------------------------------------------------
// Tab Shortcode
// -------------------------------------------------------------------------------------------

(function($)
{ 
	"use strict";

	$.fn.avia_sc_tabs= function(options)
	{
		var defaults =
		{
			heading: '.tab',
			content:'.tab_content',
			active:'active_tab',
			sidebar: false
		};
	
		var win = $(window),
			options = $.extend(defaults, options);
	
		return this.each(function()
		{
			var container 	= $(this),
				tab_titles 	= $('<div class="tab_titles"></div>').prependTo(container),
				tabs 		= $(options.heading, container),
				content 	= $(options.content, container),
				newtabs 	= false,
				oldtabs 	= false;
	
			newtabs = tabs.clone();
			oldtabs = tabs.addClass('fullsize-tab');
			tabs = newtabs;
	
			tabs.prependTo(tab_titles).each(function(i)
			{
				var tab = $(this), the_oldtab = false;
	
				if(newtabs) the_oldtab = oldtabs.filter(':eq('+i+')');
	
				tab.addClass('tab_counter_'+i).bind('click', function()
				{
					open_content(tab, i, the_oldtab);
					return false;
				});
	
				if(newtabs)
				{
					the_oldtab.bind('click', function()
					{
						open_content(the_oldtab, i, tab);
						return false;
					});
				}
			});
	
			set_size();
			trigger_default_open(false);
			win.on("debouncedresize", set_size);
			
	        $('a').on('click',function(){
	            var hash = $(this).attr('href');
	            if(typeof hash != "undefined" && hash)
	            {
	                hash = hash.replace(/^.*?#/,'');
	                trigger_default_open('#'+hash);
	            }
	        });
	
			function set_size()
			{
				if(!options.sidebar) return;
				content.css({'min-height': tab_titles.outerHeight() + 1});
			}
	
			function open_content(tab, i, alternate_tab)
			{
				if(!tab.is('.'+options.active))
				{
					$('.'+options.active, container).removeClass(options.active);
					$('.'+options.active+'_content', container).removeClass(options.active+'_content');
	
					tab.addClass(options.active);
	
					var new_loc = tab.data('fake-id');
					if(typeof new_loc == 'string') location.replace(new_loc);
	
					if(alternate_tab) alternate_tab.addClass(options.active);
					var active_c = content.filter(':eq('+i+')').addClass(options.active+'_content');
	
					if(typeof click_container != 'undefined' && click_container.length)
					{
						sidebar_shadow.height(active_c.outerHeight());
					}
					
					//check if tab title is in viewport. if not scroll up
					var el_offset = active_c.offset().top,
						scoll_target = el_offset - 50 - parseInt($('html').css('margin-top'),10);
					
					if(win.scrollTop() > el_offset)
					{
						$('html:not(:animated),body:not(:animated)').scrollTop(scoll_target);
					}
				}
				
				win.trigger( 'av-content-el-height-changed', tab );
			}
	
			function trigger_default_open(hash)
			{
				if(!hash && window.location.hash) hash = window.location.hash;
	            		if(!hash) return;
	            		
				var open = tabs.filter('[data-fake-id="'+hash+'"]');
	
				if(open.length)
				{
					if(!open.is('.active_tab')) open.trigger('click');
					window.scrollTo(0, container.offset().top - 70);
				}
			}
	
		});
	};

	
}(jQuery));;(function($)
{ 
	"use strict";
	
	// -------------------------------------------------------------------------------------------
	// testimonial shortcode javascript
	// -------------------------------------------------------------------------------------------
	
	$.fn.avia_sc_testimonial = function(options)
	{
		return this.each(function()
		{
			var container = $(this), elements = container.find('.avia-testimonial');
	
	
			//trigger displaying of thumbnails
			container.on('avia_start_animation', function()
			{
				elements.each(function(i)
				{
					var element = $(this);
					setTimeout(function(){ element.addClass('avia_start_animation') }, (i * 150));
				});
			});
		});
	}
	
}(jQuery));;// -------------------------------------------------------------------------------------------
// Avia Timeline
// -------------------------------------------------------------------------------------------


(function($) {
    "use strict";

    $(window).on('load', function (e) {
        if ($.AviaSlider) {
            $('.avia-timeline-container').avia_sc_timeline();
        }
    });


    $.fn.avia_sc_timeline = function (options) {

        return this.each(function () {

            var container = this,
                timeline_id = '#' + $(this).attr('id'),
                timeline = $(timeline_id),
                methods;

            methods =
                {
                    // make sure all milestones have the same height in horizontal timelines
                    matchHeights: function(){

                        //date
						this.setMinHeight( $(timeline_id + ' .av-milestone-placement-top .av-milestone-date'), true );

						//content
						this.setMinHeight( $(timeline_id + ' .av-milestone-placement-bottom .av-milestone-content-wrap'), true );

                        //contentbox
                        this.setMinHeight( $(timeline_id + ' .av-milestone-placement-bottom.avia-timeline-boxshadow .av-milestone-contentbox'), false );
                        this.setMinHeight( $(timeline_id + ' .av-milestone-placement-top.avia-timeline-boxshadow .av-milestone-contentbox'), false );

						//alternate
						this.setMinHeight( $(timeline_id + ' .avia-timeline-horizontal.av-milestone-placement-alternate li >:first-child'), true );

                    },

                    setMinHeight: function( els, setNav )
                    {

	                    if(els.length < 2) return;

	                    var elsHeights = new Array();
	                    els.css('min-height','0').each(function(i)
	                    {
                            var current = $(this);
                            var currentHeight = current.outerHeight(true);
                            elsHeights.push(currentHeight);
	                    });

	                    var largest = Math.max.apply(null, elsHeights);
                        els.css('min-height', largest);

	                    //set nav position
                        if (setNav) {
                            var $firstElement = els.first(),
                                $parent = $firstElement.closest('.avia-timeline-container'),
                                $pos = $firstElement.height();

                            $parent.find('.av-timeline-nav').css('top',$pos);
                        }

                    },
                    createCarousel : function(e){

                        var self = this,
                            slider = $(timeline_id + '.avia-slideshow-carousel'),
                            slides_num = 3,
                            slides_num_small = 1;

                        if (timeline.attr('avia-data-slides')) {
                            slides_num = parseInt(timeline.attr('avia-data-slides'));
                        }

                        if (slides_num >= 2) {
                            slides_num_small = 2;
                        }

                        var sliderOptions = {
                            carousel : 'yes',
                            keep_pading : true,
                            carouselSlidesToShow : slides_num,
                            carouselSlidesToScroll : 3,
                            carouselResponsive : [
                                {
                                    breakpoint: 989,
                                    settings: {
                                        carouselSlidesToShow: slides_num_small,
                                        carouselSlidesToScroll: slides_num_small,
                                    }
                                },
                                {
                                    breakpoint: 767,
                                    settings: {
                                        carouselSlidesToShow: 1,
                                        carouselSlidesToScroll: 1,
                                    }
                                }
                            ],
                        }

                        slider.aviaSlider(sliderOptions);

                        slider.on('_kickOff',function(){
                            self.matchHeights();
                        });

                        $(window).on( 'resize', function() {
                            self.matchHeights();
                        });



                    },
                    layoutHelpers : function(e){

                        $(timeline_id + ' .avia-timeline-vertical li').each(function(index, element){

                            var $length = $(this).parents('ul').find('li').length;

                            var $icon_wrap = $(this).find('.av-milestone-icon-wrap');
                            var $icon_wrap_height = $icon_wrap.outerHeight(true);
                            var $icon_wrap_height_half = parseInt($icon_wrap_height/2);

                            if (index === ($length - 1)) {
                                $icon_wrap.css({
                                    'height' : $icon_wrap_height_half,
                                });
                            }
                            else {
                                $icon_wrap.css({
                                    'height' : $icon_wrap_height,
                                });
                            }

                        });

                    },
                    fireAnimations : function(e) {

                        if ( $(timeline_id + ' > ul').hasClass('avia-timeline-vertical') ) {
                            var milestone = timeline.find('.av-milestone');
                            timeline.on('avia_start_animation', function() {
                                milestone.each(function(i)
                                {
                                    var element = $(this);
                                    setTimeout(function(){ element.addClass('avia_start_animation') }, (i * 350));
                                });
                            });
                        }
                    }
                };
            methods.createCarousel();
            methods.layoutHelpers();
            methods.fireAnimations();
            methods.matchHeights();
        });
    }

})(jQuery);;// -------------------------------------------------------------------------------------------
// Toggle shortcode javascript
// -------------------------------------------------------------------------------------------
(function($)
{ 
	"use strict";
	
	$.fn.avia_sc_toggle = function(options)
	{
		var defaults =
		{
			single: '.single_toggle',
			heading: '.toggler',
			content: '.toggle_wrap',
			sortContainer:'.taglist'
		};
	
		var win = $(window),
			options = $.extend(defaults, options);
	
		return this.each(function()
		{
			var container 	= $(this).addClass('enable_toggles'),
				toggles		= $(options.single, container),
				heading 	= $(options.heading, container),
				allContent 	= $(options.content, container),
				sortLinks	= $(options.sortContainer + " a", container);
	
			heading.each(function(i)
			{
				var thisheading =  $(this), content = thisheading.next(options.content, container);
	
				function scroll_to_viewport()
				{
				    //check if toggle title is in viewport. if not scroll up
				    var el_offset = content.offset().top,
				        scoll_target = el_offset - 50 - parseInt($('html').css('margin-top'),10);
	
				    if(win.scrollTop() > el_offset)
				    {
				        $('html:not(:animated),body:not(:animated)').animate({scrollTop: scoll_target},200);
				    }
				}
	
				if(content.css('visibility') != "hidden")
				{
					thisheading.addClass('activeTitle');
				}
	
				thisheading.on('click', function()
				{
					if(content.css('visibility') != "hidden")
					{
						content.slideUp(200, function()
						{
							content.removeClass('active_tc').attr({style:''});
							win.trigger('av-height-change');
							win.trigger('av-content-el-height-changed', this );
							
							location.replace(thisheading.data('fake-id') + "-closed");
						});
						thisheading.removeClass('activeTitle');
	
					}
					else
					{
						if(container.is('.toggle_close_all'))
						{
							allContent.not(content).slideUp(200, function()
							{
								$(this).removeClass('active_tc').attr({style:''});
								scroll_to_viewport();
							});
							heading.removeClass('activeTitle');
						}
						
						content.addClass('active_tc');
						
						setTimeout(function(){
							
							content.slideDown(200,
							
								function()
								{
			                        if(!container.is('.toggle_close_all'))
			                        {
			                            scroll_to_viewport();
			                        }
			                        
			                        win.trigger('av-height-change');
									win.trigger('av-content-el-height-changed', this );
								}
							
							);
						
						}, 1);
						
						thisheading.addClass('activeTitle');
						location.replace(thisheading.data('fake-id'));
					}
					
					
					
				});
			});
	
	
			sortLinks.click(function(e){
	
				e.preventDefault();
				var show = toggles.filter('[data-tags~="'+$(this).data('tag')+'"]'),
					hide = toggles.not('[data-tags~="'+$(this).data('tag')+'"]');
	
					sortLinks.removeClass('activeFilter');
					$(this).addClass('activeFilter');
					heading.filter('.activeTitle').trigger('click');
					show.slideDown();
					hide.slideUp();
			});
	
	
			function trigger_default_open(hash)
			{
				if(!hash && window.location.hash) hash = window.location.hash;
				if(!hash) return;
				
				var open = heading.filter('[data-fake-id="'+hash+'"]');
	
				if(open.length)
				{
					if(!open.is('.activeTitle')) open.trigger('click');
					window.scrollTo(0, container.offset().top - 70);
				}
			}
			trigger_default_open(false);
			
			$('a').on('click',function(){
	            var hash = $(this).attr('href');
	            if(typeof hash != "undefined" && hash)
	            {
	                hash = hash.replace(/^.*?#/,'');
	                trigger_default_open('#'+hash);
	            }
	        });
	
		});
	};
	
}(jQuery));;(function($)
{ 
	"use strict";

	
	$('body').on('click','.av-lazyload-video-embed .av-click-to-play-overlay', function(e){
		
		if(document.cookie.match(/aviaPrivacyVideoEmbedsDisabled/))
		{
			if (e.originalEvent === undefined) return; //human click only
				  
			var src_url = $(this).parents('.avia-video').data('original_url');
			if( src_url ) window.open(src_url , '_blank'); 
			
			return;
		}
		
		
		var clicked 	= $(this),
			container	= clicked.parents('.av-lazyload-video-embed'),
			video		= container.find('.av-video-tmpl').html();
			
			container.html(video);
	});
	
	$('.av-lazyload-immediate .av-click-to-play-overlay').trigger('click');
	
}(jQuery));;/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isLowIE=b.isIE8=document.all&&!document.addEventListener,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(c,d){if(void 0===d||d===!1)return!0;if(e=c.split("_"),e.length>1){var f=b.find(p+"-"+e[0]);if(f.length>0){var g=e[1];"replaceWith"===g?f[0]!==d[0]&&f.replaceWith(d):"img"===g?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(p+"-"+c).html(d)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery";return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s);e.click(function(){b.prev()}),f.click(function(){b.next()}),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),A()});;(function($)
{	
    "use strict";
	
	// -------------------------------------------------------------------------------------------
	// Ligthbox activation
	// -------------------------------------------------------------------------------------------

	$.avia_utilities = $.avia_utilities || {};

	$.avia_utilities.av_popup = {
			type: 				'image',
			mainClass: 			'avia-popup mfp-zoom-in',
			tLoading: 			'',
			tClose: 			'',
			removalDelay: 		300, //delay removal by X to allow out-animation
			closeBtnInside: 	true,
			closeOnContentClick:false,
			midClick: 			true,
			fixedContentPos: 	false, // allows scrolling when lightbox is open but also removes any jumping because of scrollbar removal
			iframe: {
			    patterns: {
			        youtube: {
			            index: 'youtube.com/watch', 
			            id: function(url) {  
				            
				            //fetch the id      
			                var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/), id, params;
			                if ( !m || !m[1] ) return null;
							
							id = m[1];
			                
			                //fetch params
			                params = url.split('/watch');
			                params = params[1];
			                
			                return id + params;
			            },
			            src: '//www.youtube.com/embed/%id%'
			        }
			    }
			},
			image: {
			    titleSrc: function(item){
				    var title = item.el.attr('title');
				    if(!title) title = item.el.find('img').attr('title');
				    if(!title) title = item.el.parent().next('.wp-caption-text').html();
				    if(typeof title == "undefined") return "";
				    return title;
				}
			},
			
			gallery: {
				// delegate: 	options.autolinkElements,
				tPrev:		'',
				tNext:		'',
				tCounter:	'%curr% / %total%',
				enabled:	true,
				preload:	[1,1] // Will preload 1 - before current, and 1 after the current image
			},

			callbacks: 
			{
				beforeOpen: function()
				{
					//add custom css class for different styling
					if( this.st.el && this.st.el.data('fixed-content') )
					{
						this.fixedContentPos = true;
					}
				},
				
				
				open: function()
				{
					//overwrite default prev + next function. Add timeout for  crossfade animation
					$.magnificPopup.instance.next = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
					}
					$.magnificPopup.instance.prev = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
					}
					
					//add custom css class for different styling
					if( this.st.el && this.st.el.data('av-extra-class') )
					{
						this.wrap.addClass( this.currItem.el.data('av-extra-class') );
					}
					
					
				},
				imageLoadComplete: function() 
				{	
					var self = this;
					setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
				},
				change: function() {
				    
				    if( this.currItem.el )
				    {	
					    var current = this.currItem.el;
					    
					    this.content.find( '.av-extra-modal-content, .av-extra-modal-markup' ).remove();
					    
					    if( current.data('av-extra-content') )
					    {
						    var extra = current.data('av-extra-content');
						    this.content.append( "<div class='av-extra-modal-content'>" + extra + "</div>" );
					    }
					    
					    if( current.data('av-extra-markup') )
					    {
						    var markup = current.data('av-extra-markup');
						    this.wrap.append( "<div class='av-extra-modal-markup'>" + markup + "</div>"  );
					    }
				    }
				},
			}
		},


	$.fn.avia_activate_lightbox = function(variables)
	{
		
		var defaults = {
			groups			:	['.avia-slideshow', '.avia-gallery', '.av-instagram-pics', '.portfolio-preview-image', '.portfolio-preview-content', '.isotope', '.post-entry', '.sidebar', '#main', '.main_menu'], 
			autolinkElements:   'a.lightbox, a[rel^="prettyPhoto"], a[rel^="lightbox"], a[href$=jpg], a[href$=png], a[href$=gif], a[href$=jpeg], a[href*=".jpg?"], a[href*=".png?"], a[href*=".gif?"], a[href*=".jpeg?"], a[href$=".mov"] , a[href$=".swf"] , a:regex(href, .vimeo\.com/[0-9]) , a[href*="youtube.com/watch"] , a[href*="screenr.com"], a[href*="iframe=true"]',
			videoElements	: 	'a[href$=".mov"] , a[href$=".swf"] , a:regex(href, .vimeo\.com/[0-9]) , a[href*="youtube.com/watch"] , a[href*="screenr.com"], a[href*="iframe=true"]',
			exclude			:	'.noLightbox, .noLightbox a, .fakeLightbox, .lightbox-added, a[href*="dropbox.com"]',
		},
		
		options = $.extend({}, defaults, variables),
				
		active = !$('html').is('.av-custom-lightbox');
		
		if(!active) return this;
		
		return this.each(function()
		{
			var container	= $(this),
				videos		= $(options.videoElements, this).not(options.exclude).addClass('mfp-iframe'), /*necessary class for the correct lightbox markup*/
				ajaxed		= !container.is('body') && !container.is('.ajax_slide');
				for (var i = 0; i < options.groups.length; i++) 
				{
					container.find(options.groups[i]).each(function() 
					{ 
						var links = $(options.autolinkElements, this);
						if(ajaxed) links.removeClass('lightbox-added');
						links.not(options.exclude).addClass('lightbox-added').magnificPopup($.avia_utilities.av_popup);
					});
				}
			
		});
	}
})(jQuery);


;(function($)
{	
    "use strict";
    
    $(document).ready(function()
    {	
		// decreases header size when user scrolls down
        avia_header_size();
    });
    
    
    function av_change_class($element, change_method, class_name)
	{	
		if($element[0].classList)
		{
			if(change_method == "add") 
			{
				$element[0].classList.add(class_name);
			}
			else
			{
				$element[0].classList.remove(class_name);
			}
		}
		else
		{
			if(change_method == "add") 
			{
				$element.addClass(class_name);
			}
			else
			{
				$element.removeClass(class_name);
			}
		}
	}
	
	
	function avia_header_size()
    {
        var win				= $(window),
            header          = $('.html_header_top.html_header_sticky #header'),
            unsticktop		= $('.av_header_unstick_top');
            
        if(!header.length && !unsticktop.length) return;
        
        var logo            = $('#header_main .container .logo img, #header_main .container .logo a'),
            elements        = $('#header_main .container:not(#header_main_alternate>.container), #header_main .main_menu ul:first-child > li > a:not(.avia_mega_div a, #header_main_alternate a), #header_main #menu-item-shop .cart_dropdown_link'),
            el_height       = $(elements).filter(':first').height(),
            isMobile        = $.avia_utilities.isMobile,
            scroll_top		= $('#scroll-top-link'),
            transparent 	= header.is('.av_header_transparency'),
            shrinking		= header.is('.av_header_shrinking'),
            topbar_height	= header.find('#header_meta').outerHeight(),
            set_height      = function()
            {	
                var st = win.scrollTop(), newH = 0, st_real = st;
				
				if(unsticktop) st -= topbar_height; 
				if(st < 0) st = 0;
				
				if(shrinking && !isMobile)
                {
	                if(st < el_height/2)
	                {
	                    newH = el_height - st;
	                    if(st <= 0){
							newH = el_height;
					    }
	                    
	                    av_change_class(header, 'remove', 'header-scrolled');
	                    //header.removeClass('header-scrolled');
	                }
	                else
	                {
	                    newH = el_height/2;
	                    //header.addClass('header-scrolled');
	                    av_change_class(header, 'add', 'header-scrolled');
	                }
	                
	                if(st - 30 < el_height)
	                {
	                    av_change_class(header, 'remove', 'header-scrolled-full');
	                }
	                else
	                {
	                    av_change_class(header, 'add', 'header-scrolled-full');
	                }
	                
	                
	                elements.css({'height': newH + 'px', 'lineHeight': newH + 'px'});
                	logo.css({'maxHeight': newH + 'px'});
                }
                
                if(unsticktop.length)
            	{
                	if( st <= 0)
                	{
	                	if(st_real <= 0) st_real = 0;
                		unsticktop.css({"margin-top":"-"+st_real+"px"});
					}
					else
					{
                		unsticktop.css({"margin-top":"-"+topbar_height+"px"});
					}
            	}
                
                if(transparent)
                {	
                	if(st > 50)
                	{	
                		//header.removeClass('av_header_transparency');
                		av_change_class(header, 'remove', 'av_header_transparency');
                	}
                	else
                	{
                		//header.addClass('av_header_transparency');
                		av_change_class(header, 'add', 'av_header_transparency');
                	}
                }

               
            };

            if($('body').is('.avia_deactivate_menu_resize')) shrinking = false;
            
            if(!transparent && !shrinking && !unsticktop.length) return;
            
			win.on( 'debouncedresize',  function(){ el_height = $(elements).attr('style',"").filter(':first').height(); set_height(); } );
            win.on( 'scroll',  function(){ window.requestAnimationFrame( set_height )} );
            set_height();
    }


})(jQuery);




;/* 
 * This file holds javascript functions needed in frontend for the functionallity of the Google Maps widgets and shortcodes
 * Handles conditional loading of Google API script.
 *
 * @author		Christian "Kriesi" Budschedl
 * @copyright	Copyright ( c ) Christian Budschedl
 * @link		http://kriesi.at
 * @link		http://aviathemes.com
 * @since		Version 1.0
 * @package 	AviaFramework
 * 
 */

"use strict";

/**
 * Avia Google Maps in frontend
 */
(function($)
{
	var objAviaGoogleMaps = null;
	
	var AviaGoogleMaps = function(){
		
		if( 'undefined' == typeof window.av_google_map || 'undefined' == typeof avia_framework_globals )
		{
			return;
		}
		
		if( objAviaGoogleMaps != null )
		{
			return;
		}
		
		objAviaGoogleMaps = this;
		
		this.document = $( document );
		this.script_loading = false;
		this.script_loaded = false;
		this.script_source = avia_framework_globals.gmap_avia_api;
		this.maps = {};
		this.loading_icon_html = '<div class="ajax_load"><span class="ajax_load_inner"></span></div>';
		
		this.LoadAviaMapsAPIScript();
	};
	
	AviaGoogleMaps.prototype = {
		
		LoadAviaMapsAPIScript: function()
		{
			this.maps = $('body').find( '.avia-google-map-container' );
			if( this.maps.length == 0 )
			{
				return;
			}
			
			//	Check if we need to load the api or we have only links to Google Maps page
			var needToLoad = false;
			this.maps.each(function( index ) {
						var container = $(this);
						if( container.hasClass('av_gmaps_show_unconditionally') || container.hasClass('av_gmaps_show_delayed') )
						{
							needToLoad = true;
							return false;
						}
					});
					
			if( ! needToLoad )
			{
				return;
			}
			
			//check if maps are disabled by user setting via cookie. 
			if(document.cookie.match(/aviaPrivacyGoogleMapsDisabled/))
			{
				$('.av_gmaps_main_wrap').addClass('av-maps-user-disabled');
				return;
			}
			
			//	Check if our API already loaded
			if( typeof $.AviaMapsAPI != 'undefined' )
			{
				this.AviaMapsScriptLoaded();
				return;
			}
			
			$('body').on( 'avia-google-maps-api-script-loaded', $.proxy( this.AviaMapsScriptLoaded, this ));
			
			this.script_loading = true;
			
			var script 	= document.createElement('script');
					script.id = 'avia-gmaps-api-script';
					script.type = 'text/javascript';	
					script.src 	= this.script_source;

      		document.body.appendChild(script);
		},
		
		AviaMapsScriptLoaded: function()
		{
			this.script_loading = false;
			this.script_loaded = true;
			
			var object = this;
			
			// Now we bind maps with AviaMapsAPI via aviaMaps
			this.maps.each(function( index ) {
						var container = $(this);
						
						if( container.hasClass('av_gmaps_show_page_only') )
						{
							return;
						}
						
						var mapid = container.data('mapid');
						
						//	skip container if no map info found
						if( 'undefined' == typeof window.av_google_map[mapid] )
						{
							console.log( 'Map cannot be displayed because no info: ' + mapid);
							return;
						}
						
						if( container.hasClass('av_gmaps_show_unconditionally') )
						{
							container.aviaMaps();
//							container.removeClass('av_gmaps_show_unconditionally');
						}
						else if( container.hasClass('av_gmaps_show_delayed') )
						{
							var wrap = container.closest('.av_gmaps_main_wrap');
							var confirm = wrap.find('a.av_text_confirm_link');
							
							confirm.on('click', object.AviaMapsLoadConfirmed );
						}
						else
						{
							console.log( 'Map cannot be displayed because missing display class: ' + mapid);
						}
					});
		},
		
		AviaMapsLoadConfirmed: function( event )
		{
			event.preventDefault();
			
			var confirm = $(this);
			var container = confirm.closest('.av_gmaps_main_wrap').find('.avia-google-map-container');
			container.aviaMaps();
		}
	};
	
	$(function()
	{
		new AviaGoogleMaps();
 	});
	
})(jQuery);	 ;