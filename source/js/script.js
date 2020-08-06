const ESC_KEYCODE = 27;

const pageHeader = document.querySelector(`.page-header`);
const menuButton = pageHeader.querySelector(`.js-open-menu`);
const openPopupButton = document.querySelector(`.js-open-popup`);
const blackout = document.querySelector(`.blackout`);
const htmlGlobal = document.querySelector(`html`);
const bodyGlobal = document.querySelector(`body`);
const popup = document.querySelector(`.popup`);
const closePopupButton = popup.querySelector(`.js-close-popup-button`);

const inputName = popup.querySelector(`#form-name`);
const inputPhone = popup.querySelector(`#form-phone`);
const checkBoxBuying = popup.querySelector(`#checkbox-buying`);
const checkBoxCaring = popup.querySelector(`#checkbox-caring`);
const checkBoxDetails = popup.querySelector(`#checkbox-details`);
const submitButton = popup.querySelector(`.js-spopup-submit`);

const catalogLink = document.querySelector(`.main-nav__item--catalog .main-nav__link`);
const catalog = document.querySelector(`.main-nav__item--catalog`);

catalogLink.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (!catalog.classList.contains(`main-nav__item--menu-opened`)) {
    catalog.classList.add(`main-nav__item--menu-opened`);
  } else {
    catalog.classList.remove(`main-nav__item--menu-opened`);
  }
});


const resetCheckboxAttribute = (elem) => {
  if (elem.disabled === true) {
    elem.removeAttribute(`disabled`);
  }
};

const resetDisabled = (elem) => {
  if (elem.hasAttribute(`disabled`)) {
    elem.removeAttribute(`disabled`);
  }
};

const resetPopupForm = () => {
  inputName.value = ``;
  inputPhone.value = ``;

  checkBoxBuying.checked = false;
  checkBoxCaring.checked = false;
  checkBoxDetails.checked = false;

  resetCheckboxAttribute(checkBoxBuying);
  resetCheckboxAttribute(checkBoxCaring);
  resetCheckboxAttribute(checkBoxDetails);

  resetDisabled(submitButton);
  resetDisabled(inputName);
};

const showBlackout = () => {
  if (blackout.classList.contains(`blackout--hidden`)) {
    blackout.classList.remove(`blackout--hidden`);
  }
};

const hideBlackout = () => {
  if (!blackout.classList.contains(`blackout--hidden`)) {
    blackout.classList.add(`blackout--hidden`);
  }
};

const blockBackground = () => {
  htmlGlobal.style.paddingLeft = `17px`;
  bodyGlobal.style.overflow = `hidden`;
  bodyGlobal.style.touchAction = `none`;
};

const unBlockBackground = () => {
  htmlGlobal.style.paddingLeft = ``;
  bodyGlobal.style.overflow = ``;
  bodyGlobal.style.touchAction = ``;
};

const checkMenuClosed = () => {
  if (!pageHeader.classList.contains(`page-header--menu-closed`)) {
    pageHeader.classList.add(`page-header--menu-closed`);
  }
};

const closePopup = (block, hiddenClass) => {
  if (!block.classList.contains(hiddenClass)) {
    block.classList.add(hiddenClass);
  }

  hideBlackout();
  unBlockBackground();
  blackout.removeEventListener(`click`, () => {
    closePopup(popup, `popup--hidden`);
  });

  resetPopupForm();
};

const onEscPress = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(popup, `popup--hidden`);
  }
};


menuButton.addEventListener(`click`, () => {
  if (pageHeader.classList.contains(`page-header--menu-closed`)) {
    pageHeader.classList.remove(`page-header--menu-closed`);
  } else {
    pageHeader.classList.add(`page-header--menu-closed`);
  }
});

openPopupButton.addEventListener(`click`, () => {
  if (popup.classList.contains(`popup--hidden`)) {
    checkMenuClosed();

    popup.classList.remove(`popup--hidden`);
    document.addEventListener(`keydown`, onEscPress);
    showBlackout();
    blockBackground();
    blackout.addEventListener(`click`, () => {
      closePopup(popup, `popup--hidden`);
    });
  }
});

const disableBuyingCaringSubmit = () => {
  submitButton.setAttribute(`disabled`, `disabled`);
  checkBoxCaring.disabled = true;
  checkBoxBuying.disabled = true;
};

const disableName = () => {
  inputName.setAttribute(`disabled`, `disabled`);
  resetDisabled(submitButton);
  resetCheckboxAttribute(checkBoxBuying);
  resetCheckboxAttribute(checkBoxCaring);
};


closePopupButton.addEventListener(`click`, () => {
  closePopup(popup, `popup--hidden`);
  document.removeEventListener(`keydown`, onEscPress);
});


checkBoxBuying.addEventListener(`change`, () => {
  if (checkBoxBuying.checked) {
    submitButton.setAttribute(`disabled`, `disabled`);
  } else {
    submitButton.removeAttribute(`disabled`);
  }

  if (checkBoxBuying.checked && checkBoxCaring.checked) {
    disableBuyingCaringSubmit();
  }

  if (checkBoxBuying.checked && checkBoxCaring.checked && checkBoxDetails.checked) {
    disableName();
  }

  if (checkBoxBuying.checked === false && checkBoxCaring.checked === false && checkBoxDetails.checked === false) {
    resetDisabled(inputName);
  }
});

checkBoxCaring.addEventListener(`change`, () => {
  if (checkBoxBuying.checked && checkBoxCaring.checked) {
    disableBuyingCaringSubmit();
  }

  if (checkBoxBuying.checked && checkBoxCaring.checked && checkBoxDetails.checked) {
    disableName();
  }

  if (checkBoxBuying.checked === false && checkBoxCaring.checked === false && checkBoxDetails.checked === false) {
    resetDisabled(inputName);
  }
});


checkBoxDetails.addEventListener(`change`, () => {
  if (checkBoxBuying.checked && checkBoxCaring.checked && checkBoxDetails.checked) {
    disableName();
  }

  if (checkBoxBuying.checked === false && checkBoxCaring.checked === false && checkBoxDetails.checked === false) {
    resetDisabled(inputName);
  }
});
