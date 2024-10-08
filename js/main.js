/* -----------------------------------------------
				Scripts
--------------------------------------------------

    Template Name: Kyle - Creative Portfolio Template
    Author: Malyarchuk
    Copyright: 2019

--------------------------------------------------

Table of Content

	01. Music Background
	02. Isotope Portfolio Setup
	03. Blogs Masonry Setup
	04. Preloader
	05. Drop Menu
	06. Newsletter Open
	07. Portfolio Tilt
	08. Testimonial Slider
	09. Magnific Popup 
	10. Validate Contact Form
	11. Cursor Effect
	12. Magnetic Effect
	13. Slider
	14. Video Youtube
	15. Google Map

----------------------------------- */

$(window).on("load", function() {
	
	/* -----------------------------------
			01. Music Background
	----------------------------------- */
	$('body').append('<audio loop autoplay volume="1" id="audio-player"><source src="music.mp3" type="audio/mpeg"></audio>');
    	var audio = document.getElementById("audio-player");
    	audio.volume = 0.2;
	
	if($(window).length) {
		$('.music-bg').css({'visibility':'visible'});
		$('body').addClass("audio-on");
		if ($('body').hasClass('audio-off')) {
        	$('body').removeClass('audio-on');
		} 
		$(".music-bg").on('click', function() {
			$('body').toggleClass("audio-on audio-off");         
			if ($('body').hasClass('audio-off')) {
				audio.pause();
			} 
			if ($('body').hasClass('audio-on')) {
				audio.play();
			}
		});
	}
	
	/* -----------------------------------
			02. Isotope Portfolio Setup
	----------------------------------- */
    if( $('.portfolio-items').length ) {
        var $elements = $(".portfolio-items"),
            $filters = $('.portfolio-filter ul li');
        $elements.isotope();

        $filters.on('click', function(){
            $filters.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).data('filter');
            $(".portfolio-items").isotope({
                filter: selector,
                hiddenStyle: {
                    transform: 'scale(.2) skew(30deg)',
                    opacity: 0
                },
                visibleStyle: {
                    transform: 'scale(1) skew(0deg)',
                    opacity: 1,
                },
                transitionDuration: '.5s'
            });
        });
    }
	
	/* -----------------------------------
			03. Blogs Masonry Setup
	----------------------------------- */
    $('.blog-masonry').isotope({ layoutMode: 'moduloColumns' });
	
});

