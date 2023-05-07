"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
document.addEventListener('DOMContentLoaded', function () {
  try {
    setCorrectBurger();
    setCorrectMasks();
    setCorrectPopups();
    setCorrectForms();
    setCorrectSliders();
    setCorrectGallery();
    setCorrectVideo();
    setCorrectTabs();
    setCorrectAccordeon();
  } catch (err) {}
});

// Работа бургера
function setCorrectBurger() {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  var header = document.querySelector('.header');
  var interactionObjs = [document.documentElement, nav, header];
  document.addEventListener('click', function (event) {
    if (event.target.closest('.burger') === burger) {
      interactionObjs.forEach(function (elem) {
        elem.classList.toggle('active');
      });
    } else if (event.target.closest('.header') && event.target.closest('.nav') !== nav) {
      interactionObjs.forEach(function (elem) {
        elem.classList.remove('active');
      });
    }
  });
}

// Маски на инпуты
function setCorrectMasks() {
  var inputTels = document.querySelectorAll('input[type="tel"]');
  var im = new Inputmask("+7-(999)-999-99-99", {
    clearMaskOnLostFocus: false
  });
  inputTels.forEach(function (inputTel) {
    im.mask(inputTel);
  });
}

// Попапы
function setCorrectPopups() {
  var popups = document.getElementsByClassName('popup');
  var triggers = document.querySelectorAll('.trigger');
  var resetTriggers = document.querySelectorAll('.reset-trigger');
  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var popupSelector = trigger.dataset.popupSelector;
      var popup = document.querySelector(popupSelector);
      var closeButton = popup.querySelector('.close');
      var hidePopup = function hidePopup(event) {
        if ((event.target === popup || event.target.closest('.close') === closeButton) && !event.target.closest('.trigger')) {
          popup.classList.remove('active');
          document.documentElement.classList.remove('active');
          document.removeEventListener('click', hidePopup);
        }
      };
      if (trigger.closest('form')) {
        // Чтобы появился класс 'success' - нужно время => делаем микротаску и логику пишем в ней
        setTimeout(function () {
          if (trigger.classList.contains('success')) {
            popup.classList.add('active');
            document.documentElement.classList.add('active');
            document.addEventListener('click', hidePopup);
            trigger.classList.remove('success');
          }
        }, 0);
      } else {
        popup.classList.add('active');
        // Без микротаски происходит сброс класса при нажатии на кнопку в шапке
        setTimeout(function () {
          document.documentElement.classList.add('active');
        }, 0);
        document.addEventListener('click', hidePopup);
        closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', hidePopup);
      }
    });
  });
  resetTriggers.forEach(function (resetTrigger) {
    resetTrigger.addEventListener('click', function () {
      var _iterator = _createForOfIteratorHelper(popups),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var popup = _step.value;
          if (popup.classList.contains('active')) {
            popup.classList.remove('active');
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  });
}

// Формы
function setCorrectForms() {
  // document.querySelectorAll('form').forEach((form) => form.onsubmit = () => false);

  var formOrders = document.querySelectorAll('.order-form');
  formOrders.forEach(function (formOrder) {
    formOrder.addEventListener('submit', function (event) {
      var telUser = formOrder['tel-number'].value;
      var telNumber = telUser.replace(/[(]|[)]|[-+]|[_]/g, '');
      var requiredLength = 11;
      if (telNumber.length === requiredLength) {
        formOrder['submit-btn'].classList.add('success');
        formOrder.reset();
      }
      event.preventDefault();
    });
  });
}

// Слайдеры
function setCorrectSliders() {
  // Слайдер с документами
  var docsSliderActivate = function docsSliderActivate() {
    var docsSlider = document.querySelector('.docs-slider');
    var counter = document.querySelector('.slider-counter');
    var counterNow = counter.querySelector('.slider-counter__now');
    var counterMax = counter.querySelector('.slider-counter__max');
    var docsSwiper = new Swiper(docsSlider, {
      grabCursor: true,
      speed: 800,
      type: 'fraction',
      navigation: {
        nextEl: '.slider-outer__nav_to-next',
        prevEl: '.slider-outer__nav_to-prev'
      },
      pagination: {
        el: '.slider-outer__pagination',
        clickable: true
      }
    });
    counterNow.innerText = docsSwiper.activeIndex + 1;
    counterMax.innerText = docsSwiper.slides.length;
    docsSwiper.on('slideChange', function () {
      counterNow.innerText = docsSwiper.activeIndex + 1;
    });
  };

  // Слайдеры с проблемой-решением
  var problemSolveSliderActivate = function problemSolveSliderActivate() {
    var problemSlider = document.querySelector('.problem__slider');
    var solveSlider = document.querySelector('.solve__slider');
    var counterNow = document.querySelector('.extra-status__now');
    var counterMax = document.querySelector('.extra-status__max');
    var problemSwiper = new Swiper(problemSlider, {
      grabCursor: true,
      speed: 700,
      navigation: {
        nextEl: '.extra__nav_to-next',
        prevEl: '.extra__nav_to-prev'
      }
    });
    var solveSwiper = new Swiper(solveSlider, {
      grabCursor: true,
      speed: 700
    });

    // Ставим слайдеры в зависимости друг от друга
    problemSwiper.controller.control = solveSwiper;
    solveSwiper.controller.control = problemSwiper;

    // Изменение статуса
    counterNow.innerText = problemSwiper.activeIndex + 1;
    counterMax.innerText = problemSwiper.slides.length;
    problemSwiper.on('slideChange', function () {
      counterNow.innerText = problemSwiper.activeIndex + 1;
    });
  };

  // Слайдер с видео
  var videoSliderActivate = function videoSliderActivate() {
    var videoSlider = document.querySelector('.slider-video');
    var videoSwiper = new Swiper(videoSlider, {
      grabCursor: true,
      slidesPerView: 1,
      breakpoints: {
        1270: {
          slidesPerView: 3
        },
        600: {
          slidesPerView: 2
        }
      },
      navigation: {
        prevEl: '.slider-all-container__nav_to-prev.to-video',
        nextEl: '.slider-all-container__nav_to-next.to-video'
      }
    });
  };

  // Слайдер с текстом
  var textSliderActivate = function textSliderActivate() {
    var textSlider = document.querySelector('.slider-text');
    var textSwiper = new Swiper(textSlider, {
      grabCursor: true,
      slidesPerView: 1,
      navigation: {
        prevEl: '.slider-all-container__nav_to-prev.to-text',
        nextEl: '.slider-all-container__nav_to-next.to-text'
      }
    });
  };
  docsSliderActivate();
  problemSolveSliderActivate();
  videoSliderActivate();
  textSliderActivate();
}

// Всплывающая галерея
function setCorrectGallery() {
  Fancybox.bind("[data-fancybox]", {
    contentClick: "iterateZoom",
    Images: {
      Panzoom: {
        maxScale: 2
      }
    }
  });
}

// Воспроизведение видео
function setCorrectVideo() {
  // Видео-обращение основателя
  var videoAppealActivate = function videoAppealActivate() {
    var videoAppeal = document.querySelector('.appeal__video');
    var videoAppealActionBlock = document.querySelector('.video-play');
    var videoAppealBtn = document.querySelector('.video-play__button');
    videoAppealActionBlock.addEventListener('click', function () {
      videoAppeal.play();
      videoAppeal.controls = true;
      videoAppeal.volume = 0.2;
      videoAppealActionBlock.style.display = 'none';
    });
  };

  // Видео из слайдов с видео
  var videoSlidesActivate = function videoSlidesActivate() {
    var videosBlocks = document.querySelectorAll('.slider-video-slide');
    videosBlocks.forEach(function (videoBlock) {
      videoBlock.addEventListener('click', function (event) {
        var playBtn = event.target.closest('.slider-video__play');
        if (!!playBtn) {
          var video = videoBlock.querySelector('video');
          video.volume = 0.2;
          video.controls = true;
          video.play();
          playBtn.style.display = 'none';
        }
      });
    });
  };
  videoAppealActivate();
  videoSlidesActivate();
}

// Табы
function setCorrectTabs() {
  var tabsBlock = document.querySelector('.reviews-tabs');
  var tabs = tabsBlock.querySelectorAll('.reviews-tabs__tab');
  var resetAll = function resetAll() {
    tabs.forEach(function (tab) {
      tab.classList.remove('active');
      var linkedSelector = tab.dataset.linkedSelector;
      var linkedNode = document.querySelector(linkedSelector);
      linkedNode.style.display = 'none';
    });
  };
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      resetAll();
      tab.classList.add('active');
      var linkedSelector = tab.dataset.linkedSelector;
      var linkedNode = document.querySelector(linkedSelector);
      linkedNode.style.display = 'block';
    });
  });
}

// Аккордеон
function setCorrectAccordeon() {
  var accordeonItems = document.querySelectorAll('.questions-list .question');
  var unActiveAllExceptOne = function unActiveAllExceptOne(exceptItem) {
    accordeonItems.forEach(function (item) {
      if (item === exceptItem) return;
      item.classList.remove('active');
    });
  };
  accordeonItems.forEach(function (item) {
    item.addEventListener('click', function () {
      unActiveAllExceptOne(item);
      item.classList.toggle('active');
    });
  });
}