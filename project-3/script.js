$(document).ready(function() {
  const $title = $('#main-title');
  const $banner = $('#banner');
  const startFontSize = 5; // rem
  const endFontSize = 2;   // rem
  const startPadding = 200;
  const endPadding = 50;
  const scrollDistance = 300;

  // Scroll event: shrink title and show banner
  $(window).on('scroll', function() {
    const scrollY = $(window).scrollTop();

    if (scrollY > 50) {
      $banner.css('transform', 'translateY(0)');
    } else {
      $banner.css('transform', 'translateY(-100%)');
    }

    const progress = Math.min(scrollY / scrollDistance, 1);
    const fontSize = startFontSize - (startFontSize - endFontSize) * progress;
    const padding = startPadding - (startPadding - endPadding) * progress;

    $title.css('font-size', fontSize + 'rem');
    $title.css('padding-top', padding + 'px');
  });

  // FIXED CLICK EVENT
  $(".clickable-image").on("click", function() {
    $(this).siblings(".info-tab").toggleClass("show");
  });

});
