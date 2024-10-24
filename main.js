<script>
document.addEventListener("DOMContentLoaded", function() {
  // LENIS SMOOTH SCROLL
  let lenis;
  if (Webflow.env("editor") === undefined) {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.2,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  $("[data-lenis-start]").on("click", function () {
    lenis.start();
  });
  $("[data-lenis-stop]").on("click", function () {
    lenis.stop();
  });
  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  // SPLIT TEXT ANIMATION
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 90%",
      onEnter: () => timeline.play(),
      once: true
    });
  }

  $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    gsap.set($(this).find(".char"), { willChange: "transform, opacity" });
    tl.from($(this).find(".char"), { opacity: 0, yPercent: 100, duration: 1.2, ease: "power4.out(2)", stagger: { amount: 0.3 } });
    createScrollTrigger($(this), tl);
  });
  
  let isMenuOpen = false;
  let tl = gsap.timeline({ paused: true });
  tl.from($("[letters-slide-up-click]").find(".char"), { delay: 0.5, opacity: 1, yPercent: 100, duration: 1, ease: "power4.out(2)", stagger: { amount: 0.3 } });

  $(".burger-menu").on("click", function () {
    if (!isMenuOpen) {
      tl.play();
      isMenuOpen = true;
    } else {
      tl.reverse();
      isMenuOpen = false;
    }
  });

  $(".close-menu").on("click", function () {
    if (isMenuOpen) {
      tl.reverse();
      isMenuOpen = false;
    }
  });

  gsap.set("[text-split]", { opacity: 1 });

  // NAVBAR MOBILE DROPDOWN
  $('.platform-url, .modules-url').on('click', function() {
    let $block, $arrow;

    if ($(this).hasClass('platform-url')) {
      $block = $('.platform-cn');
      $arrow = $('.drop-arrow-mob');
    } else if ($(this).hasClass('modules-url')) {
      $block = $('.modules-cn');
      $arrow = $('.drop-arrow-mob-2');
    }

    if ($block.height() === 0) {
      $block.css('height', 'auto');
      let autoHeight = $block.height(); 
      $block.css('height', '0'); 
      $block.animate({ height: autoHeight }, 300);

      $arrow.css({ transition: 'transform 0.3s', transform: 'rotate(180deg)' });
    } else {
      $block.animate({ height: 0 }, 300); 
      $arrow.css({ transition: 'transform 0.3s', transform: 'rotate(0deg)' });
    }
  });

  $('.trigger-close').on('click', function() {
    let $platformBlock = $('.platform-cn');
    let $modulesBlock = $('.modules-cn');
    let $platformArrow = $('.drop-arrow-mob');
    let $modulesArrow = $('.drop-arrow-mob-2');

    if ($platformBlock.height() > 0) {
      $platformBlock.animate({ height: 0 }, 300);
      $platformArrow.css({ transition: 'transform 0.3s', transform: 'rotate(0deg)' });
    }
    if ($modulesBlock.height() > 0) {
      $modulesBlock.animate({ height: 0 }, 300);
      $modulesArrow.css({ transition: 'transform 0.3s', transform: 'rotate(0deg)' });
    }
  });

  // STAGGER WORDS ON HOVER (GSAP)
  let splitText;

  function runSplit() {
    splitText = new SplitType("[stagger-link]", {
      types: "words, chars"
    });
  }

  runSplit();

  let windowWidth = window.innerWidth;
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (windowWidth !== window.innerWidth) {
        windowWidth = window.innerWidth;
        splitText.revert();
        runSplit();
      }
    }, 250);
  });

  const staggerLinks = document.querySelectorAll("[stagger-link]");
  staggerLinks.forEach((link) => {
    const letters = link.querySelectorAll("[stagger-link-text] .char");
    link.addEventListener("mouseenter", function () {
      gsap.to(letters, {
        yPercent: -100,
        duration: 0.25,
        ease: "power4.Out",
        stagger: { each: 0.020, from: "start" },
        overwrite: true
      });
    });
    link.addEventListener("mouseleave", function () {
      gsap.to(letters, {
        yPercent: 0,
        duration: 0.25,
        ease: "power4.Out",
        stagger: { each: 0.020, from: "end" }
      });
    });
  });

  // PARALLAX IMG
  const parallaxElements = document.querySelectorAll('.parallax');

  if (parallaxElements.length > 0) {
    parallaxElements.forEach(function(parallaxElement) {
      if (parallaxElement.complete) {
        initializeParallax(parallaxElement);
      } else {
        parallaxElement.addEventListener('load', function() {
          initializeParallax(parallaxElement);
        });
      }
    });
  }

  function initializeParallax(element) {
    new Ukiyo(element, {
      scale: 1.15,
      speed: 1.15,
      willChange: true,
      externalRAF: false
    });
    element.style.zIndex = '1';
  }

  // Update meta viewport
  document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
});
</script>
