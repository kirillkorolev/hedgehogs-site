"use strict";

var ESC_KEYCODE = 27;
var pageHeader = document.querySelector(".page-header");
var menuButton = pageHeader.querySelector(".js-open-menu");
var openPopupButton = document.querySelector(".js-open-popup");
var blackout = document.querySelector(".blackout");
var htmlGlobal = document.querySelector("html");
var bodyGlobal = document.querySelector("body");
var popup = document.querySelector(".popup");
var closePopupButton = popup.querySelector(".js-close-popup-button");
var inputName = popup.querySelector("#form-name");
var inputPhone = popup.querySelector("#form-phone");
var checkBoxBuying = popup.querySelector("#checkbox-buying");
var checkBoxCaring = popup.querySelector("#checkbox-caring");
var checkBoxDetails = popup.querySelector("#checkbox-details");
var submitButton = popup.querySelector(".js-spopup-submit");
var catalogLink = document.querySelector(".main-nav__item--catalog .main-nav__link");
var catalog = document.querySelector(".main-nav__item--catalog");
catalogLink.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (!catalog.classList.contains("main-nav__item--menu-opened")) {
    catalog.classList.add("main-nav__item--menu-opened");
  } else {
    catalog.classList.remove("main-nav__item--menu-opened");
  }
});

var resetCheckboxAttribute = function resetCheckboxAttribute(elem) {
  if (elem.disabled === true) {
    elem.removeAttribute("disabled");
  }
};

var resetDisabled = function resetDisabled(elem) {
  if (elem.hasAttribute("disabled")) {
    elem.removeAttribute("disabled");
  }
};

var resetPopupForm = function resetPopupForm() {
  inputName.value = "";
  inputPhone.value = "";
  checkBoxBuying.checked = false;
  checkBoxCaring.checked = false;
  checkBoxDetails.checked = false;
  resetCheckboxAttribute(checkBoxBuying);
  resetCheckboxAttribute(checkBoxCaring);
  resetCheckboxAttribute(checkBoxDetails);
  resetDisabled(submitButton);
  resetDisabled(inputName);
};

var showBlackout = function showBlackout() {
  if (blackout.classList.contains("blackout--hidden")) {
    blackout.classList.remove("blackout--hidden");
  }
};

var hideBlackout = function hideBlackout() {
  if (!blackout.classList.contains("blackout--hidden")) {
    blackout.classList.add("blackout--hidden");
  }
};

var blockBackground = function blockBackground() {
  htmlGlobal.style.paddingLeft = "17px";
  bodyGlobal.style.overflow = "hidden";
  bodyGlobal.style.touchAction = "none";
};

var unBlockBackground = function unBlockBackground() {
  htmlGlobal.style.paddingLeft = "";
  bodyGlobal.style.overflow = "";
  bodyGlobal.style.touchAction = "";
};

var checkMenuClosed = function checkMenuClosed() {
  if (!pageHeader.classList.contains("page-header--menu-closed")) {
    pageHeader.classList.add("page-header--menu-closed");
  }
};

var closePopup = function closePopup(block, hiddenClass) {
  if (!block.classList.contains(hiddenClass)) {
    block.classList.add(hiddenClass);
  }

  hideBlackout();
  unBlockBackground();
  blackout.removeEventListener("click", function () {
    closePopup(popup, "popup--hidden");
  });
  resetPopupForm();
};

var onEscPress = function onEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(popup, "popup--hidden");
  }
};

menuButton.addEventListener("click", function () {
  if (pageHeader.classList.contains("page-header--menu-closed")) {
    pageHeader.classList.remove("page-header--menu-closed");
  } else {
    pageHeader.classList.add("page-header--menu-closed");
  }
});
openPopupButton.addEventListener("click", function () {
  if (popup.classList.contains("popup--hidden")) {
    checkMenuClosed();
    popup.classList.remove("popup--hidden");
    document.addEventListener("keydown", onEscPress);
    showBlackout();
    blockBackground();
    blackout.addEventListener("click", function () {
      closePopup(popup, "popup--hidden");
    });
  }
});

var disableBuyingCaringSubmit = function disableBuyingCaringSubmit() {
  submitButton.setAttribute("disabled", "disabled");
  checkBoxCaring.disabled = true;
  checkBoxBuying.disabled = true;
};

var disableName = function disableName() {
  inputName.setAttribute("disabled", "disabled");
  resetDisabled(submitButton);
  resetCheckboxAttribute(checkBoxBuying);
  resetCheckboxAttribute(checkBoxCaring);
};

closePopupButton.addEventListener("click", function () {
  closePopup(popup, "popup--hidden");
  document.removeEventListener("keydown", onEscPress);
});
checkBoxBuying.addEventListener("change", function () {
  if (checkBoxBuying.checked) {
    submitButton.setAttribute("disabled", "disabled");
  } else {
    submitButton.removeAttribute("disabled");
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
checkBoxCaring.addEventListener("change", function () {
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
checkBoxDetails.addEventListener("change", function () {
  if (checkBoxBuying.checked && checkBoxCaring.checked && checkBoxDetails.checked) {
    disableName();
  }

  if (checkBoxBuying.checked === false && checkBoxCaring.checked === false && checkBoxDetails.checked === false) {
    resetDisabled(inputName);
  }
});