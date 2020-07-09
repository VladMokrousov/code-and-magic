'use strict';
(function(){
//Модуль превращает Dom в svg
var DATA_URI_PREFIX = 'data:image/svg+xml;charset=utf-8;base64,';

window.svg2base64 = function(svgElement){
var xml = new XMLSerializer().serializeToString(svgElement);
var svg64 = window.btoa(xml);
return DATA_URI_PREFIX + svg64;
};
})();