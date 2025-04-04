/*
	07.02.2025
*/

  var mskpda = null;
  
  
  jQuery(document).ready(function(){
  mskpda = (function(window,document,$,undefined){
  
    // Musikipedia variables
    var $win = $(window);
    var $dom = $(document);
    var $body = jQuery(document.body);
    var lastScrollPosition = $win.scrollTop();
    var app = {};
    var Cookies = window.Cookies;
  
    app.settings = {
        "menuMaxWidth"  : 992,
        "isMobile" : /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent),
        "isAppleDevice" : /iPhone|iPad|iPod/i.test(window.navigator.userAgent),
        "popUpActive" : ($('.popup-active').length ? true : false),
        "originalScroll" : 0
    };
  
    // Functions
    var fn = {
  
        // Utility
  
        toggleButtonContentUniversal: function (buttonElement, text) {
            var buttonActive = buttonElement.classList.contains('active');
  
            if (buttonActive) {
                text ? buttonElement.firstElementChild.innerHTML = text.default : null;
                buttonElement.classList.remove('active');
  
            } else {
                text ? buttonElement.firstElementChild.innerHTML = text.active : null;
                buttonElement.classList.add('active');
            }
        },
  
        toggleContentHeight: function (buttonElement, hiddenElememt) {
            // debugger;
            // console.log('toggleContentHeight');
            if ( buttonElement.classList.contains('active') ) {
                var contentHeight = hiddenElememt.firstElementChild.offsetHeight;
                hiddenElememt.style.height = contentHeight + 'px';
            } else {
                hiddenElememt.style.height = '0px';
            }
        },
  
        methodsExists: function(methods, object)
        {
            if(object === undefined || methods === undefined){
                return false;
            } else {
  
                var multiple = (typeof methods === 'string' ? false : true);
  
                if(!multiple){
                    methods = [methods];
                }
  
                for(var i = 0; i < methods.length; i++){
                    if(object[methods[i]] === undefined){
                        return false;
                    }
                }
                return true;
            }
        },
  
        debug: function(value, prefix)
        {
            var methods = ['log', 'dir'];
  
            if(fn.methodsExists(methods, window.console)){
  
                if(typeof prefix === 'string'){
                    window.console.log(prefix);
                }
  
                switch(typeof value){
                    case 'string':
                        window.console.log(value);
                        break;
  
                    default:
                        window.console.dir(value);
                        break;
                }
            }
  
            return;
        },
  
        randomInt: function(min, max)
        {
            return Math.floor(Math.random() * (max-min+1) ) + min;
        },
  
        scrollingUp: function(position)
        {
            var scrollingUp = false;
            if(position < lastScrollPosition){
                scrollingUp = true;
            }
            console.log(lastScrollPosition);
            lastScrollPosition = position;
            return scrollingUp;
        },
/*
         scrollToBlock: function($block) 
         {
             jQuery('html').animate({
                 scrollTop: $block.offset().top
             });
         },
*/  
        removeModal: function(ev)
        {
            ev.preventDefault();
            $('.modal').remove();
        },
  
        mobMenuInit: function($mobNav)
        {
            var $mobMenu = $mobNav.find('.mobile__menu');
            var $activeMenuItem = $('.mobile_menu__item.current');
            $activeMenuItem.parents('.mobile_menu__item').addClass('active');
 
            $mobMenu.find('.active > ul').show();
            $mobMenu.find('.active > .mobile_submenu__toggle .fa-angle-down').removeClass('fa-angle-down').addClass('fa-angle-up');
  
        },
  
        mobMenuShow: function($mobNav)
        {
            $body.addClass('menu-mobile-active');
            $mobNav.find('.menu_toggle__open').removeClass('menu_toggle__open').addClass('menu_toggle__close');
            $mobNav.find('.mobile__menu').slideDown();
  
            $mobNav.parent().find('.navigation__account').removeClass('arrow');
            $mobNav.parent().parent().find('.navigation__account__menu').stop().slideUp();
  
            $mobNav.parent().find('.mobile__search').removeClass('arrow');
            $mobNav.parent().parent().find('.mobile__searchfield').stop().slideUp();
        },
  
        mobMenuHide: function($mobNav)
        {
            $body.removeClass('menu-mobile-active');
            $mobNav.find('.menu_toggle__close').removeClass('menu_toggle__close').addClass('menu_toggle__open');
            $mobNav.find('.mobile__menu').slideUp();
        },
  
        mobMenuToggle: function()
        {
            var $mobNav = $('#navigation-mobile');
            if($body.hasClass('menu-mobile-active')){
                fn.mobMenuHide($mobNav);
            } else {
                fn.mobMenuShow($mobNav);
            }
        },
  
        mobSubmenuShow: function($menuItem)
        {
            var $submenu = $menuItem.children('.nav-child');
            var $toggleIcon = $menuItem.children('.mobile_submenu__toggle').children();
            var $siblings = $menuItem.siblings('.parent.active');
  
            $menuItem.addClass('active');
            $submenu.slideDown();
            $toggleIcon.removeClass('fa-angle-down').addClass('fa-angle-up');
  
            for(var i = 0; i < $siblings.length; i++){
                fn.mobSubmenuHide($siblings.eq(i));
            }
        },
  
        mobSubmenuHide: function($menuItem)
        {
            var $submenu = $menuItem.children('.nav-child');
            var $toggleIcon = $menuItem.children('.mobile_submenu__toggle').children();
            var $submenuChildren = $submenu.find('.parent.active');
  
            $menuItem.removeClass('active');
            $submenu.slideUp();
            $toggleIcon.removeClass('fa-angle-up').addClass('fa-angle-down');
  
            for(var i = 0; i < $submenuChildren.length; i++){
                fn.mobSubmenuHide($submenuChildren.eq(i));
            }
        },
  
        mobSubmenuToggle: function($menuItem)
        {
            if($menuItem.hasClass('active')){
                fn.mobSubmenuHide($menuItem);
            } else {
                fn.mobSubmenuShow($menuItem);
            }
        },
  
        mobMenuClick: function(ev)
        {
            var langButton = jQuery('#navigation-mobile .current-lang');
            var mobileLangMenu = document.querySelector('.navigation__mobile .lang-menu');
  
            if ( langButton.hasClass('active') ) {
                document.body.classList.remove('lang-open');
                fn.toggleButtonContentUniversal(langButton[0]);
                fn.toggleContentHeight(langButton[0], mobileLangMenu.firstElementChild);
            }
            ev.preventDefault();
            fn.mobMenuToggle();
        },
  
        mobSubmenuClick: function(ev)
        {
            ev.preventDefault();
            var $menuItem = $(this).parent();
  
            fn.mobSubmenuToggle($menuItem);
        },
  
        isDesktop: function()
        {
            return $win.width() >= 991;
        },
  
        customCheckbox: function()
        {
            var checkBox = $('input[type="checkbox"]');
            $(checkBox).each(function(){
                $(this).wrap( "<span class='custom-checkbox'></span>" );
                if($(this).is(':checked')){
                    $(this).parent().addClass("selected");
                }
            });
            $(checkBox).click(function(){
                $(this).parent().toggleClass("selected");
            });
        },
  
        smoothScroll: function()
        {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
                var hash = this.hash;
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    if (fn.isDesktop()) {
                        $('html,body').animate({
                            scrollTop: target.offset().top-10
                        }, 1000, function() {window.location.hash = hash});
                    } else {
                        $('html,body').animate({
                            scrollTop: target.offset().top-90
                        }, 1000);
                    }
                    return false;
                }
            }
        },
  
        winScrollDelayed: function()
        {
            if(window.didScroll){
                window.didScroll = false;
            }
        },
  
        winScroll: function()
        {
            window.didScroll = true;
        },

        // doChosenField: function(selector) {
        //     console.log('do chosen');
        //     $(selector).chosen({disable_search_threshold: 10});
        // },

        // create user page (/signup)
        onAgeChange: function() 
        {
            var $ageSelect = $('#jform_age'),
                $parentInputEmail = $('#jform_email1-parent'),
                $parentEmailBlock = $('#parentEmailBox');
                
			function isCorrectAge(t)
			{
				var userAge = parseInt($(t).val()),
					minAge = parseInt( $(t).data("age") );
						
				return ( isNaN(userAge) || !userAge || userAge > minAge ) ? true : false;
			};
            
			function showParentEmailBox(t)
			{
				if( isCorrectAge(t) )
				{
					$parentEmailBlock.slideUp();
					$parentInputEmail.attr("disabled", !0);

					return;	
				};
					
				$parentEmailBlock.slideDown();
				$parentInputEmail.attr("disabled", !1);	
			};
						
            $ageSelect.on('keyup', function(e) {
                
					if( isCorrectAge(this) )
					{
						$parentEmailBlock.slideUp();
						$parentInputEmail.attr("disabled", !0);

						return;	
					};

					setTimeout( showParentEmailBox, 1500, this);
            });
		},
		
        
		isCorrectEmail: function(str) 
		{
			 return !!str;
		},

        initCustomTitles: function() {
            var customTitles = $('.info-title');

            for(let i = 0; i < customTitles.length; i++) {        
                var title = $(customTitles[i]).data('title'); 

                new Opentip(customTitles[i], title, {
                    tipJoint: "top",
                    background: "#fff",
                    borderRadius: 0,
                    borderColor: "#ebebeb",
                    fixed: true,
                    target: true,
                });
            }
        },

        initCustomTitles2: function() {
            var customTitles = $('.info-badge');

            for(let i = 0; i < customTitles.length; i++) {        
                var title = $(customTitles[i]).data('ot'); 

                new Opentip(customTitles[i], title, {
                    tipJoint: "top",
                    background: "#fff",
                    borderRadius: 0,
                    borderColor: "#ebebeb",
                    fixed: true,
                    target: true,
                });
            }
        },

        changeLocationHref: function()
        {
            var href = window.location.href;
            if (href.includes('#_=_')) {
                href = href.replace('#_=_', '');
                history.pushState({param: 'Value'}, '', href);
            }
        },

        initFirefoxStyle: function() {
            console.log('initFirefoxStyle');
        /*    jQuery('.form-select').css({
                'padding': 0,
                'text-indent': '6px',
            });
         */   
        },
  
        domReady: function()
        {
      //      fn.debug('DOM Ready');
  
            var settings = app.settings;
            if(settings.isMobile){
                $body.addClass('is-mobile');
            } else {
                $body.addClass('is-desktop');
            }
  
            // General variables
            // var position = $win.scrollTop();
  
            // elements used on musikipedia
            var $mobNav = $('#navigation-mobile');
            // var $customRadio = $('#questions');
  
            // Mobile Menu initialization
            fn.mobMenuInit($mobNav);
  
            // Mobile Menu Click Event
            $mobNav.find('.mobile_menu__toggle').click(fn.mobMenuClick);
  
            // Mobile Submenu Click Event
            $mobNav.find('.mobile_submenu__toggle').click(fn.mobSubmenuClick);
            $mobNav.find('.mobile_menu__item.deeper > a').click(fn.mobSubmenuClick);
  
            // custom checkbox and radiobuttons
            fn.customCheckbox();
            // fn.customRadioButton($customRadio);
  
            // audioplayer
            $('audio').audioPlayer();
  
            $('.navigation__account').click(function(){
  
                var $search = $(this).siblings('.mobile__search');
  
                if($body.hasClass('menu-mobile-active') || $search.hasClass('arrow')){
                    fn.mobMenuHide($mobNav);
                    $(this).parent().find('.mobile__search').removeClass('arrow');
                    $(this).parent().parent().find('.mobile__searchfield').stop().slideUp();
                }
  
                if (!$(this).hasClass('arrow')) {
                    $(this).parent().parent().find('.navigation__account__menu').stop().slideDown();
                    $(this).addClass('arrow');
                }
                else {
                    $(this).removeClass('arrow');
                    $(this).parent().parent().find('.navigation__account__menu').stop().slideUp();
                }
            });
  
            $('.sdata').each(function(){
                var $sdata = $(this);
  
                $sdata.text($sdata.attr('title'));
            });
  
            // $('.registration__controls').find('.button').click(function(){
            //     $('html,body').animate({
            //         scrollTop: 0
            //     }, 1000);
            // });

        //     onAgeChange: function() 
        // {
        //     var $ageSelect = $('#jform_age'),
        //         $isParentEmail = $('.isParentEmail');
        //     console.log($ageSelect);
            
        //     $ageSelect.on('change', function(e) {
        //         var $ageSelectVal = $(this).val();
        //         console.log($ageSelectVal);
        //     })
        // },
            if (navigator.userAgent.indexOf("Firefox") != -1) {
        //        console.log(navigator.userAgent.indexOf("Firefox") != -1);
                fn.initFirefoxStyle();
            }
            
            if ( $('#jform_age').length ) {
                fn.onAgeChange();
            }

            fn.changeLocationHref();
            fn.initCustomTitles();
            fn.initCustomTitles2();

            $win.scroll(fn.winScroll);
            setInterval(fn.winScrollDelayed, 100);
  
  			$('#parentEmailBox').hide();
        },
  
        imgReady: function()
        {
    //        fn.debug('IMG Ready');
        }
    };
  
    // DOM Ready
    $dom.ready(fn.domReady);
  
    // IMG Ready
    $win.on('load', fn.imgReady);
  
    return fn;
  
  }(window,document,jQuery));
  });
  
  
  
  // ---------from Zleksikon.js-----------
  jQuery( document ).ready(function() {
  
    // =======================
  
    var $body = jQuery(document.body);
    var $mobNav = jQuery('#navigation-mobile');
    var mobileLangMenuButton = document.querySelector('.navigation__mobile .lang_button .current-lang');
    var mobileLangMenu = document.querySelector('.navigation__mobile .lang-menu');
    
    $body.on('click', function(e) {
        
        if ($body.hasClass("lang-open")) {

            var $target = jQuery(e.target);
            
            while ($target.prop("tagName") != "BODY") {
                if ($target.hasClass("current-lang")) {
                    return;
                }
                $target = $target.parent();
            }

            mskpda.toggleButtonContentUniversal(mobileLangMenuButton);
            mobileLangMenuButton.classList.contains('active') ?
                document.body.classList.add('lang-open') : document.body.classList.remove('lang-open');
            mskpda.toggleContentHeight(mobileLangMenuButton, mobileLangMenu.firstElementChild);
            
        }
    });
  
    if (mobileLangMenuButton) {
        mobileLangMenuButton.onclick = function(e) {

            // console.log(e);
  
            if($body.hasClass('menu-mobile-active')){
                mskpda.mobMenuHide($mobNav);
            }
  
            mskpda.toggleButtonContentUniversal(this);
            mobileLangMenuButton.classList.contains('active') ?
                document.body.classList.add('lang-open') : document.body.classList.remove('lang-open');
            mskpda.toggleContentHeight(this, mobileLangMenu.firstElementChild);
        }
    }

    /**
     * Contact page scroll to message box
     */
    (function() {
        if ( ! jQuery('#contact').length ) return;
         
        jQuery('#contact .button[type=submit]').on('click', function() {
            // mskpda.scrollToBlock(jQuery('#system-message-container'));
            jQuery("html, body").animate(
            {
                scrollTop: 0
            }, 100);
        });
    })();
  });
  
     /**
     * Audioplayer
     */
