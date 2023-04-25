document.addEventListener('DOMContentLoaded', () => {
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
  } catch(err) { 
  }
});


// Работа бургера
function setCorrectBurger() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.header');
  const interactionObjs = [document.documentElement, nav, header];

  document.addEventListener('click', (event) => {
    if (event.target.closest('.burger') === burger) {
      interactionObjs.forEach((elem) => {
        elem.classList.toggle('active');
      });
    } else if (event.target.closest('.header') && event.target.closest('.nav') !== nav) {
      interactionObjs.forEach((elem) => {
        elem.classList.remove('active');
      });
    }
  });
}

// Маски на инпуты
function setCorrectMasks() {
  const inputTels = document.querySelectorAll('input[type="tel"]');
  const im = new Inputmask("+7-(999)-999-99-99", { clearMaskOnLostFocus: false });

  inputTels.forEach((inputTel) => {
    im.mask(inputTel);
  });
}

// Попапы
function setCorrectPopups() {
  const popups = document.getElementsByClassName('popup');
  const triggers = document.querySelectorAll('.trigger');
  const resetTriggers = document.querySelectorAll('.reset-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const popupSelector = trigger.dataset.popupSelector;
      const popup = document.querySelector(popupSelector);
      const closeButton = popup.querySelector('.close');
      
      const hidePopup = (event) => {
        if ((event.target === popup || event.target.closest('.close') === closeButton) 
            && !event.target.closest('.trigger')) {
          popup.classList.remove('active');
          document.documentElement.classList.remove('active');
          document.removeEventListener('click', hidePopup);
        }
      };

      if (trigger.closest('form')) {
        // Чтобы появился класс 'success' - нужно время => делаем микротаску и логику пишем в ней
        setTimeout(() => {
          if (trigger.classList.contains('success')) {
            popup.classList.add('active');
            document.documentElement.classList.add('active');

            document.addEventListener('click', hidePopup);
            trigger.classList.remove('success');
          }
        }, 0);
      } else {
        popup.classList.add('active');
        document.documentElement.classList.add('active');

        document.addEventListener('click', hidePopup);
        closeButton?.addEventListener('click', hidePopup);
      }
    });
  });

  resetTriggers.forEach((resetTrigger) => {
    resetTrigger.addEventListener('click', () => {
      for (const popup of popups) {
        if (popup.classList.contains('active')) {
          popup.classList.remove('active');
        }
      }
    });
  });
}