$(function() {
    "use strict";
	
	bannerSlider();
	
	/* -----------------------------------
			04. Preloader
	----------------------------------- */
	var counter = 0;
	var c = 0;
	var i = setInterval(function() {

		$('.preloader p').html(c);

		c++;
		counter++;
		if(counter == 101) {
			clearInterval(i);
			TweenMax.from('.preloader p', 1, { ease: Power2.easeInOut });
			TweenMax.to('.preloader p', 1, { opacity: 0 , ease: Power2.easeInOut });
			TweenMax.from('.preloader span', 1, { ease: Power2.easeInOut });
			TweenMax.to('.preloader span', 1, { opacity: 0 , ease: Power2.easeInOut });
			TweenMax.from('.preloader', 2, { ease: Power2.easeInOut });
			TweenMax.to('.preloader', 2, { top: '-120%', ease: Power2.easeInOut });
		}

	}, 9);
	
	/* -----------------------------------
			05. Drop Menu
	----------------------------------- */
	$('.animation-wrap').on('mouseenter mouseleave', function () {
		$(this).children('ul').stop(true, false, true).slideToggle(300);
	});
	
	/* -----------------------------------
			06. Newsletter Open
	----------------------------------- */
	$('.newsletter').on('click', function() {$('.newsletter-block').toggleClass('open');});
	$('.news-close').on('click', function() {$('.newsletter-block').removeClass('open');});
	
	/* -----------------------------------
			07. Portfolio Tilt
	----------------------------------- */
	$('.portfolio .portfolio-items .item figure').tilt({
        maxTilt: 10,
		speed: 400,
		perspective: 500,
		maxGlare: .6,
        reverse: true
    });
	
	/* -----------------------------------
			08. Testimonial Slider
	----------------------------------- */
	var swiper = new Swiper('.testimonials', {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false,
      },
      pagination: {
        el: '.testimonial-pagination',
        clickable: true,
      }
    });
	
	/* -----------------------------------
	      09. Magnific Popup 
	----------------------------------- */
	$(".portfolio-items .image-link").magnificPopup({type: "image"});
	$(".portfolio-items .video-link").magnificPopup({type: "iframe"});
	
	/* -----------------------------------
	    10. Validate Contact Form
	----------------------------------- */
	if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",
				
            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email address"
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                return false;
            }

        });
    }
	
	/* -----------------------------------
			11. Cursor Effect
	----------------------------------- */
	var isMobile = false;
	if (/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))	{
	$('html').addClass('touch');
		isMobile = true;
	} else {
		$('html').addClass('no-touch');
		isMobile = false;
	}

	var isMacLike = /(Mac)/i.test(navigator.platform);

	var cursor = {
		delay: 8,
		_x: 0,
		_y: 0,
		endX: (window.innerWidth / 2),
		endY: (window.innerHeight / 2),
		cursorVisible: true,
		cursorEnlarged: false,
		$cursor: document.querySelector('.cursor'),
		$cursorBorder: document.querySelector('.cursor-border'),

		init: function () {
			$('body').css('cursor', 'none');

			// Set up element sizes
			this.cursorSize = this.$cursor.offsetWidth;
			this.cursorBorderSize = this.$cursorBorder.offsetWidth;

			this.setupEventListeners();
			this.animateDotOutline();
			this.cursorGrab();
			this.cursorZoom();
			this.cursorSound();
			this.cursorPen();
        },

		setupEventListeners: function () {
			var self = this;

			// Cursor Hover
			Array.prototype.slice.call(document.querySelectorAll('.hover')).forEach(function (el) {
				el.addEventListener('mouseover', function () {
					self.cursorEnlarged = true;
					self.toggleCursorSize();
				});
				el.addEventListener('mouseout', function () {
					self.cursorEnlarged = false;
					self.toggleCursorSize();
				});
			});

			document.addEventListener('mousemove', function (e) {
                // Show the cursor
                self.cursorVisible = true;
                self.toggleCursorVisibility();

                // Position the dot
                self.endX = e.clientX;
                self.endY = e.clientY;
                self.$cursor.style.top = self.endY + 'px';
                self.$cursor.style.left = self.endX + 'px';
            });

            // Hide/show cursor
            document.addEventListener('mouseenter', function (e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$cursor.style.opacity = 1;
                self.$cursorBorder.style.opacity = 1;
            });

            document.addEventListener('mouseleave', function (e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$cursor.style.opacity = 0;
                self.$cursorBorder.style.opacity = 0;
            });
        },

        animateDotOutline: function () {
            var self = this;

            self._x += (self.endX - self._x) / self.delay;
            self._y += (self.endY - self._y) / self.delay;
            self.$cursorBorder.style.top = self._y + 'px';
            self.$cursorBorder.style.left = self._x + 'px';

            requestAnimationFrame(this.animateDotOutline.bind(self));
        },

        toggleCursorSize: function () {
            var self = this;

            if (self.cursorEnlarged) {
				self.$cursor.classList.add('homing');
                self.$cursorBorder.classList.add('homing');
            } else {
				self.$cursor.classList.remove('homing');
                self.$cursorBorder.classList.remove('homing');
            }
        },

        toggleCursorVisibility: function () {
            var self = this;

            if (self.cursorVisible) {
                self.$cursor.style.opacity = 1;
                self.$cursorBorder.style.opacity = 1;
            } else {
                self.$cursor.style.opacity = 0;
                self.$cursorBorder.style.opacity = 0;
            }
        },

		// Cursor Grab
        cursorGrab: function () {
            var self = this;
            $('.cursor-grab').on('mouseenter', function () {
                self.$cursor.classList.add('grab');
            });
            $('.cursor-grab').on('mouseleave', function () {
                self.$cursor.classList.remove('grab');
            });
        },

		// Cursor Zoom
        cursorZoom: function () {
            var self = this;
            $('.cursorZoom').on('mouseenter', function () {
                self.$cursorBorder.classList.add('zoom');
            });
            $('.cursorZoom').on('mouseleave', function () {
                self.$cursorBorder.classList.remove('zoom');
            });
        },
		
		// Cursor Sound
		cursorSound: function () {
            var self = this;
            $('.cursor-sound').on('mouseenter', function () {
                self.$cursor.classList.add('sound');
				self.$cursorBorder.classList.add('homing');
            });
            $('.cursor-sound').on('mouseleave', function () {
                self.$cursor.classList.remove('sound');
				self.$cursorBorder.classList.remove('homing');
            });
        },
		
		// Cursor Pen
		cursorPen: function () {
            var self = this;
            $('.cursor-pen').on('mouseenter', function () {
                self.$cursor.classList.add('pen');
				self.$cursorBorder.classList.add('homing');
            });
            $('.cursor-pen').on('mouseleave', function () {
                self.$cursor.classList.remove('pen');
				self.$cursorBorder.classList.remove('homing');
            });
        }
    }

    if (!isMobile) {
        cursor.init();
    }
	
	/* -----------------------------------
			12. Magnetic Effect
	----------------------------------- */
	$(document).on('mousemove', function (e) {
		$('.magnetic').each(function () {
			if (!isMobile) {
				magnetic(this, e);
			}
		});
	});

	function magnetic(el, e) {
		var mX = e.pageX,
			mY = e.pageY;
			const obj = $(el);

		const customDist = 20 * obj.data('dist') || 25,
			centerX = obj.offset().left + obj.width() / 2,
			centerY = obj.offset().top + obj.height() / 2;

		var deltaX = Math.floor((centerX - mX)) * -.4,
			deltaY = Math.floor((centerY - mY)) * -.4;

		var distance = calcDistance(obj, mX, mY);

		if (distance < customDist) {
			TweenMax.to(obj, .4, {
				y: deltaY,
				x: deltaX
		});
		} else {
			TweenMax.to(obj, .4, {
				y: 0,
				x: 0
			});
		}
	}

	function calcDistance(elem, mouseX, mouseY) {
		return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
	}
	
	
	// Setup Google Map
	if($('#map').length) {
        initMap();
     };
	
});