;(function( $, window, document, undefined )
{
	var isTouch		  = 'ontouchstart' in window,
		eStart		  = isTouch ? 'touchstart'	: 'mousedown',
		eMove		  = isTouch ? 'touchmove'	: 'mousemove',
		eEnd		  = isTouch ? 'touchend'	: 'mouseup',
		eCancel		  = isTouch ? 'touchcancel'	: 'mouseup',
		secondsToTime = function( secs )
		{
			var hours = Math.floor( secs / 3600 ), minutes = Math.floor( secs % 3600 / 60 ), seconds = Math.ceil( secs % 3600 % 60 );
			return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
		},
		canPlayType	  = function( file )
		{
			var audioElement = document.createElement( 'audio' );
			return !!( audioElement.canPlayType && audioElement.canPlayType( 'audio/' + file.split( '.' ).pop().toLowerCase() + ';' ).replace( /no/, '' ) );
		};

	$.fn.audioPlayer = function( params )
	{
		var params		= $.extend( { classPrefix: 'audioplayer', strPlay: 'Play', strPause: 'Pause' }, params ),
			cssClass	= {},
			cssClassSub =
			{
				playPause:	 	'playpause',
				playing:		'playing',
				time:		 	'time',
				timeCurrent:	'time-current',
				timeDuration: 	'time-duration',
				bar: 			'bar',
				barLoaded:		'bar-loaded',
				barPlayed:		'bar-played',
				mute: 			'mute',
				mini: 			'mini'
			};

		for( var subName in cssClassSub )
			cssClass[ subName ] = params.classPrefix + '-' + cssClassSub[ subName ];

		this.each( function()
		{
			if( $( this ).prop( 'tagName' ).toLowerCase() != 'audio' )
				return false;

			var $this	   = $( this ),
				audioFile  = $this.attr( 'src' ),
				isAutoPlay = $this.get( 0 ).getAttribute( 'autoplay' ), isAutoPlay = isAutoPlay === '' || isAutoPlay === 'autoplay' ? true : false,
				isLoop	   = $this.get( 0 ).getAttribute( 'loop' ),		isLoop	   = isLoop		=== '' || isLoop	 === 'loop'		? true : false,
				isSupport  = false;

			if( typeof audioFile === 'undefined' )
			{
				$this.find( 'source' ).each( function()
				{
					audioFile = $( this ).attr( 'src' );
					if( typeof audioFile !== 'undefined' && canPlayType( audioFile ) )
					{
						isSupport = true;
						return false;
					}
				});
			}
			else if( canPlayType( audioFile ) ) isSupport = true;

			var thePlayer = $( '<div class="' + params.classPrefix + '">' + ( isSupport ? $( '<div>' ).append( $this.eq( 0 ).clone() ).html() : '<embed src="' + audioFile + '" width="0" height="0" volume="100" autostart="' + isAutoPlay.toString() +'" loop="' + isLoop.toString() + '" />' ) + '<div class="' + cssClass.playPause + '" title="' + params.strPlay + '"><a href="#">' + params.strPlay + '</a></div></div>' ),
				theAudio  = isSupport ? thePlayer.find( 'audio' ) : thePlayer.find( 'embed' ), theAudio = theAudio.get( 0 );

			if( isSupport )
			{
				thePlayer.find( 'audio' ).css( { 'width': 0, 'height': 0, 'visibility': 'hidden' } );
				thePlayer.append( '<div class="' + cssClass.time + ' ' + cssClass.timeCurrent + '"></div><div class="' + cssClass.bar + '"><div class="' + cssClass.barLoaded + '"></div><div class="' + cssClass.barPlayed + '"></div></div><div class="' + cssClass.time + ' ' + cssClass.timeDuration + '"></div>' );

				var theBar			  = thePlayer.find( '.' + cssClass.bar ),
					barPlayed	 	  = thePlayer.find( '.' + cssClass.barPlayed ),
					barLoaded	 	  = thePlayer.find( '.' + cssClass.barLoaded ),
					timeCurrent		  = thePlayer.find( '.' + cssClass.timeCurrent ),
					timeDuration	  = thePlayer.find( '.' + cssClass.timeDuration ),
					adjustCurrentTime = function( e )
					{
						theRealEvent		 = isTouch ? e.originalEvent.touches[ 0 ] : e;
						theAudio.currentTime = Math.round( ( theAudio.duration * ( theRealEvent.pageX - theBar.offset().left ) ) / theBar.width() );
					},
					updateLoadBar = function()
					{
                        if (isNaN(theAudio.duration)) {
                            barLoaded.width( '0%' );
                        } else {
    						barLoaded.width( ( theAudio.buffered.end( 0 ) / theAudio.duration ) * 100 + '%' );
    				    }
					};

				timeDuration.html( '&hellip;' );
				timeCurrent.text( secondsToTime( 0 ) );

				theAudio.addEventListener( 'loadeddata', function()
				{
					timeDuration.text( secondsToTime( theAudio.duration ) );
				});

				theAudio.addEventListener( 'timeupdate', function()
				{
					timeCurrent.text( secondsToTime( theAudio.currentTime ) );
					barPlayed.width( ( theAudio.currentTime / theAudio.duration ) * 100 + '%' );
				});

				theAudio.addEventListener( 'progress', updateLoadBar );

				theAudio.addEventListener( 'ended', function()
				{
					thePlayer.removeClass( cssClass.playing );
				});

				theBar.on( eStart, function( e )
				{
					adjustCurrentTime( e );
					theBar.on( eMove, function( e ) { adjustCurrentTime( e ); } );
				})
				.on( eCancel, function()
				{
					theBar.unbind( eMove );
				});
			}
			else thePlayer.addClass( cssClass.mini );

			if( isAutoPlay ) thePlayer.addClass( cssClass.playing );

			thePlayer.find( '.' + cssClass.playPause ).on( 'click', function()
			{
				if( thePlayer.hasClass( cssClass.playing ) )
				{
					$( this ).attr( 'title', params.strPlay ).find( 'a' ).html( params.strPlay );
					thePlayer.removeClass( cssClass.playing );
					isSupport ? theAudio.pause() : theAudio.Stop();
				}
				else
				{
					$( this ).attr( 'title', params.strPause ).find( 'a' ).html( params.strPause );
					thePlayer.addClass( cssClass.playing );
					isSupport ? theAudio.play() : theAudio.Play();
				}
				return false;
			});

			$this.replaceWith( thePlayer );
		});
		return this;
	};
})( jQuery, window, document );

