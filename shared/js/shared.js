/*!
 * ScriptName: shared.js
 *
 * FoodConnection
 * http://foodconnection.jp/
 * http://foodconnection.vn/
 *
 */
$(document).ready(function() {	
	$('.nav-fixed a').on('click', function(){      
		var e = $(this).attr('href')		
		var b = $(e).length ? $(e).offset().top : 0 
		$('html, body').animate({
			scrollTop: (b + 1)
		}, 500);
    $('.nav-fixed a').removeClass('active');
    $(this).addClass('active');    
	})
  
});

var lastScrollTop = 0;
$(window).scroll(function() {
		var st = $(this).scrollTop();
		if (lastScrollTop != 0) {
				if (st < lastScrollTop) {
						$("#pagetop").addClass("visible");
						if (st < 10) {
								$("#pagetop").removeClass("visible");
						}
				} else if (st > lastScrollTop) {

						$("#pagetop").removeClass("visible");

				}
		}
		lastScrollTop = st;
});

$("body").on("click", "#pagetop", function() {
		if (!$(this).hasClass("in-scroll")) {
				$(this).addClass("in-scroll");

				var $scrollDuration = $.inArray($(this).attr("data-duration"), ["slow", "normal", "fast"]) >= 0 || parseInt($(this).attr("data-duration")) > 0 ? $(this).attr("data-duration") : "slow";

				$("html, body").stop().animate({
						scrollTop: 0
				}, $scrollDuration, function() {
						$("#pagetop").removeClass("in-scroll");
						$("#pagetop").removeClass("visible");
				});

		}
});
// END: scroll to top

$(document).ready(function() {
		$('body').removeClass('navOpen');
		$(".hamburger").click(function() {
				if ($('body').hasClass('navOpen')) {
						$('body').addClass('navClose');
						$('body').removeClass('navOpen');
						$('body').css({
								'position': 'static',
								'top': 'auto',
								'width': 'auto'
						});

				} else {
						$('body').addClass('navOpen');
						$('body').removeClass('navClose');
				}
		});

		$(".close_btn,#menu_toggle a").click(function() {
				$('body').removeClass('navOpen');
				$('body').addClass('navClose');
        $('body').removeClass('nav--opened');
				$('.hamburger').removeClass('is-active');
				$('body').css({
						'position': 'static',
						'top': 'auto',
						'width': 'auto'
				});
		});

    new WOW().init();
  
  $(".btn-copy").click(function() {
		$(this).css({
        'pointer-events': 'none'
    });
  });

	var TargetPos = $('section.block').offset().top;
	setTimeout(function(){
		TargetPos = $('section.block').offset().top;
	},500)
	$(window).on('resize load scroll orientationchange', function() {
		////console.log(TargetPos);
		var ScrollPos = $(window).scrollTop();
		if (ScrollPos > TargetPos) {
			$("body").addClass('has_nav');
		} else {
			$("body").removeClass('has_nav');
		}
    
    var width_screen = $( window ).width();
    if (width_screen < 768) {
			/*$(".link-pc").contents().unwrap();*/
		}
	});
});

// BEGIN: fix scroll iOS
var overflowIsHidden = function (node) {
  var style = getComputedStyle(node);
  return style.overflow === "hidden" || style.overflowX === "hidden" || style.overflowY === "hidden";
}

var isItScrollableWithoutVisibleScrollbars = function (el) {
  if (el === null) return false;

  var isScrollable = false,
    hasScrollbars = false;

  isScrollable = el.scrollHeight > el.offsetHeight ? true : false; // first, lets find out if it has scrollable content
  // isScrollable = el.scrollHeight + 1 > el.clientHeight ? true : false; // first, lets find out if it has scrollable content

  if (isScrollable) hasScrollbars = (el.offsetWidth > el.scrollWidth) ? true : false; // if it's scrollable, let's see if it likely has scrollbars
  // if (isScrollable) hasScrollbars = (el.offsetWidth > el.scrollWidth - 1) ? true : false; // if it's scrollable, let's see if it likely has scrollbars

  if (isScrollable && !hasScrollbars && !overflowIsHidden(el)) return true;
  else return false;
};

document.addEventListener("touchmove", function (e) {
  if (document.body.classList.contains("nav--opened")) {
    if ($(e.target).parents("#menu_toggle").length < 1) e.preventDefault();
    else if (!isItScrollableWithoutVisibleScrollbars(document.getElementById("menu_toggle"))) e.preventDefault();
  }
}, {
  passive: false
});

window.addEventListener("resize", function () {
  var _event_ = new Event("touchmove");

  document.dispatchEvent(_event_); // trigger
}, {
  passive: false
});
// END: fix scroll iOS