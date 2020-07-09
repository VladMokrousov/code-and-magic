'use strict';
(function(){
var setupWizardForm = document.querySelector('.setup-wizard-form'),
setupUserName = document.querySelector('.setup-user-name'),

wizardCoat = document.querySelector('.wizard-coat'),
wizardEyes = document.querySelector('.wizard-eyes'),
wizardFireball = document.querySelector('.setup-fireball-wrap'),
wizardFireballInput = document.querySelector('.setup-fireball-wrap').querySelector('input');

var getRandom = function (arrName) {
  return arrName[Math.floor(Math.random() * arrName.length)];
};
// Отправка формы при нажатии на кнопку
var setupWindow = document.querySelector('.setup');
setupWizardForm.addEventListener('submit', function(evt){
  var info = new FormData(setupWizardForm);
  var successHandler = function(response){
    console.log(response);
    setupWindow.classList.add('hidden');
  };
  var errorHandler = function(errorMessage){
    var node = document.createElement('div');
      node.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: red;";
      node.style.position = "absolute";
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
  };
  

  evt.preventDefault();

 
  var wizardCopy = document.querySelector('svg').cloneNode(true);

  wizardCopy.querySelector('#wizard-coat').style.fill = getComputedStyle(wizardCoat).fill;
  wizardCopy.querySelector('#wizard-eyes').style.fill = getComputedStyle(wizardEyes).fill;

  var wizardBase64Right = window.svg2base64(wizardCopy);

  // Чтобы развернуть мага, его надо подвинуть на его ширину, а затем отразить
  wizardCopy.querySelector('#wizard').setAttribute('transform', 'translate(62, 0) scale(-1, 1)');
  
  var wizardBase64Left = window.svg2base64(wizardCopy);

  window.restartGame(wizardBase64Right, wizardBase64Left);

  

  window.backend.save(info, successHandler, errorHandler);
});


//Валидация ввода имени персонажа
setupUserName.setAttribute('minlength', 2);

//Меняем цвет фаербола по клику
var wizardFireballColor = ["#ee4830", "#30a8ee", "#5ce6c0", "#e848d5", "#e6e848"];

wizardFireball.addEventListener('click', function() {
  let randCol = getRandom(wizardFireballColor);
  wizardFireball.style.background = randCol;
  wizardFireballInput.value = randCol;
});
})();