/*
Opentip v2.4.6
Full version see ../scripts/tooltip/opentip-native-excanvas.js
*/
var Opentip,firstAdapter,i,mouseMoved,mousePosition,mousePositionObservers,position,vendors,_i,_len,_ref,__slice=[].slice,__indexOf=[].indexOf||function(t){for(var e=0,i=this.length;e<i;e++)if(e in this&&this[e]===t)return e;return-1},__hasProp={}.hasOwnProperty;for(Opentip=function(){function t(e,i,o,s){var n,r,a,h,l,p,d,u,c,f,g,m,v,_,y=this;if(this.id=++t.lastId,this.debug("Creating Opentip."),t.tips.push(this),this.adapter=t.adapter,(n=this.adapter.data(e,"opentips")||[]).push(this),this.adapter.data(e,"opentips",n),this.triggerElement=this.adapter.wrap(e),this.triggerElement.length>1)throw new Error("You can't call Opentip on multiple elements.");if(this.triggerElement.length<1)throw new Error("Invalid element.");for(this.loaded=!1,this.loading=!1,this.visible=!1,this.waitingToShow=!1,this.waitingToHide=!1,this.currentPosition={left:0,top:0},this.dimensions={width:100,height:50},this.content="",this.redraw=!0,this.currentObservers={showing:!1,visible:!1,hiding:!1,hidden:!1},s=this.adapter.clone(s),"object"==typeof i?(s=i,i=o=void 0):"object"==typeof o&&(s=o,o=void 0),null!=o&&(s.title=o),null!=i&&this.setContent(i),null==s.extends&&(null!=s.style?s.extends=s.style:s.extends=t.defaultStyle),h=[s],_=s;_.extends;){if(p=_.extends,null==(_=t.styles[p]))throw new Error("Invalid style: "+p);h.unshift(_),null==_.extends&&"standard"!==p&&(_.extends="standard")}for((s=(g=this.adapter).extend.apply(g,[{}].concat(__slice.call(h)))).hideTriggers=function(){var t,e,i,o;for(o=[],t=0,e=(i=s.hideTriggers).length;t<e;t++)r=i[t],o.push(r);return o}(),s.hideTrigger&&0===s.hideTriggers.length&&s.hideTriggers.push(s.hideTrigger),d=0,c=(m=["tipJoint","targetJoint","stem"]).length;d<c;d++)s[l=m[d]]&&"string"==typeof s[l]&&(s[l]=new t.Joint(s[l]));for(!s.ajax||!0!==s.ajax&&s.ajax||("A"===this.adapter.tagName(this.triggerElement)?s.ajax=this.adapter.attr(this.triggerElement,"href"):s.ajax=!1),"click"===s.showOn&&"A"===this.adapter.tagName(this.triggerElement)&&this.adapter.observe(this.triggerElement,"click",function(t){return t.preventDefault(),t.stopPropagation(),t.stopped=!0}),s.target&&(s.fixed=!0),!0===s.stem&&(s.stem=new t.Joint(s.tipJoint)),!0===s.target?s.target=this.triggerElement:s.target&&(s.target=this.adapter.wrap(s.target)),this.currentStem=s.stem,null==s.delay&&(s.delay="mouseover"===s.showOn?.2:0),null==s.targetJoint&&(s.targetJoint=new t.Joint(s.tipJoint).flip()),this.showTriggers=[],this.showTriggersWhenVisible=[],this.hideTriggers=[],s.showOn&&"creation"!==s.showOn&&this.showTriggers.push({element:this.triggerElement,event:s.showOn}),null!=s.ajaxCache&&(s.cache=s.ajaxCache,delete s.ajaxCache),this.options=s,this.bound={},u=0,f=(v=["prepareToShow","prepareToHide","show","hide","reposition"]).length;u<f;u++)a=v[u],this.bound[a]=function(t){return function(){return y[t].apply(y,arguments)}}(a);this.adapter.domReady(function(){if(y.activate(),"creation"===y.options.showOn)return y.prepareToShow()})}return t.prototype.STICKS_OUT_TOP=1,t.prototype.STICKS_OUT_BOTTOM=2,t.prototype.STICKS_OUT_LEFT=1,t.prototype.STICKS_OUT_RIGHT=2,t.prototype.class={container:"opentip-container",opentip:"opentip",header:"ot-header",content:"ot-content",loadingIndicator:"ot-loading-indicator",close:"ot-close",goingToHide:"ot-going-to-hide",hidden:"ot-hidden",hiding:"ot-hiding",goingToShow:"ot-going-to-show",showing:"ot-showing",visible:"ot-visible",loading:"ot-loading",ajaxError:"ot-ajax-error",fixed:"ot-fixed",showEffectPrefix:"ot-show-effect-",hideEffectPrefix:"ot-hide-effect-",stylePrefix:"style-"},t.prototype._setup=function(){var t,e,i,o,s,n,r,a,h,l,p;for(this.debug("Setting up the tooltip."),this._buildContainer(),this.hideTriggers=[],o=s=0,r=(h=this.options.hideTriggers).length;s<r;o=++s){if(e=h[o],i=null,t=this.options.hideOn instanceof Array?this.options.hideOn[o]:this.options.hideOn,"string"==typeof e)switch(e){case"trigger":t=t||"mouseout",i=this.triggerElement;break;case"tip":t=t||"mouseover",i=this.container;break;case"target":t=t||"mouseover",i=this.options.target;break;case"both":t=t||"mouseout",i=this.triggerElement,hideTriggerElement2=this.container;break;case"closeButton":break;default:throw new Error("Unknown hide trigger: "+e+".")}else t=t||"mouseover",i=this.adapter.wrap(e);i&&this.hideTriggers.push({element:i,event:t,original:e}),hideTriggerElement2&&this.hideTriggers.push({element:hideTriggerElement2,event:t,original:e})}for(p=[],n=0,a=(l=this.hideTriggers).length;n<a;n++)e=l[n],p.push(this.showTriggersWhenVisible.push({element:e.element,event:"mouseover"}));return p},t.prototype._buildContainer=function(){if(this.container=this.adapter.create('<div id="opentip-'+this.id+'" class="'+this.class.container+" "+this.class.hidden+" "+this.class.stylePrefix+this.options.className+'"></div>'),this.adapter.css(this.container,{position:"absolute"}),this.options.ajax&&this.adapter.addClass(this.container,this.class.loading),this.options.fixed&&this.adapter.addClass(this.container,this.class.fixed),this.options.showEffect&&this.adapter.addClass(this.container,""+this.class.showEffectPrefix+this.options.showEffect),this.options.hideEffect)return this.adapter.addClass(this.container,""+this.class.hideEffectPrefix+this.options.hideEffect)},t.prototype._buildElements=function(){var t,e;return this.tooltipElement=this.adapter.create('<div class="'+this.class.opentip+'"><div class="'+this.class.header+'"></div><div class="'+this.class.content+'"></div></div>'),this.backgroundCanvas=this.adapter.wrap(document.createElement("canvas")),this.adapter.css(this.backgroundCanvas,{position:"absolute"}),"undefined"!=typeof G_vmlCanvasManager&&null!==G_vmlCanvasManager&&G_vmlCanvasManager.initElement(this.adapter.unwrap(this.backgroundCanvas)),t=this.adapter.find(this.tooltipElement,"."+this.class.header),this.options.title&&(e=this.adapter.create("<h1></h1>"),this.adapter.update(e,this.options.title,this.options.escapeTitle),this.adapter.append(t,e)),this.options.ajax&&!this.loaded&&this.adapter.append(this.tooltipElement,this.adapter.create('<div class="'+this.class.loadingIndicator+'"><span>?</span></div>')),__indexOf.call(this.options.hideTriggers,"closeButton")>=0&&(this.closeButtonElement=this.adapter.create('<a href="javascript:undefined;" class="'+this.class.close+'"><span>Close</span></a>'),this.adapter.append(t,this.closeButtonElement)),this.adapter.append(this.container,this.backgroundCanvas),this.adapter.append(this.container,this.tooltipElement),this.adapter.append(document.body,this.container),this._newContent=!0,this.redraw=!0},t.prototype.setContent=function(t){if(this.content=t,this._newContent=!0,"function"==typeof this.content?(this._contentFunction=this.content,this.content=""):this._contentFunction=null,this.visible)return this._updateElementContent()},t.prototype._updateElementContent=function(){var t;return(this._newContent||!this.options.cache&&this._contentFunction)&&(null!=(t=this.adapter.find(this.container,"."+this.class.content))&&(this._contentFunction&&(this.debug("Executing content function."),this.content=this._contentFunction(this)),this.adapter.update(t,this.content,this.options.escapeContent)),this._newContent=!1),this._storeAndLockDimensions(),this.reposition()},t.prototype._storeAndLockDimensions=function(){var t;if(this.container)return t=this.dimensions,this.adapter.css(this.container,{width:"auto",left:"0px",top:"0px"}),this.dimensions=this.adapter.dimensions(this.container),this.dimensions.width+=1,this.adapter.css(this.container,{width:this.dimensions.width+"px",top:this.currentPosition.top+"px",left:this.currentPosition.left+"px"}),this._dimensionsEqual(this.dimensions,t)?void 0:(this.redraw=!0,this._draw())},t.prototype.activate=function(){return this._setupObservers("hidden","hiding")},t.prototype.deactivate=function(){return this.debug("Deactivating tooltip."),this.hide(),this._setupObservers("-showing","-visible","-hidden","-hiding")},t.prototype._setupObservers=function(){var t,e,i,o,s,n,r,a,h,l,p,d,u,c,f,g,m=this;for(n=0,l=(o=1<=arguments.length?__slice.call(arguments,0):[]).length;n<l;n++)if(i=o[n],e=!1,"-"===i.charAt(0)&&(e=!0,i=i.substr(1)),this.currentObservers[i]!==!e)switch(this.currentObservers[i]=!e,t=function(){var t,i,o;return t=1<=arguments.length?__slice.call(arguments,0):[],e?(i=m.adapter).stopObserving.apply(i,t):(o=m.adapter).observe.apply(o,t)},i){case"showing":for(r=0,p=(c=this.hideTriggers).length;r<p;r++)t((s=c[r]).element,s.event,this.bound.prepareToHide);t(null!=document.onresize?document:window,"resize",this.bound.reposition),t(window,"scroll",this.bound.reposition);break;case"visible":for(a=0,d=(f=this.showTriggersWhenVisible).length;a<d;a++)t((s=f[a]).element,s.event,this.bound.prepareToShow);break;case"hiding":for(h=0,u=(g=this.showTriggers).length;h<u;h++)t((s=g[h]).element,s.event,this.bound.prepareToShow);break;case"hidden":break;default:throw new Error("Unknown state: "+i)}return null},t.prototype.prepareToShow=function(){if(this._abortHiding(),this._abortShowing(),!this.visible)return this.debug("Showing in "+this.options.delay+"s."),null==this.container&&this._setup(),this.options.group&&t._abortShowingGroup(this.options.group,this),this.preparingToShow=!0,this._setupObservers("-hidden","-hiding","showing"),this._followMousePosition(),this.options.fixed&&!this.options.target&&(this.initialMousePosition=mousePosition),this.reposition(),this._showTimeoutId=this.setTimeout(this.bound.show,this.options.delay||0)},t.prototype.show=function(){var e=this;if(this._abortHiding(),!this.visible)return this._clearTimeouts(),this._triggerElementExists()?(this.debug("Showing now."),null==this.container&&this._setup(),this.options.group&&t._hideGroup(this.options.group,this),this.visible=!0,this.preparingToShow=!1,null==this.tooltipElement&&this._buildElements(),this._updateElementContent(),!this.options.ajax||this.loaded&&this.options.cache||this._loadAjax(),this._searchAndActivateCloseButtons(),this._startEnsureTriggerElement(),this.adapter.css(this.container,{zIndex:t.lastZIndex++}),this._setupObservers("-hidden","-hiding","-showing","-visible","showing","visible"),this.options.fixed&&!this.options.target&&(this.initialMousePosition=mousePosition),this.reposition(),this.adapter.removeClass(this.container,this.class.hiding),this.adapter.removeClass(this.container,this.class.hidden),this.adapter.addClass(this.container,this.class.goingToShow),this.setCss3Style(this.container,{transitionDuration:"0s"}),this.defer(function(){var t;if(e.visible&&!e.preparingToHide)return e.adapter.removeClass(e.container,e.class.goingToShow),e.adapter.addClass(e.container,e.class.showing),t=0,e.options.showEffect&&e.options.showEffectDuration&&(t=e.options.showEffectDuration),e.setCss3Style(e.container,{transitionDuration:t+"s"}),e._visibilityStateTimeoutId=e.setTimeout(function(){return e.adapter.removeClass(e.container,e.class.showing),e.adapter.addClass(e.container,e.class.visible)},t),e._activateFirstInput()}),this._draw()):this.deactivate()},t.prototype._abortShowing=function(){if(this.preparingToShow)return this.debug("Aborting showing."),this._clearTimeouts(),this._stopFollowingMousePosition(),this.preparingToShow=!1,this._setupObservers("-showing","-visible","hiding","hidden")},t.prototype.prepareToHide=function(){if(this._abortShowing(),this._abortHiding(),this.visible)return this.debug("Hiding in "+this.options.hideDelay+"s"),this.preparingToHide=!0,this._setupObservers("-showing","visible","-hidden","hiding"),this._hideTimeoutId=this.setTimeout(this.bound.hide,this.options.hideDelay)},t.prototype.hide=function(){var t=this;if(this._abortShowing(),this.visible&&(this._clearTimeouts(),this.debug("Hiding!"),this.visible=!1,this.preparingToHide=!1,this._stopEnsureTriggerElement(),this._setupObservers("-showing","-visible","-hiding","-hidden","hiding","hidden"),this.options.fixed||this._stopFollowingMousePosition(),this.container))return this.adapter.removeClass(this.container,this.class.visible),this.adapter.removeClass(this.container,this.class.showing),this.adapter.addClass(this.container,this.class.goingToHide),this.setCss3Style(this.container,{transitionDuration:"0s"}),this.defer(function(){var e;return t.adapter.removeClass(t.container,t.class.goingToHide),t.adapter.addClass(t.container,t.class.hiding),e=0,t.options.hideEffect&&t.options.hideEffectDuration&&(e=t.options.hideEffectDuration),t.setCss3Style(t.container,{transitionDuration:e+"s"}),t._visibilityStateTimeoutId=t.setTimeout(function(){if(t.adapter.removeClass(t.container,t.class.hiding),t.adapter.addClass(t.container,t.class.hidden),t.setCss3Style(t.container,{transitionDuration:"0s"}),t.options.removeElementsOnHide)return t.debug("Removing HTML elements."),t.adapter.remove(t.container),delete t.container,delete t.tooltipElement},e)})},t.prototype._abortHiding=function(){if(this.preparingToHide)return this.debug("Aborting hiding."),this._clearTimeouts(),this.preparingToHide=!1,this._setupObservers("-hiding","showing","visible")},t.prototype.reposition=function(){var t,e,i,o=this;if(null!=(t=this.getPosition())&&(e=this.options.stem,this.options.containInViewport&&(t=(i=this._ensureViewportContainment(t)).position,e=i.stem),!this._positionsEqual(t,this.currentPosition)))return this.options.stem&&!e.eql(this.currentStem)&&(this.redraw=!0),this.currentPosition=t,this.currentStem=e,this._draw(),this.adapter.css(this.container,{left:t.left+"px",top:t.top+"px"}),this.defer(function(){var t;return(t=o.adapter.unwrap(o.container)).style.visibility="hidden",t.offsetHeight,t.style.visibility="visible"})},t.prototype.getPosition=function(t,e,i){var o,s,n,r,a,h,l,p,d;if(this.container)return null==t&&(t=this.options.tipJoint),null==e&&(e=this.options.targetJoint),r={},this.options.target?(l=this.adapter.offset(this.options.target),h=this.adapter.dimensions(this.options.target),r=l,e.right?null!=(p=this.adapter.unwrap(this.options.target)).getBoundingClientRect?r.left=p.getBoundingClientRect().right+(null!=(d=window.pageXOffset)?d:document.body.scrollLeft):r.left+=h.width:e.center&&(r.left+=Math.round(h.width/2)),e.bottom?r.top+=h.height:e.middle&&(r.top+=Math.round(h.height/2)),this.options.borderWidth&&(this.options.tipJoint.left&&(r.left+=this.options.borderWidth),this.options.tipJoint.right&&(r.left-=this.options.borderWidth),this.options.tipJoint.top?r.top+=this.options.borderWidth:this.options.tipJoint.bottom&&(r.top-=this.options.borderWidth))):r=this.initialMousePosition?{top:this.initialMousePosition.y,left:this.initialMousePosition.x}:{top:mousePosition.y,left:mousePosition.x},this.options.autoOffset&&(n=(a=this.options.stem?this.options.stemLength:0)&&this.options.fixed?2:10,o=t.middle&&!this.options.fixed?15:0,s=t.center&&!this.options.fixed?15:0,t.right?r.left-=n+o:t.left&&(r.left+=n+o),t.bottom?r.top-=n+s:t.top&&(r.top+=n+s),a&&(null==i&&(i=this.options.stem),i.right?r.left-=a:i.left&&(r.left+=a),i.bottom?r.top-=a:i.top&&(r.top+=a))),r.left+=this.options.offset[0],r.top+=this.options.offset[1],t.right?r.left-=this.dimensions.width:t.center&&(r.left-=Math.round(this.dimensions.width/2)),t.bottom?r.top-=this.dimensions.height:t.middle&&(r.top-=Math.round(this.dimensions.height/2)),r},t.prototype._ensureViewportContainment=function(e){var i,o,s,n,r,a,h,l,p,d,u;if(s={position:e,stem:h=this.options.stem},!this.visible||!e)return s;if(!(l=this._sticksOut(e))[0]&&!l[1])return s;if(d=new t.Joint(this.options.tipJoint),this.options.targetJoint&&(p=new t.Joint(this.options.targetJoint)),a=this.adapter.scrollOffset(),u=this.adapter.viewportDimensions(),[e.left-a[0],e.top-a[1]],i=!1,u.width>=this.dimensions.width&&l[0])switch(i=!0,l[0]){case this.STICKS_OUT_LEFT:d.setHorizontal("left"),this.options.targetJoint&&p.setHorizontal("right");break;case this.STICKS_OUT_RIGHT:d.setHorizontal("right"),this.options.targetJoint&&p.setHorizontal("left")}if(u.height>=this.dimensions.height&&l[1])switch(i=!0,l[1]){case this.STICKS_OUT_TOP:d.setVertical("top"),this.options.targetJoint&&p.setVertical("bottom");break;case this.STICKS_OUT_BOTTOM:d.setVertical("bottom"),this.options.targetJoint&&p.setVertical("top")}return i?(this.options.stem&&(h=d),e=this.getPosition(d,p,h),n=!1,r=!1,(o=this._sticksOut(e))[0]&&o[0]!==l[0]&&(n=!0,d.setHorizontal(this.options.tipJoint.horizontal),this.options.targetJoint&&p.setHorizontal(this.options.targetJoint.horizontal)),o[1]&&o[1]!==l[1]&&(r=!0,d.setVertical(this.options.tipJoint.vertical),this.options.targetJoint&&p.setVertical(this.options.targetJoint.vertical)),n&&r?s:((n||r)&&(this.options.stem&&(h=d),e=this.getPosition(d,p,h)),{position:e,stem:h})):s},t.prototype._sticksOut=function(t){var e,i,o,s;return i=this.adapter.scrollOffset(),s=this.adapter.viewportDimensions(),o=[!1,!1],(e=[t.left-i[0],t.top-i[1]])[0]<0?o[0]=this.STICKS_OUT_LEFT:e[0]+this.dimensions.width>s.width&&(o[0]=this.STICKS_OUT_RIGHT),e[1]<0?o[1]=this.STICKS_OUT_TOP:e[1]+this.dimensions.height>s.height&&(o[1]=this.STICKS_OUT_BOTTOM),o},t.prototype._draw=function(){var e,i,o,s,n,r,a,h,l,p,d,u,c,f,g,m,v,_,y,w=this;if(this.backgroundCanvas&&this.redraw){if(this.debug("Drawing background."),this.redraw=!1,this.currentStem){for(g=0,m=(v=["top","right","bottom","left"]).length;g<m;g++)u=v[g],this.adapter.removeClass(this.container,"stem-"+u);this.adapter.addClass(this.container,"stem-"+this.currentStem.horizontal),this.adapter.addClass(this.container,"stem-"+this.currentStem.vertical)}return r=[0,0],a=[0,0],__indexOf.call(this.options.hideTriggers,"closeButton")>=0&&(n=new t.Joint("top right"===(null!=(_=this.currentStem)?_.toString():void 0)?"top left":"top right"),r=[this.options.closeButtonRadius+this.options.closeButtonOffset[0],this.options.closeButtonRadius+this.options.closeButtonOffset[1]],a=[this.options.closeButtonRadius-this.options.closeButtonOffset[0],this.options.closeButtonRadius-this.options.closeButtonOffset[1]]),o=this.adapter.clone(this.dimensions),s=[0,0],this.options.borderWidth&&(o.width+=2*this.options.borderWidth,o.height+=2*this.options.borderWidth,s[0]-=this.options.borderWidth,s[1]-=this.options.borderWidth),this.options.shadow&&(o.width+=2*this.options.shadowBlur,o.width+=Math.max(0,this.options.shadowOffset[0]-2*this.options.shadowBlur),o.height+=2*this.options.shadowBlur,o.height+=Math.max(0,this.options.shadowOffset[1]-2*this.options.shadowBlur),s[0]-=Math.max(0,this.options.shadowBlur-this.options.shadowOffset[0]),s[1]-=Math.max(0,this.options.shadowBlur-this.options.shadowOffset[1])),i={left:0,right:0,top:0,bottom:0},this.currentStem&&(this.currentStem.left?i.left=this.options.stemLength:this.currentStem.right&&(i.right=this.options.stemLength),this.currentStem.top?i.top=this.options.stemLength:this.currentStem.bottom&&(i.bottom=this.options.stemLength)),n&&(n.left?i.left=Math.max(i.left,a[0]):n.right&&(i.right=Math.max(i.right,a[0])),n.top?i.top=Math.max(i.top,a[1]):n.bottom&&(i.bottom=Math.max(i.bottom,a[1]))),o.width+=i.left+i.right,o.height+=i.top+i.bottom,s[0]-=i.left,s[1]-=i.top,this.currentStem&&this.options.borderWidth&&(y=this._getPathStemMeasures(this.options.stemBase,this.options.stemLength,this.options.borderWidth),f=y.stemLength,c=y.stemBase),(e=this.adapter.unwrap(this.backgroundCanvas)).width=o.width,e.height=o.height,this.adapter.css(this.backgroundCanvas,{width:e.width+"px",height:e.height+"px",left:s[0]+"px",top:s[1]+"px"}),(h=e.getContext("2d")).setTransform(1,0,0,1,0,0),h.clearRect(0,0,e.width,e.height),h.beginPath(),h.fillStyle=this._getColor(h,this.dimensions,this.options.background,this.options.backgroundGradientHorizontal),h.lineJoin="miter",h.miterLimit=500,d=this.options.borderWidth/2,this.options.borderWidth?(h.strokeStyle=this.options.borderColor,h.lineWidth=this.options.borderWidth):(f=this.options.stemLength,c=this.options.stemBase),null==c&&(c=0),p=function(t,e,i){if(i&&h.moveTo(Math.max(c,w.options.borderRadius,r[0])+1-d,-d),e)return h.lineTo(t/2-c/2,-d),h.lineTo(t/2,-f-d),h.lineTo(t/2+c/2,-d)},l=function(t,e,i){var o,s,n,a;return t?(h.lineTo(-c+d,0-d),h.lineTo(f+d,-f-d),h.lineTo(d,c-d)):e?(a=w.options.closeButtonOffset,n=r[0],i%2!=0&&(a=[a[1],a[0]],n=r[1]),o=Math.acos(a[1]/w.options.closeButtonRadius),s=Math.acos(a[0]/w.options.closeButtonRadius),h.lineTo(-n+d,-d),h.arc(d-a[0],-d+a[1],w.options.closeButtonRadius,-(Math.PI/2+o),s,!1)):(h.lineTo(-w.options.borderRadius+d,-d),h.quadraticCurveTo(d,-d,d,w.options.borderRadius-d))},h.translate(-s[0],-s[1]),h.save(),function(){var e,i,o,s,r,a,d,u,c,f,g;for(g=[],i=c=0,f=t.positions.length/2;0<=f?c<f:c>f;i=0<=f?++c:--c)r=2*i,a=0===i||3===i?0:w.dimensions.width,d=i<2?0:w.dimensions.height,u=Math.PI/2*i,o=i%2==0?w.dimensions.width:w.dimensions.height,s=new t.Joint(t.positions[r]),e=new t.Joint(t.positions[r+1]),h.save(),h.translate(a,d),h.rotate(u),p(o,s.eql(w.currentStem),0===i),h.translate(o,0),l(e.eql(w.currentStem),e.eql(n),i),g.push(h.restore())}(),h.closePath(),h.save(),this.options.shadow&&(h.shadowColor=this.options.shadowColor,h.shadowBlur=this.options.shadowBlur,h.shadowOffsetX=this.options.shadowOffset[0],h.shadowOffsetY=this.options.shadowOffset[1]),h.fill(),h.restore(),this.options.borderWidth&&h.stroke(),h.restore(),n?(w.options.closeButtonRadius,b="top right"===n.toString()?[(T=[w.dimensions.width-w.options.closeButtonOffset[0],w.options.closeButtonOffset[1]])[0]+d,T[1]-d]:[(T=[w.options.closeButtonOffset[0],w.options.closeButtonOffset[1]])[0]-d,T[1]-d],h.translate(b[0],b[1]),x=w.options.closeButtonCrossSize/2,h.save(),h.beginPath(),h.strokeStyle=w.options.closeButtonCrossColor,h.lineWidth=w.options.closeButtonCrossLineWidth,h.lineCap="round",h.moveTo(-x,-x),h.lineTo(x,x),h.stroke(),h.beginPath(),h.moveTo(x,-x),h.lineTo(-x,x),h.stroke(),h.restore(),w.adapter.css(w.closeButtonElement,{left:T[0]-x-w.options.closeButtonLinkOverscan+"px",top:T[1]-x-w.options.closeButtonLinkOverscan+"px",width:w.options.closeButtonCrossSize+2*w.options.closeButtonLinkOverscan+"px",height:w.options.closeButtonCrossSize+2*w.options.closeButtonLinkOverscan+"px"})):void 0;var b,x,T}},t.prototype._getPathStemMeasures=function(t,e,i){var o,s,n,r;if(n=i/2,o=2*(s=Math.atan(t/2/e)),(r=n+e-2*(n/Math.sin(o))*Math.cos(s))<0)throw new Error("Sorry but your stemLength / stemBase ratio is strange.");return{stemLength:r,stemBase:Math.tan(s)*r*2}},t.prototype._getColor=function(t,e,i,o){var s,n,r,a,h;if(null==o&&(o=!1),"string"==typeof i)return i;for(n=o?t.createLinearGradient(0,0,e.width,0):t.createLinearGradient(0,0,0,e.height),r=a=0,h=i.length;a<h;r=++a)s=i[r],n.addColorStop(s[0],s[1]);return n},t.prototype._searchAndActivateCloseButtons=function(){var t,e,i,o;for(e=0,i=(o=this.adapter.findAll(this.container,"."+this.class.close)).length;e<i;e++)t=o[e],this.hideTriggers.push({element:this.adapter.wrap(t),event:"click"});if(this.currentObservers.showing&&this._setupObservers("-showing","showing"),this.currentObservers.visible)return this._setupObservers("-visible","visible")},t.prototype._activateFirstInput=function(){var t;return null!=(t=this.adapter.unwrap(this.adapter.find(this.container,"input, textarea")))&&"function"==typeof t.focus?t.focus():void 0},t.prototype._followMousePosition=function(){if(!this.options.fixed)return t._observeMousePosition(this.bound.reposition)},t.prototype._stopFollowingMousePosition=function(){if(!this.options.fixed)return t._stopObservingMousePosition(this.bound.reposition)},t.prototype._clearShowTimeout=function(){return clearTimeout(this._showTimeoutId)},t.prototype._clearHideTimeout=function(){return clearTimeout(this._hideTimeoutId)},t.prototype._clearTimeouts=function(){return clearTimeout(this._visibilityStateTimeoutId),this._clearShowTimeout(),this._clearHideTimeout()},t.prototype._triggerElementExists=function(){var t;for(t=this.adapter.unwrap(this.triggerElement);t.parentNode;){if("BODY"===t.parentNode.tagName)return!0;t=t.parentNode}return!1},t.prototype._loadAjax=function(){var t=this;if(!this.loading)return this.loaded=!1,this.loading=!0,this.adapter.addClass(this.container,this.class.loading),this.setContent(""),this.debug("Loading content from "+this.options.ajax),this.adapter.ajax({url:this.options.ajax,method:this.options.ajaxMethod,onSuccess:function(e){return t.debug("Loading successful."),t.adapter.removeClass(t.container,t.class.loading),t.setContent(e)},onError:function(e){var i;return i=t.options.ajaxErrorMessage,t.debug(i,e),t.setContent(i),t.adapter.addClass(t.container,t.class.ajaxError)},onComplete:function(){return t.adapter.removeClass(t.container,t.class.loading),t.loading=!1,t.loaded=!0,t._searchAndActivateCloseButtons(),t._activateFirstInput(),t.reposition()}})},t.prototype._ensureTriggerElement=function(){if(!this._triggerElementExists())return this.deactivate(),this._stopEnsureTriggerElement()},t.prototype._ensureTriggerElementInterval=1e3,t.prototype._startEnsureTriggerElement=function(){var t=this;return this._ensureTriggerElementTimeoutId=setInterval(function(){return t._ensureTriggerElement()},this._ensureTriggerElementInterval)},t.prototype._stopEnsureTriggerElement=function(){return clearInterval(this._ensureTriggerElementTimeoutId)},t}(),vendors=["khtml","ms","o","moz","webkit"],Opentip.prototype.setCss3Style=function(t,e){var i,o,s,n,r;for(i in t=this.adapter.unwrap(t),r=[],e)__hasProp.call(e,i)&&(o=e[i],null!=t.style[i]?r.push(t.style[i]=o):r.push(function(){var e,r,a;for(a=[],e=0,r=vendors.length;e<r;e++)s=vendors[e],n=""+this.ucfirst(s)+this.ucfirst(i),null!=t.style[n]?a.push(t.style[n]=o):a.push(void 0);return a}.call(this)));return r},Opentip.prototype.defer=function(t){return setTimeout(t,0)},Opentip.prototype.setTimeout=function(t,e){return setTimeout(t,e?1e3*e:0)},Opentip.prototype.ucfirst=function(t){return null==t?"":t.charAt(0).toUpperCase()+t.slice(1)},Opentip.prototype.dasherize=function(t){return t.replace(/([A-Z])/g,function(t,e){return"-"+e.toLowerCase()})},mousePositionObservers=[],mousePosition={x:0,y:0},mouseMoved=function(t){var e,i,o,s;for(mousePosition=Opentip.adapter.mousePosition(t),s=[],i=0,o=mousePositionObservers.length;i<o;i++)e=mousePositionObservers[i],s.push(e());return s},Opentip.followMousePosition=function(){return Opentip.adapter.observe(document.body,"mousemove",mouseMoved)},Opentip._observeMousePosition=function(t){return mousePositionObservers.push(t)},Opentip._stopObservingMousePosition=function(t){var e;return mousePositionObservers=function(){var i,o,s;for(s=[],i=0,o=mousePositionObservers.length;i<o;i++)(e=mousePositionObservers[i])!==t&&s.push(e);return s}()},Opentip.Joint=function(){function t(t){null!=t&&(t instanceof Opentip.Joint&&(t=t.toString()),this.set(t))}return t.prototype.set=function(t){return t=t.toLowerCase(),this.setHorizontal(t),this.setVertical(t),this},t.prototype.setHorizontal=function(t){var e,i,o,s,n,r,a;for(o=0,n=(i=["left","center","right"]).length;o<n;o++)e=i[o],~t.indexOf(e)&&(this.horizontal=e.toLowerCase());for(null==this.horizontal&&(this.horizontal="center"),a=[],s=0,r=i.length;s<r;s++)e=i[s],a.push(this[e]=this.horizontal===e?e:void 0);return a},t.prototype.setVertical=function(t){var e,i,o,s,n,r,a;for(o=0,n=(i=["top","middle","bottom"]).length;o<n;o++)e=i[o],~t.indexOf(e)&&(this.vertical=e.toLowerCase());for(null==this.vertical&&(this.vertical="middle"),a=[],s=0,r=i.length;s<r;s++)e=i[s],a.push(this[e]=this.vertical===e?e:void 0);return a},t.prototype.eql=function(t){return null!=t&&this.horizontal===t.horizontal&&this.vertical===t.vertical},t.prototype.flip=function(){var t;return t=(Opentip.position[this.toString(!0)]+4)%8,this.set(Opentip.positions[t]),this},t.prototype.toString=function(t){var e,i;return null==t&&(t=!1),i="middle"===this.vertical?"":this.vertical,e="center"===this.horizontal?"":this.horizontal,i&&e&&(e=t?Opentip.prototype.ucfirst(e):" "+e),""+i+e},t}(),Opentip.prototype._positionsEqual=function(t,e){return null!=t&&null!=e&&t.left===e.left&&t.top===e.top},Opentip.prototype._dimensionsEqual=function(t,e){return null!=t&&null!=e&&t.width===e.width&&t.height===e.height},Opentip.prototype.debug=function(){var t;if(t=1<=arguments.length?__slice.call(arguments,0):[],Opentip.debug&&null!=("undefined"!=typeof console&&null!==console?console.debug:void 0))return t.unshift("#"+this.id+" |"),console.debug.apply(console,t)},Opentip.findElements=function(){var t,e,i,o,s,n,r,a,h,l;for(l=[],r=0,a=(h=(t=Opentip.adapter).findAll(document.body,"[data-ot]")).length;r<a;r++){for(o in i=h[r],n={},""!==(e=t.data(i,"ot"))&&"true"!==e&&"yes"!==e||(e=t.attr(i,"title"),t.attr(i,"title","")),e=e||"",Opentip.styles.standard)null!=(s=t.data(i,"ot"+Opentip.prototype.ucfirst(o)))&&("yes"===s||"true"===s||"on"===s?s=!0:"no"!==s&&"false"!==s&&"off"!==s||(s=!1),n[o]=s);l.push(new Opentip(i,e,n))}return l},Opentip.version="2.4.6",Opentip.debug=!1,Opentip.lastId=0,Opentip.lastZIndex=100,Opentip.tips=[],Opentip._abortShowingGroup=function(t,e){var i,o,s,n,r;for(r=[],o=0,s=(n=Opentip.tips).length;o<s;o++)(i=n[o])!==e&&i.options.group===t?r.push(i._abortShowing()):r.push(void 0);return r},Opentip._hideGroup=function(t,e){var i,o,s,n,r;for(r=[],o=0,s=(n=Opentip.tips).length;o<s;o++)(i=n[o])!==e&&i.options.group===t?r.push(i.hide()):r.push(void 0);return r},Opentip.adapters={},Opentip.adapter=null,firstAdapter=!0,Opentip.addAdapter=function(t){if(Opentip.adapters[t.name]=t,firstAdapter)return Opentip.adapter=t,t.domReady(Opentip.findElements),t.domReady(Opentip.followMousePosition),firstAdapter=!1},Opentip.positions=["top","topRight","right","bottomRight","bottom","bottomLeft","left","topLeft"],Opentip.position={},i=_i=0,_len=(_ref=Opentip.positions).length;_i<_len;i=++_i)position=_ref[i],Opentip.position[position]=i;var isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()}};Opentip.styles={standard:{extends:null,title:void 0,escapeTitle:!0,escapeContent:!1,className:"standard",stem:!0,delay:null,hideDelay:.1,fixed:!0,showOn:isMobile.any()?"click":"mouseover",hideTrigger:"both",hideTriggers:[],hideOn:isMobile.any()?"click":"mouseout",removeElementsOnHide:!1,offset:[0,0],containInViewport:!0,autoOffset:!0,showEffect:"appear",hideEffect:"fade",showEffectDuration:.3,hideEffectDuration:.2,stemLength:7,stemBase:14,tipJoint:"top",target:!0,targetJoint:null,cache:!0,ajax:!1,ajaxMethod:"GET",ajaxErrorMessage:"There was a problem downloading the content.",group:null,style:null,background:"#fff",backgroundGradientHorizontal:!1,closeButtonOffset:[5,5],closeButtonRadius:7,closeButtonCrossSize:4,closeButtonCrossColor:"#d2c35b",closeButtonCrossLineWidth:1.5,closeButtonLinkOverscan:6,borderRadius:1,borderWidth:.5,borderColor:"#cccccc",shadow:!0,shadowBlur:40,shadowOffset:[0,10],shadowColor:"rgba(0, 0, 0, 0.08)"},glass:{extends:"standard",className:"glass",background:[[0,"rgba(252, 252, 252, 0.8)"],[.5,"rgba(255, 255, 255, 0.8)"],[.5,"rgba(250, 250, 250, 0.9)"],[1,"rgba(245, 245, 245, 0.9)"]],borderColor:"#eee",closeButtonCrossColor:"rgba(0, 0, 0, 0.2)",borderRadius:15,closeButtonRadius:10,closeButtonOffset:[8,8]},dark:{extends:"standard",className:"dark",borderRadius:13,borderColor:"#444",closeButtonCrossColor:"rgba(240, 240, 240, 1)",shadowColor:"rgba(0, 0, 0, 0.3)",shadowOffset:[2,2],background:[[0,"rgba(30, 30, 30, 0.7)"],[.5,"rgba(30, 30, 30, 0.8)"],[.5,"rgba(10, 10, 10, 0.8)"],[1,"rgba(10, 10, 10, 0.9)"]]},alert:{extends:"standard",className:"alert",borderRadius:1,borderColor:"#AE0D11",closeButtonCrossColor:"rgba(255, 255, 255, 1)",shadowColor:"rgba(0, 0, 0, 0.3)",shadowOffset:[2,2],background:[[0,"rgba(203, 15, 19, 0.7)"],[.5,"rgba(203, 15, 19, 0.8)"],[.5,"rgba(189, 14, 18, 0.8)"],[1,"rgba(179, 14, 17, 0.9)"]]}},Opentip.defaultStyle="standard","undefined"!=typeof module&&null!==module?module.exports=Opentip:window.Opentip=Opentip;var Adapter;__hasProp={}.hasOwnProperty,__slice=[].slice;Adapter=function(){var t,e;function i(){}return i.prototype.name="native",i.prototype.domReady=function(t){var e,i,o,s,n,r,a,h,l,p,d;if(o=!1,l=!0,p=window,"complete"===(d=(i=document).readyState)||"loaded"===d)return t();if(h=i.documentElement,e=i.addEventListener?"addEventListener":"attachEvent",a=i.addEventListener?"removeEventListener":"detachEvent",r=i.addEventListener?"":"on",s=function(e){if("readystatechange"!==e.type||"complete"===i.readyState)return("load"===e.type?p:i)[a](r+e.type,s,!1),o?void 0:(o=!0,t())},n=function(){try{h.doScroll("left")}catch(t){return void setTimeout(n,50)}return s("poll")},"complete"!==i.readyState){if(i.createEventObject&&h.doScroll){try{l=!p.frameElement}catch(t){}l&&n()}return i[e](r+"DOMContentLoaded",s,!1),i[e](r+"readystatechange",s,!1),p[e](r+"load",s,!1)}},i.prototype.create=function(t){var e;return(e=document.createElement("div")).innerHTML=t,this.wrap(e.childNodes)},i.prototype.wrap=function(t){var e;return t?"string"==typeof t?t=(t=this.find(document.body,t))?[t]:[]:t instanceof NodeList?t=function(){var i,o,s;for(s=[],i=0,o=t.length;i<o;i++)e=t[i],s.push(e);return s}():t instanceof Array||(t=[t]):t=[],t},i.prototype.unwrap=function(t){return this.wrap(t)[0]},i.prototype.tagName=function(t){return this.unwrap(t).tagName},i.prototype.attr=function(t,e,i){return 3===arguments.length?this.unwrap(t).setAttribute(e,i):this.unwrap(t).getAttribute(e)},e=0,t={},i.prototype.data=function(i,o,s){var n;return(n=this.attr(i,"data-id"))||(n=++e,this.attr(i,"data-id",n),t[n]={}),3===arguments.length?t[n][o]=s:null!=(s=t[n][o])?s:((s=this.attr(i,"data-"+Opentip.prototype.dasherize(o)))&&(t[n][o]=s),s)},i.prototype.find=function(t,e){return this.unwrap(t).querySelector(e)},i.prototype.findAll=function(t,e){return this.unwrap(t).querySelectorAll(e)},i.prototype.update=function(t,e,i){return t=this.unwrap(t),i?(t.innerHTML="",t.appendChild(document.createTextNode(e))):t.innerHTML=e},i.prototype.append=function(t,e){var i;return i=this.unwrap(e),this.unwrap(t).appendChild(i)},i.prototype.remove=function(t){var e;if(null!=(e=(t=this.unwrap(t)).parentNode))return e.removeChild(t)},i.prototype.addClass=function(t,e){return this.unwrap(t).classList.add(e)},i.prototype.removeClass=function(t,e){return this.unwrap(t).classList.remove(e)},i.prototype.css=function(t,e){var i,o,s;for(i in t=this.unwrap(this.wrap(t)),s=[],e)__hasProp.call(e,i)&&(o=e[i],s.push(t.style[i]=o));return s},i.prototype.dimensions=function(t){var e,i;return(e={width:(t=this.unwrap(this.wrap(t))).offsetWidth,height:t.offsetHeight}).width&&e.height||(i={position:t.style.position||"",visibility:t.style.visibility||"",display:t.style.display||""},this.css(t,{position:"absolute",visibility:"hidden",display:"block"}),e={width:t.offsetWidth,height:t.offsetHeight},this.css(t,i)),e},i.prototype.scrollOffset=function(){return[window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop]},i.prototype.viewportDimensions=function(){return{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}},i.prototype.mousePosition=function(t){var e;if(e={x:0,y:0},null==t&&(t=window.event),null!=t){try{t.pageX||t.pageY?(e.x=t.pageX,e.y=t.pageY):(t.clientX||t.clientY)&&(e.x=t.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,e.y=t.clientY+document.body.scrollTop+document.documentElement.scrollTop)}catch(t){}return e}},i.prototype.offset=function(t){var e;for(e={top:(t=this.unwrap(t)).offsetTop,left:t.offsetLeft};t=t.offsetParent;)e.top+=t.offsetTop,e.left+=t.offsetLeft,t!==document.body&&(e.top-=t.scrollTop,e.left-=t.scrollLeft);return e},i.prototype.observe=function(t,e,i){return this.unwrap(t).addEventListener(e,i,!1)},i.prototype.stopObserving=function(t,e,i){return this.unwrap(t).removeEventListener(e,i,!1)},i.prototype.ajax=function(t){var e,i,o;if(null==t.url)throw new Error("No url provided");if(window.XMLHttpRequest)e=new XMLHttpRequest;else if(window.ActiveXObject)try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(t){try{e=new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}if(!e)throw new Error("Can't create XMLHttpRequest");return e.onreadystatechange=function(){if(4===e.readyState){try{200===e.status?"function"==typeof t.onSuccess&&t.onSuccess(e.responseText):"function"==typeof t.onError&&t.onError("Server responded with status "+e.status)}catch(e){"function"==typeof t.onError&&t.onError(e.message)}return"function"==typeof t.onComplete?t.onComplete():void 0}},e.open(null!=(i=null!=(o=t.method)?o.toUpperCase():void 0)?i:"GET",t.url),e.send()},i.prototype.clone=function(t){var e,i,o;for(e in i={},t)__hasProp.call(t,e)&&(o=t[e],i[e]=o);return i},i.prototype.extend=function(){var t,e,i,o,s,n,r;for(o=arguments[0],n=0,r=(i=2<=arguments.length?__slice.call(arguments,1):[]).length;n<r;n++)for(t in e=i[n])__hasProp.call(e,t)&&(s=e[t],o[t]=s);return o},i}(),Opentip.addAdapter(new Adapter),document.createElement("canvas").getContext||function(){var t=Math,e=t.round,i=t.sin,o=t.cos,s=t.abs,n=t.sqrt,r=10,a=r/2;function h(){return this.context_||(this.context_=new y(this))}var l=Array.prototype.slice;var p={init:function(t){if(/MSIE/.test(navigator.userAgent)&&!window.opera){var e=t||document;e.createElement("canvas"),e.attachEvent("onreadystatechange",function(t,e,i){var o=l.call(arguments,2);return function(){return t.apply(e,o.concat(l.call(arguments)))}}(this.init_,this,e))}},init_:function(t){if(t.namespaces.g_vml_||t.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML"),t.namespaces.g_o_||t.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML"),!t.styleSheets.ex_canvas_){var e=t.createStyleSheet();e.owningElement.id="ex_canvas_",e.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}for(var i=t.getElementsByTagName("canvas"),o=0;o<i.length;o++)this.initElement(i[o])},initElement:function(t){if(!t.getContext){t.getContext=h,t.innerHTML="",t.attachEvent("onpropertychange",d),t.attachEvent("onresize",u);var e=t.attributes;e.width&&e.width.specified?t.style.width=e.width.nodeValue+"px":t.width=t.clientWidth,e.height&&e.height.specified?t.style.height=e.height.nodeValue+"px":t.height=t.clientHeight}return t}};function d(t){var e=t.srcElement;switch(t.propertyName){case"width":e.style.width=e.attributes.width.nodeValue+"px",e.getContext().clearRect();break;case"height":e.style.height=e.attributes.height.nodeValue+"px",e.getContext().clearRect()}}function u(t){var e=t.srcElement;e.firstChild&&(e.firstChild.style.width=e.clientWidth+"px",e.firstChild.style.height=e.clientHeight+"px")}p.init();for(var c=[],f=0;f<16;f++)for(var g=0;g<16;g++)c[16*f+g]=f.toString(16)+g.toString(16);function m(t,e){for(var i=[[1,0,0],[0,1,0],[0,0,1]],o=0;o<3;o++)for(var s=0;s<3;s++){for(var n=0,r=0;r<3;r++)n+=t[o][r]*e[r][s];i[o][s]=n}return i}function v(t,e){e.fillStyle=t.fillStyle,e.lineCap=t.lineCap,e.lineJoin=t.lineJoin,e.lineWidth=t.lineWidth,e.miterLimit=t.miterLimit,e.shadowBlur=t.shadowBlur,e.shadowColor=t.shadowColor,e.shadowOffsetX=t.shadowOffsetX,e.shadowOffsetY=t.shadowOffsetY,e.strokeStyle=t.strokeStyle,e.globalAlpha=t.globalAlpha,e.arcScaleX_=t.arcScaleX_,e.arcScaleY_=t.arcScaleY_,e.lineScale_=t.lineScale_}function _(t){var e,i=1;if("rgb"==(t=String(t)).substring(0,3)){var o=t.indexOf("(",3),s=t.indexOf(")",o+1),n=t.substring(o+1,s).split(",");e="#";for(var r=0;r<3;r++)e+=c[Number(n[r])];4==n.length&&"a"==t.substr(3,1)&&(i=n[3])}else e=t;return{color:e,alpha:i}}function y(t){this.m_=[[1,0,0],[0,1,0],[0,0,1]],this.mStack_=[],this.aStack_=[],this.currentPath_=[],this.strokeStyle="#000",this.fillStyle="#000",this.lineWidth=1,this.lineJoin="miter",this.lineCap="butt",this.miterLimit=1*r,this.globalAlpha=1,this.canvas=t;var e=t.ownerDocument.createElement("div");e.style.width=t.clientWidth+"px",e.style.height=t.clientHeight+"px",e.style.position="absolute",t.appendChild(e),this.element_=e,this.arcScaleX_=1,this.arcScaleY_=1,this.lineScale_=1}var w=y.prototype;function b(t,e,i,o){t.currentPath_.push({type:"bezierCurveTo",cp1x:e.x,cp1y:e.y,cp2x:i.x,cp2y:i.y,x:o.x,y:o.y}),t.currentX_=o.x,t.currentY_=o.y}function x(t,e,i){if(function(t){for(var e=0;e<3;e++)for(var i=0;i<2;i++)if(!isFinite(t[e][i])||isNaN(t[e][i]))return!1;return!0}(e)&&(t.m_=e,i)){var o=e[0][0]*e[1][1]-e[0][1]*e[1][0];t.lineScale_=n(s(o))}}function T(t){this.type_=t,this.x0_=0,this.y0_=0,this.r0_=0,this.x1_=0,this.y1_=0,this.r1_=0,this.colors_=[]}function O(){}w.clearRect=function(){this.element_.innerHTML=""},w.beginPath=function(){this.currentPath_=[]},w.moveTo=function(t,e){var i=this.getCoords_(t,e);this.currentPath_.push({type:"moveTo",x:i.x,y:i.y}),this.currentX_=i.x,this.currentY_=i.y},w.lineTo=function(t,e){var i=this.getCoords_(t,e);this.currentPath_.push({type:"lineTo",x:i.x,y:i.y}),this.currentX_=i.x,this.currentY_=i.y},w.bezierCurveTo=function(t,e,i,o,s,n){var r=this.getCoords_(s,n);b(this,this.getCoords_(t,e),this.getCoords_(i,o),r)},w.quadraticCurveTo=function(t,e,i,o){var s=this.getCoords_(t,e),n=this.getCoords_(i,o),r={x:this.currentX_+2/3*(s.x-this.currentX_),y:this.currentY_+2/3*(s.y-this.currentY_)};b(this,r,{x:r.x+(n.x-this.currentX_)/3,y:r.y+(n.y-this.currentY_)/3},n)},w.arc=function(t,e,s,n,h,l){s*=r;var p=l?"at":"wa",d=t+o(n)*s-a,u=e+i(n)*s-a,c=t+o(h)*s-a,f=e+i(h)*s-a;d!=c||l||(d+=.125);var g=this.getCoords_(t,e),m=this.getCoords_(d,u),v=this.getCoords_(c,f);this.currentPath_.push({type:p,x:g.x,y:g.y,radius:s,xStart:m.x,yStart:m.y,xEnd:v.x,yEnd:v.y})},w.rect=function(t,e,i,o){this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+o),this.lineTo(t,e+o),this.closePath()},w.strokeRect=function(t,e,i,o){var s=this.currentPath_;this.beginPath(),this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+o),this.lineTo(t,e+o),this.closePath(),this.stroke(),this.currentPath_=s},w.fillRect=function(t,e,i,o){var s=this.currentPath_;this.beginPath(),this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+o),this.lineTo(t,e+o),this.closePath(),this.fill(),this.currentPath_=s},w.createLinearGradient=function(t,e,i,o){var s=new T("gradient");return s.x0_=t,s.y0_=e,s.x1_=i,s.y1_=o,s},w.createRadialGradient=function(t,e,i,o,s,n){var r=new T("gradientradial");return r.x0_=t,r.y0_=e,r.r0_=i,r.x1_=o,r.y1_=s,r.r1_=n,r},w.drawImage=function(i,o){var s,n,a,h,l,p,d,u,c=i.runtimeStyle.width,f=i.runtimeStyle.height;i.runtimeStyle.width="auto",i.runtimeStyle.height="auto";var g=i.width,m=i.height;if(i.runtimeStyle.width=c,i.runtimeStyle.height=f,3==arguments.length)s=arguments[1],n=arguments[2],l=p=0,d=a=g,u=h=m;else if(5==arguments.length)s=arguments[1],n=arguments[2],a=arguments[3],h=arguments[4],l=p=0,d=g,u=m;else{if(9!=arguments.length)throw Error("Invalid number of arguments");l=arguments[1],p=arguments[2],d=arguments[3],u=arguments[4],s=arguments[5],n=arguments[6],a=arguments[7],h=arguments[8]}var v=this.getCoords_(s,n),_=[];if(_.push(" <g_vml_:group",' coordsize="',10*r,",",10*r,'"',' coordorigin="0,0"',' style="width:',10,"px;height:",10,"px;position:absolute;"),1!=this.m_[0][0]||this.m_[0][1]){var y=[];y.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",e(v.x/r),",","Dy=",e(v.y/r),"");var w=v,b=this.getCoords_(s+a,n),x=this.getCoords_(s,n+h),T=this.getCoords_(s+a,n+h);w.x=t.max(w.x,b.x,x.x,T.x),w.y=t.max(w.y,b.y,x.y,T.y),_.push("padding:0 ",e(w.x/r),"px ",e(w.y/r),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",y.join(""),", sizingmethod='clip');")}else _.push("top:",e(v.y/r),"px;left:",e(v.x/r),"px;");_.push(' ">','<g_vml_:image src="',i.src,'"',' style="width:',r*a,"px;"," height:",r*h,'px;"',' cropleft="',l/g,'"',' croptop="',p/m,'"',' cropright="',(g-l-d)/g,'"',' cropbottom="',(m-p-u)/m,'"'," />","</g_vml_:group>"),this.element_.insertAdjacentHTML("BeforeEnd",_.join(""))},w.stroke=function(i){var o=[],s=_(i?this.fillStyle:this.strokeStyle),n=s.color,a=s.alpha*this.globalAlpha;o.push("<g_vml_:shape",' filled="',!!i,'"',' style="position:absolute;width:',10,"px;height:",10,'px;"',' coordorigin="0 0" coordsize="',10*r," ",10*r,'"',' stroked="',!i,'"',' path="');for(var h={x:null,y:null},l={x:null,y:null},p=0;p<this.currentPath_.length;p++){var d=this.currentPath_[p];switch(d.type){case"moveTo":d,o.push(" m ",e(d.x),",",e(d.y));break;case"lineTo":o.push(" l ",e(d.x),",",e(d.y));break;case"close":o.push(" x "),d=null;break;case"bezierCurveTo":o.push(" c ",e(d.cp1x),",",e(d.cp1y),",",e(d.cp2x),",",e(d.cp2y),",",e(d.x),",",e(d.y));break;case"at":case"wa":o.push(" ",d.type," ",e(d.x-this.arcScaleX_*d.radius),",",e(d.y-this.arcScaleY_*d.radius)," ",e(d.x+this.arcScaleX_*d.radius),",",e(d.y+this.arcScaleY_*d.radius)," ",e(d.xStart),",",e(d.yStart)," ",e(d.xEnd),",",e(d.yEnd))}d&&((null==h.x||d.x<h.x)&&(h.x=d.x),(null==l.x||d.x>l.x)&&(l.x=d.x),(null==h.y||d.y<h.y)&&(h.y=d.y),(null==l.y||d.y>l.y)&&(l.y=d.y))}if(o.push(' ">'),i)if("object"==typeof this.fillStyle){var u=this.fillStyle,c=0,f={x:0,y:0},g=0,m=1;if("gradient"==u.type_){var v=u.x0_/this.arcScaleX_,y=u.y0_/this.arcScaleY_,w=u.x1_/this.arcScaleX_,b=u.y1_/this.arcScaleY_,x=this.getCoords_(v,y),T=this.getCoords_(w,b),O=T.x-x.x,C=T.y-x.y;(c=180*Math.atan2(O,C)/Math.PI)<0&&(c+=360),c<1e-6&&(c=0)}else{x=this.getCoords_(u.x0_,u.y0_);var E=l.x-h.x,S=l.y-h.y;f={x:(x.x-h.x)/E,y:(x.y-h.y)/S},E/=this.arcScaleX_*r,S/=this.arcScaleY_*r;var P=t.max(E,S);g=2*u.r0_/P,m=2*u.r1_/P-g}var M=u.colors_;M.sort(function(t,e){return t.offset-e.offset});var L=M.length,k=M[0].color,B=M[L-1].color,A=M[0].alpha*this.globalAlpha,H=M[L-1].alpha*this.globalAlpha,I=[];for(p=0;p<L;p++){var R=M[p];I.push(R.offset*m+g+" "+R.color)}o.push('<g_vml_:fill type="',u.type_,'"',' method="none" focus="100%"',' color="',k,'"',' color2="',B,'"',' colors="',I.join(","),'"',' opacity="',H,'"',' g_o_:opacity2="',A,'"',' angle="',c,'"',' focusposition="',f.x,",",f.y,'" />')}else o.push('<g_vml_:fill color="',n,'" opacity="',a,'" />');else{var j=this.lineScale_*this.lineWidth;j<1&&(a*=j),o.push("<g_vml_:stroke",' opacity="',a,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',function(t){switch(t){case"butt":return"flat";case"round":return"round";case"square":default:return"square"}}(this.lineCap),'"',' weight="',j,'px"',' color="',n,'" />')}o.push("</g_vml_:shape>"),this.element_.insertAdjacentHTML("beforeEnd",o.join(""))},w.fill=function(){this.stroke(!0)},w.closePath=function(){this.currentPath_.push({type:"close"})},w.getCoords_=function(t,e){var i=this.m_;return{x:r*(t*i[0][0]+e*i[1][0]+i[2][0])-a,y:r*(t*i[0][1]+e*i[1][1]+i[2][1])-a}},w.save=function(){var t={};v(this,t),this.aStack_.push(t),this.mStack_.push(this.m_),this.m_=m([[1,0,0],[0,1,0],[0,0,1]],this.m_)},w.restore=function(){v(this.aStack_.pop(),this),this.m_=this.mStack_.pop()},w.translate=function(t,e){x(this,m([[1,0,0],[0,1,0],[t,e,1]],this.m_),!1)},w.rotate=function(t){var e=o(t),s=i(t);x(this,m([[e,s,0],[-s,e,0],[0,0,1]],this.m_),!1)},w.scale=function(t,e){this.arcScaleX_*=t,this.arcScaleY_*=e,x(this,m([[t,0,0],[0,e,0],[0,0,1]],this.m_),!0)},w.transform=function(t,e,i,o,s,n){x(this,m([[t,e,0],[i,o,0],[s,n,1]],this.m_),!0)},w.setTransform=function(t,e,i,o,s,n){x(this,[[t,e,0],[i,o,0],[s,n,1]],!0)},w.clip=function(){},w.arcTo=function(){},w.createPattern=function(){return new O},T.prototype.addColorStop=function(t,e){e=_(e),this.colors_.push({offset:t,color:e.color,alpha:e.alpha})},G_vmlCanvasManager=p,CanvasRenderingContext2D=y,CanvasGradient=T,CanvasPattern=O}(),"undefined"==typeof document||"classList"in document.createElement("a")||function(t){"use strict";if("HTMLElement"in t||"Element"in t){var e=(t.HTMLElement||t.Element).prototype,i=Object,o=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},s=Array.prototype.indexOf||function(t){for(var e=0,i=this.length;e<i;e++)if(e in this&&this[e]===t)return e;return-1},n=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},r=function(t,e){if(""===e)throw new n("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new n("INVALID_CHARACTER_ERR","String contains an invalid character");return s.call(t,e)},a=function(t){for(var e=o.call(t.className),i=e?e.split(/\s+/):[],s=0,n=i.length;s<n;s++)this.push(i[s]);this._updateClassName=function(){t.className=this.toString()}},h=a.prototype=[],l=function(){return new a(this)};if(n.prototype=Error.prototype,h.item=function(t){return this[t]||null},h.contains=function(t){return-1!==r(this,t+="")},h.add=function(){var t,e=arguments,i=0,o=e.length,s=!1;do{t=e[i]+"",-1===r(this,t)&&(this.push(t),s=!0)}while(++i<o);s&&this._updateClassName()},h.remove=function(){var t,e=arguments,i=0,o=e.length,s=!1;do{t=e[i]+"";var n=r(this,t);-1!==n&&(this.splice(n,1),s=!0)}while(++i<o);s&&this._updateClassName()},h.toggle=function(t,e){t+="";var i=this.contains(t),o=i?!0!==e&&"remove":!1!==e&&"add";return o&&this[o](t),i},h.toString=function(){return this.join(" ")},i.defineProperty){var p={get:l,enumerable:!0,configurable:!0};try{i.defineProperty(e,"classList",p)}catch(t){-2146823252===t.number&&(p.enumerable=!1,i.defineProperty(e,"classList",p))}}else i.prototype.__defineGetter__&&e.__defineGetter__("classList",l)}}(self),!window.addEventListener&&function(t,e,i,o,s,n,r){t.addEventListener=e.addEventListener=i.addEventListener=function(t,e){var i=this;r.unshift([i,t,e,function(t){t.currentTarget=i,t.preventDefault=function(){t.returnValue=!1},t.stopPropagation=function(){t.cancelBubble=!0},t.target=t.srcElement||i,e.call(i,t)}]),this.attachEvent("on"+t,r[0][3])},t.removeEventListener=e.removeEventListener=i.removeEventListener=function(t,e){for(var i,o=0;i=r[o];++o)if(i[0]==this&&i[1]==t&&i[2]==e)return this.detachEvent("on"+t,r.splice(o,1)[0][3])},t.dispatchEvent=e.dispatchEvent=i.dispatchEvent=function(t){return this.fireEvent("on"+t.type,t)}}(Window.prototype,HTMLDocument.prototype,Element.prototype,0,0,0,[]);