/* -----------------------------------
		13. Slider Background
----------------------------------- */
function bannerSlider() {
    if ($(".section-slider").length > 0) {
        var bannerSlider = new Swiper('.section-slider', {
            spaceBetween: 0,
            slidesPerView: 1,
            mousewheel: true,
            height: 500,
            grabCursor: false,
            loop: true,
            speed: 1400,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            navigation: {
                nextEl: '.slider-button-next',
                prevEl: '.slider-button-prev',
            },
        });
		
        bannerSlider.on('slideChange', function() {
            var csli = bannerSlider.realIndex + 1,
                curnum = $('#current');
            TweenMax.to(curnum, 0.2, {
                force3D: true,
                y: -10,
                opacity: 0,
                ease: Power2.easeOut,
                onComplete: function() {
                    TweenMax.to(curnum, 0.1, {
                        force3D: true,
                        y: 10
                    });
                    curnum.html('0' + csli);
                }
            });
            TweenMax.to(curnum, 0.2, {
                force3D: true,
                y: 0,
                delay: 0.3,
                opacity: 1,
                ease: Power2.easeOut
            });
        });

        var totalSlides = bannerSlider.slides.length - 2;
        $('#total').html('0' + totalSlides);
	}

}

/* -----------------------------------
		14. Video Youtube
----------------------------------- */
var player,
	card  = document.querySelector( '.video' ),
	play  = document.querySelector( '.video-play' ),
	video = document.querySelector( '.video-content' );

// Youtube API
function onYouTubePlayerAPIReady() {
	player = new YT.Player('video', {
		events: {
			'onReady': onPlayerReady
		}
	});
}

// Player Ready
function onPlayerReady(event) {
	play.addEventListener( 'click', function() {
		card.classList.add( 'video-is-open' );
		setTimeout(function() {
			video.style.display = 'block';
			player.playVideo();
		}, 500);
	});
}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


/* -----------------------------------
			15. Google Map
----------------------------------- */
function initMap() {
    var latitude = $("#map").data('latitude'),
        longitude = $("#map").data('longitude'),
        zoom = $("#map").data('zoom'),
        cordinates = new google.maps.LatLng(latitude, longitude);

    var styles = [{"stylers":[{"saturation":-100},{"gamma":0.8},{"lightness":4},{"visibility":"on"}]},{"featureType":"landscape.natural","stylers":[{"visibility":"on"},{"color":"#5dff00"},{"gamma":4.97},{"lightness":-5},{"saturation":100}]}];
	
        var mapOptions = {
        zoom: zoom,
        center: cordinates,
        mapTypeControl: false,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        styles: styles
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
        position: cordinates,
        map: map,
        title: "We are here!"
    });
}