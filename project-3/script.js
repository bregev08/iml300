$(document).ready(function() {
  const $title = $('#main-title');
  const $banner = $('#banner');

  const startFont = 15;
  const endFont = 4;

  const startOffset = 0;
  const endOffset = -120;

  const scrollRange = 250;

  $(window).on('scroll', function () {
    const y = $(window).scrollTop();

    const t = Math.min(Math.max(y / scrollRange, 0), 1);

    const fontSize = startFont + (endFont - startFont) * t;
    $title.css('font-size', fontSize + 'rem');

    const offset = startOffset + (endOffset - startOffset) * t;
    $title.css('transform', `translateY(${offset}px)`);

    if (t === 1) {
      $banner.css('transform', 'translateY(0)');
    } else {
      $banner.css('transform', 'translateY(-100%)');
    }
  });

  $(".clickable-image").click(function () {
    $(this).siblings(".info-tab-left, .info-tab-right").toggleClass("show");
  });

  $title.on("click", function () {
    $("html, body").animate({
      scrollTop: $("#region-start").offset().top
    }, 800);
  });
});
