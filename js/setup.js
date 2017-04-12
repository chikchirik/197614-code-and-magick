'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

var setup = document.querySelector('.setup');
var setupOverlay = document.querySelector('.overlay');
var coat = setup.querySelector('.wizard-coat');
var eyes = setup.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');
var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var randElement = function (mass) {
  return mass[Math.floor(Math.random() * mass.length)];
};

var wizards = [];

function createWizard() {
  var wizard = {};

  wizard.name = randElement(WIZARD_NAMES) + ' ' + randElement(WIZARD_SURNAMES);
  wizard.coatColor = randElement(WIZARD_COAT_COLOR);
  wizard.eyesColor = randElement(WIZARD_EYES_COLOR);

  return wizard;
}

for (var i = 0; i < 4; i++) {
  wizards.splice(i, 1, createWizard());
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');

// Открытие, закрытие диалогового окна
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if ((evt.keyCode === ENTER_KEY_CODE) && (evt.keyCode === ESC_KEY_CODE)) {
    closePopup();
  }
});

function setAttributes(element, attributes) {
  for (var key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      element.setAttribute(key, attributes[key]);
    }
  }
}

setAttributes(setupOverlay, {'role': 'dialog', 'aria-hidden': 'true'});
setAttributes(setupOpen.querySelector('.setup-open-icon'), {'role': 'button', 'aria-pressed': 'false'});
setAttributes(setupClose, {'role': 'button', 'aria-pressed': 'false'});

// Изменение цвета атрибутов волшебника
function eventChangeColor(wizardAttribute, colors, method) {
  wizardAttribute.addEventListener('click', function () {
    wizardAttribute.style[method] = randElement(colors);
  });
}
eventChangeColor(coat, WIZARD_COAT_COLOR, 'fill');
eventChangeColor(coat, WIZARD_COAT_COLOR, 'backgroundColor');
eventChangeColor(eyes, WIZARD_EYES_COLOR, 'fill');
eventChangeColor(eyes, WIZARD_EYES_COLOR, 'backgroundColor');
eventChangeColor(fireball, WIZARD_FIREBALL_COLOR, 'backgroundColor');
