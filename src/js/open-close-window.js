'use strict';
(function(){
var setupWindow = document.querySelector(".setup"),
setupOpen = document.querySelector('.setup-open'),
setupOpenIcon = setupOpen.querySelector('.setup-open-icon'),
setupClose = setupWindow.querySelector('.setup-close'),
setupUserName = document.querySelector('.setup-user-name'),
WINDOW_COORDS = {
  x: setupWindow.style.top,
  y: setupWindow.style.left
},
onSetupOpenPress = function() {
  setupWindow.classList.remove("hidden");
  
  setupWindow.style.top = WINDOW_COORDS.x;
  setupWindow.style.left = WINDOW_COORDS.y;
},
onSetupClosePress = function(){
  setupWindow.classList.add("hidden");
},
ENTER = 13,
ESCAPE = 27;


setupOpen.addEventListener("click", function() {
  onSetupOpenPress();
});

document.addEventListener('keydown', function(evt) {
  if(evt.keyCode === ESCAPE && setupUserName != document.activeElement || evt.keyCode === ENTER && setupClose == document.activeElement) {
    onSetupClosePress();
  }
});

setupClose.addEventListener("click", function() {
  onSetupClosePress();
});

setupOpenIcon.setAttribute("tabindex", 0);

setupOpenIcon.addEventListener("keydown", function(evt) {
  if(evt.keyCode === ENTER) {
    onSetupOpenPress();
  }
});

if (setupWindow.classList.contains('hidden')) {
  console.log('Окно скрыто');
} else {
  console.log('Окно открыто');
  document.addEventListener('keydown', function(evt) {
    if(evt.keyCode === ESCAPE) {
      onSetupClosePress();
    }
  });
}
setupClose.setAttribute("tabindex", 0);

})();