'use strict';
(function(){ 
  var similarListElement = document.querySelector(".setup-similar-list"),
    similarWizardTemplate = document.querySelector("#similar-wizard-template")
    .content
    .querySelector(".setup-similar-item");
  
 var wizardCoatColor = ["rgb(101, 137, 164)", "rgb(241, 43, 107)", "rgb(146, 100, 161)", "rgb(56, 159, 117)", "rgb(215, 210, 55)", "rgb(0, 0, 0)"],
    wizardEyesColor = ["black", "red", "blue", "yellow", "green"];
var eyesColor,
coatColor;
var wizards = [];

var getRank = function(wizard){
var rank = 0;
if(wizard.colorCoat === coatColor){
  rank += 2;
}
if(wizard.colorEyes === eyesColor){
  rank += 1;
}
return rank;
};


var updateWizards = function(){

var sortedWizards = wizards.sort(function(left, right){
  var rankDiff = getRank(right) - getRank(left);
  if (rankDiff === 0) {
rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
  }
  return rankDiff;
});

var similarItem = similarListElement.querySelectorAll('.setup-similar-item');
for (let i = 0; i < similarItem.length; i++){
similarItem[i].remove();
}

  var fragment = document.createDocumentFragment();
  for (let i = 0; i < 4; i++) {
    fragment.appendChild(renderWizard(sortedWizards[i]));
  }
similarListElement.appendChild(fragment);

setupWindow.querySelector(".setup-similar").classList.remove("hidden");

};

var getRandom = function (arrName) {
      return arrName[Math.floor(Math.random() * arrName.length)];
  };

var lastTimeout;

  //Меняем цвет глаз по клику
  var wizardEyesInput = document.querySelector('input[name=eyes-color]');
  
var wizardEyes = document.querySelector('.wizard-eyes');
var baseEyesColor = 'black';
wizardEyes.addEventListener('click', function() {
  var newEyesColor = getRandom(wizardEyesColor);

  wizardEyesInput.setAttribute('value', newEyesColor);
  wizardEyes.style.fill = newEyesColor;
  eyesColor = newEyesColor;
  if(lastTimeout){
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function(){
    updateWizards();
  }, 500);
  
});

//Меняем цвет мантии по клику
var wizardCoatInput = document.querySelector('input[name=coat-color]');
var wizardCoat = document.querySelector('.wizard-coat');

wizardCoat.addEventListener('click', function() {
  var newCoatColor = getRandom(wizardCoatColor);

  wizardCoatInput.setAttribute('value', newCoatColor);
  wizardCoat.style.fill = newCoatColor;
  coatColor = newCoatColor;
  if(lastTimeout){
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function(){
    updateWizards();
  }, 500);
 
});

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(".setup-similar-label").textContent = wizard.name;
  wizardElement.querySelector(".wizard-coat").style.fill = wizard.colorCoat;
  wizardElement.querySelector(".wizard-eyes").style.fill = wizard.colorEyes;
  return wizardElement;
};

var setupWindow = document.querySelector('.setup');

var successHandler = function(data){
  wizards = data;
coatColor = getComputedStyle(wizardCoat).fill;
eyesColor = baseEyesColor;
updateWizards();

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

window.backend.load(successHandler, errorHandler);


})();