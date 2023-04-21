document.addEventListener('DOMContentLoaded', () => {
  try {
    setCorrectBurger();
    setCorrectMasks();
    setCorrectPopups();
    setCorrectForms();
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