(function(jQuery) {	
/*	Header menu highlight active item	*/
	(function() {
		var sideBarHeaderLink = $('.navigation__left .sidebar__title a');
	
		if (!sideBarHeaderLink.length) return;
		
		var headerMenuLinks = $('.navigation__top .menu_main .menu__item .top_level');
	
		if (!headerMenuLinks.length) return;
		
		for (var i = 0; i < headerMenuLinks.length; i++)
		{
			headerMenuLinks[i].innerHTML == sideBarHeaderLink.text()
				? headerMenuLinks[i].parentElement.classList.add('active')
				: headerMenuLinks[i].parentElement.classList.remove('active');
		};
	})();

/*	Hide the "Show Password" button	*/
	$('.password-group button').hide();

	
/*Mobile header hiding after scroll*/
	var yOffset = 0;

	window.onscroll = function(){ // возм. не исп.
		var target = $('#navigation-mobile');
		var newYOffset = (window.pageYOffset !== undefined)
						? window.pageYOffset
						: (document.documentElement || document.body.parentNode || document.body).scrollTop;
		
		if(newYOffset > yOffset)				
		{
			target.addClass('hide-menu-header');
/*
			if(target.is(':visible'))
				target.slideUp(300);
*/		}
		else
		{
/*
			if(target.is(':hidden'))
				target.slideDown(300);
*/
			target.removeClass('hide-menu-header');
		};
				
		yOffset = newYOffset;		
	}


})($);
