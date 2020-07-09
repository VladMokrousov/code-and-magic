"use strict";
(function(){
//Этот модуль позволяет загружать любую картинку в качестве аватара пользователя
var fileChooser = document.querySelector('.upload input[type=file]');
var previewMain = document.querySelector('.setup-open-icon');
var preview = document.querySelector('.setup-user-pic');
var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

fileChooser.addEventListener('change', function(){
  var file = fileChooser.files[0];
  var fileName = file.name.toLowerCase();
console.log(file);
  var matches = FILE_TYPES.some(function(it){
    return fileName.endsWith(it);
  });

  if(matches){
    var reader = new FileReader();
    
    
    reader.addEventListener('load', function(){
      preview.src = reader.result;
      previewMain.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

})();