// Формы
function setCorrectForms() {
  // document.querySelectorAll('form').forEach((form) => form.onsubmit = () => false);

  const formOrders = document.querySelectorAll('.order-form');

  formOrders.forEach((formOrder) => {
    formOrder.addEventListener('submit', (event) => {
      const telUser = formOrder['tel-number'].value;
      const telNumber = telUser.replace(/[(]|[)]|[-+]|[_]/g, '');
      const requiredLength = 11;

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
  const docsSliderActivate = () => {
    const docsSlider = document.querySelector('.docs-slider');
    const counter = document.querySelector('.slider-counter');
    const counterNow = counter.querySelector('.slider-counter__now');
    const counterMax = counter.querySelector('.slider-counter__max');

    const docsSwiper = new Swiper(docsSlider, {
      grabCursor: true,
      speed: 800,
      type: 'fraction',
      navigation: {
        nextEl: '.slider-outer__nav_to-next',
        prevEl: '.slider-outer__nav_to-prev',
      },
      pagination: {
        el: '.slider-outer__pagination',
        clickable: true,
      }
    });

    counterNow.innerText = docsSwiper.activeIndex + 1;
    counterMax.innerText = docsSwiper.slides.length;
    docsSwiper.on('slideChange', () => {
      counterNow.innerText = docsSwiper.activeIndex + 1;
    });
  };

  // Слайдеры с проблемой-решением
  const problemSolveSliderActivate = () => {
    const problemSlider = document.querySelector('.problem__slider');
    const solveSlider = document.querySelector('.solve__slider');
    const counterNow = document.querySelector('.extra-status__now');
    const counterMax = document.querySelector('.extra-status__max');

    const problemSwiper = new Swiper(problemSlider, {
      grabCursor: true,
      speed: 700,
      navigation: {
        nextEl: '.extra__nav_to-next',
        prevEl: '.extra__nav_to-prev',
      },
    });
    const solveSwiper = new Swiper(solveSlider, {
      grabCursor: true,
      speed: 700,
    });

    // Ставим слайдеры в зависимости друг от друга
    problemSwiper.controller.control = solveSwiper;
    solveSwiper.controller.control = problemSwiper;

    // Изменение статуса
    counterNow.innerText = problemSwiper.activeIndex + 1;
    counterMax.innerText = problemSwiper.slides.length;
    problemSwiper.on('slideChange', () => {
      counterNow.innerText = problemSwiper.activeIndex + 1;
    });
  };

  // Слайдер с видео
  const videoSliderActivate = () => {
    const videoSlider = document.querySelector('.slider-video');
    const videoSwiper = new Swiper(videoSlider, {
      grabCursor: true,
      slidesPerView: 1,

      breakpoints: {
        1270: {
          slidesPerView: 3,
        },

        600: {
          slidesPerView: 2,
        }
      },

      navigation: {
        prevEl: '.slider-all-container__nav_to-prev.to-video',
        nextEl: '.slider-all-container__nav_to-next.to-video',
      }
    });
  }

  // Слайдер с текстом
  const textSliderActivate = () => {
    const textSlider = document.querySelector('.slider-text');
    const textSwiper = new Swiper(textSlider, {
      grabCursor: true,
      slidesPerView: 1,

      navigation: {
        prevEl: '.slider-all-container__nav_to-prev.to-text',
        nextEl: '.slider-all-container__nav_to-next.to-text',
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
        maxScale: 2,
      },
    },
  });
}

// Воспроизведение видео
function setCorrectVideo() {
  // Видео-обращение основателя
  const videoAppealActivate = () => {
    const videoAppeal = document.querySelector('.appeal__video');
    const videoAppealActionBlock = document.querySelector('.video-play');
    const videoAppealBtn = document.querySelector('.video-play__button');

    videoAppealActionBlock.addEventListener('click', () => {
      videoAppeal.play();
      videoAppeal.controls = true;
      videoAppeal.volume = 0.2;

      videoAppealActionBlock.style.display = 'none';
    });
  };

  // Видео из слайдов с видео
  const videoSlidesActivate = () => {
    const videosBlocks = document.querySelectorAll('.slider-video-slide');
    
    videosBlocks.forEach((videoBlock) => {
      videoBlock.addEventListener('click', (event) => {
        const playBtn = event.target.closest('.slider-video__play');

        if (!!playBtn) {
          const video = videoBlock.querySelector('video');
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
  const tabsBlock = document.querySelector('.reviews-tabs');
  const tabs = tabsBlock.querySelectorAll('.reviews-tabs__tab');
  const resetAll = () => {
    tabs.forEach((tab) => {
      tab.classList.remove('active');

      const linkedSelector = tab.dataset.linkedSelector;
      const linkedNode = document.querySelector(linkedSelector);

      linkedNode.style.display = 'none';
    });
  };


  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      resetAll();
      tab.classList.add('active');
      
      const linkedSelector = tab.dataset.linkedSelector;
      const linkedNode = document.querySelector(linkedSelector);

      linkedNode.style.display = 'block';
    })
  })
}

// Аккордеон
function setCorrectAccordeon() {
  const accordeonItems = document.querySelectorAll('.questions-list .question');
  const unActiveAllExceptOne = (exceptItem) => {
    accordeonItems.forEach((item) => {
      if (item === exceptItem) return;
      item.classList.remove('active');
    });
  };

  accordeonItems.forEach((item) => {
    item.addEventListener('click', () => {
      unActiveAllExceptOne(item);
      item.classList.toggle('active');
    });
  });
}

