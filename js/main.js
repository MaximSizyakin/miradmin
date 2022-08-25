$(document).ready(function ($) {
  "use strict";
  new WOW().init();

  $(window).on("load", function () {
    $(window).trigger("scroll");
    $(window).trigger("resize");
  });

  $(document).on("ready", function () {
    $(window).trigger("resize");
    mobileMenu();
  });
  // Preloader
  $(".st-preloader-wave").fadeOut();
  $("#st-preloader").delay(150).fadeOut("slow");
  // Main Menu function
  $(".st-nav-toggle").on("click", function () {
    $(this).siblings(".st-nav").slideToggle();
    $(this).toggleClass("st-active");
  });
  // Mobile Menu
  $(window).on("resize", function () {
    mobileMenu();
  });
  function mobileMenu() {
    if ($(window).width() <= 991) {
      $(".st-header").addClass("st-mobile-header");
      $(".st-nav, .st-vertical-nav-wrap")
        .addClass("st-mobile-nav")
        .removeClass("st-desktop-nav");
    } else {
      $(".st-header").removeClass("st-mobile-header");
      $(".st-nav, .st-vertical-nav-wrap")
        .addClass("st-desktop-nav")
        .removeClass("st-mobile-nav");
    }
  }
  // Sticky Header
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $(".st-header").addClass("st-sticky-active");
      $(".st-sticky-menu .st-desktop-nav .st-vertical-nav-list").slideUp();
      $(".st-vertical-nav-btn").removeClass("st-vertical-nav-perform");
    } else {
      $(".st-header").removeClass("st-sticky-active");
      $(".st-sticky-menu .st-desktop-nav .st-vertical-nav-list").slideDown();
      $(".st-vertical-nav-btn").addClass("st-vertical-nav-perform");
    }
  });
  // Click To Go Top
  $(".smooth-scroll").on("click", function () {
    var thisAttr = $(this).attr("href");
    if ($(thisAttr).length) {
      var scrollPoint = $(thisAttr).offset().top - 50;
      $("body,html").animate(
        {
          scrollTop: scrollPoint,
        },
        600
      );
    }
    return false;
  });
  // One Page Active Class
  var topLimit = 300,
    ultimateOffset = 200;
  $(".onepage-nav").each(function () {
    var $this = $(this),
      $parent = $this.parent(),
      current = null,
      $findLinks = $this.find("a");
    function getHeader(top) {
      var last = $findLinks.first();
      if (top < topLimit) {
        return last;
      }
      for (var i = 0; i < $findLinks.length; i++) {
        var $link = $findLinks.eq(i),
          href = $link.attr("href");

        if (href.charAt(0) === "#" && href.length > 1) {
          var $anchor = $(href).first();
          if ($anchor.length > 0) {
            var offset = $anchor.offset();
            if (top < offset.top - ultimateOffset) {
              return last;
            }
            last = $link;
          }
        }
      }
      return last;
    }
    $(window).on("scroll", function () {
      var top = window.scrollY,
        height = $this.outerHeight(),
        max_bottom = $parent.offset().top + $parent.outerHeight(),
        bottom = top + height + ultimateOffset;
      var $current = getHeader(top);
      if (current !== $current) {
        $this.find(".active").removeClass("active");
        $current.addClass("active");
        current = $current;
      }
    });
  });
  // Background Image (Isotop section) (JQ3)
  $(".st-bg").each(function () {
    var src = $(this).attr("data-src");
    $(this).css({
      "background-image": "url(" + src + ")",
    });
  });
  // Owl Carousel (JQ3)
  // Service Carousel
  $(".st-service-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    navText: [
      '<i class="flaticon-left"></i>',
      '<i class="flaticon-right"></i>',
    ],
    autoplay: false,
    smartSpeed: 1000,
    autoplayTimeout: 5000,
    responsive: {
      0: {
        items: 1,
      },
      767: {
        items: 2,
      },
      991: {
        items: 3,
      },
    },
  });
  // Client Carousel
  $(".st-client-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    navText: false,
    autoplay: false,
    smartSpeed: 1000,
    autoplayTimeout: 5000,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      800: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    },
  });
  // Member Carousel
  $(".st-member-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    navText: [
      '<i class="flaticon-left"></i>',
      '<i class="flaticon-right"></i>',
    ],
    autoplay: false,
    smartSpeed: 500,
    autoplayTimeout: 4000,
    responsive: {
      0: {
        items: 1,
      },
      575: {
        items: 2,
      },
      991: {
        items: 3,
      },
      1199: {
        items: 4,
      },
    },
  });
  // Testimonial Slider
  $(".st-testimonial-slider").owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    nav: true,
    navText: [
      '<i class="flaticon-left"></i>',
      '<i class="flaticon-right"></i>',
    ],
    dots: false,
    autoplay: false,
    autoplayHoverPause: false,
    smartSpeed: 500,
    autoplayTimeout: 5000,
  });
  // Progress Bar (JQ3)
  $(".st-progressbar").each(function () {
    var progressPercentage = $(this).data("progress-percentage") + "%";
    progressPercentage = "calc(" + progressPercentage + " - 4px)";
    $(this).find(".st-progressbar-in").css("width", progressPercentage);
  });
  // Ajax Contact Form (JQ3)
  $("#cf-msg").hide();
  $("#cf #submit").on("click", function () {
    var name = $("#name").val();
    var subject = $("#subject").val();
    var email = $("#email").val();
    var msg = $("#msg").val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      $("#cf-msg")
        .fadeIn()
        .html(
          '<div class="alert alert-danger"><strong>Предупреждение!</strong> Введите Верный Email.</div>'
        );
      return false;
    }
    name = $.trim(name);
    subject = $.trim(subject);
    email = $.trim(email);
    msg = $.trim(msg);
    if (name != "" && email != "" && msg != "") {
      var values =
        "name=" +
        name +
        "&subject=" +
        subject +
        "&email=" +
        email +
        " &msg=" +
        msg;
      $.ajax({
        type: "POST",
        url: "/php/mail.php",
        data: values,
        success: function () {
          $("#name").val("");
          $("#subject").val("");
          $("#email").val("");
          $("#msg").val("");

          $("#cf-msg")
            .fadeIn()
            .html(
              '<div class="alert alert-success"><strong>Успешно!</strong> Email Успешно Отправлен.</div>'
            );
          setTimeout(function () {
            $("#cf-msg").fadeOut("slow");
          }, 4000);
        },
      });
    } else {
      $("#cf-msg")
        .fadeIn()
        .html(
          '<div class="alert alert-danger"><strong>Предупреждение!</strong> Заполните Все Поля.</div>'
        );
    }
    return false;
  });
  //Isotop Initialize (JQ3)
  $(".st-isotop").isotope({
    itemSelector: ".st-isotop-item",
    transitionDuration: "0.60s",
    percentPosition: true,
    masonry: {
      columnWidth: ".st-grid-sizer",
    },
  });
  // Sticky Footer
  var footerHeight = $(".st-sticky-footer").height();
  var windowHeight = $(window).height();
  var footerHeightPx = footerHeight + "px";
  $(".st-content").css("margin-bottom", footerHeightPx);
  //Counter (JQ3)
  $(".st-counter").counter({
    duration: 2000,
  });
  //Map Bar (JQ3)
  $(".st-map-bar").on("click", function () {
    $(this).toggleClass("st-bar-active").siblings(".st-map-wrpa").slideToggle();
  });
});
