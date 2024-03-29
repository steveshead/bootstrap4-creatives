(function() {
  $(window).scroll(function() {
    var top = $(document).scrollTop();
    if (top > 50)
      $('#home > .navbar').removeClass('navbar-transparent');
    else
      $('#home > .navbar').addClass('navbar-transparent');
  });

  $("a[href='#']").click(function(e) {
    e.preventDefault();
  });

  $('.bs-component [data-toggle="popover"]').popover();
  $('.bs-component [data-toggle="tooltip"]').tooltip();
  $(".bs-component").each(function() {
    var $button = $("<button class='source-button btn btn-primary btn-xs' role='button' tabindex='0'>&lt; &gt;</button>");
    $(this).append($button);
  });

  $('body').on('click', '.source-button', function(e) {
    e.preventDefault();

    var html = $(this).parent().html();
    html = cleanSource(html);
    $("#source-modal pre").text(html);
    $("#source-modal").modal();
  });

  function cleanSource(html) {
    html = html.replace(/×/g, "&times;")
      .replace(/«/g, "&laquo;")
      .replace(/»/g, "&raquo;")
      .replace(/←/g, "&larr;")
      .replace(/→/g, "&rarr;");

    var lines = html.split(/\n/);

    lines.shift();
    lines.splice(-1, 1);

    var indentSize = lines[0].length - lines[0].trim().length,
      re = new RegExp(" {" + indentSize + "}");

    lines = lines.map(function(line) {
      if (line.match(re)) {
        line = line.substring(indentSize);
      }

      return line;
    });

    lines = lines.join("\n");

    return lines;
  }

})();

// inspired by https://css-tricks.com/snippets/jquery/smooth-scrolling/

var TopOffset = 85;

$('a[data-smooth]').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - TopOffset
      }, 1000);
      return false;
    }
  }
});

// Sticky navbar
// =========================
$(document).ready(function() {
  // Custom function which toggles between sticky class (is-sticky)
  var stickyToggle = function(sticky, stickyWrapper, scrollElement) {
    var stickyHeight = sticky.outerHeight();
    var stickyTop = stickyWrapper.offset().top;
    if (scrollElement.scrollTop() >= stickyTop) {
      stickyWrapper.height(stickyHeight);
      sticky.addClass("is-sticky");
    } else {
      sticky.removeClass("is-sticky");
      stickyWrapper.height('auto');
    }
  };

  // Find all data-toggle="sticky-onscroll" elements
  $('[data-toggle="sticky-onscroll"]').each(function() {
    var sticky = $(this);
    var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
    sticky.before(stickyWrapper);
    sticky.addClass('sticky');

    // Scroll & resize events
    $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function() {
      stickyToggle(sticky, stickyWrapper, $(this));
    });

    // On page load
    stickyToggle(sticky, stickyWrapper, $(window));
  });
});

// smooth scrolling inspired by https://css-tricks.com/snippets/jquery/smooth-scrolling/

var TopOffset = -20;

$('a[data-smooth]').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - TopOffset
          }, 1000);
          return false;
        }
      }
    });

// lightbox gallery
    $(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});
