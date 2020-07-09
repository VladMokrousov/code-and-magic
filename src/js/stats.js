"use strict";
(function(){

var CLOUD_WIDTH = 420,
    CLOUD_HEIGHT = 270,
    CLOUD_X = 100,
    CLOUD_Y = 10,
    GAP = 10,
    BIG_GAP = 50,
    TEXT_HEIGHT = 20,
    barHeight = CLOUD_HEIGHT - CLOUD_Y - 2 * TEXT_HEIGHT - 2 * GAP - TEXT_HEIGHT - 3 * GAP,
    BAR_WIDTH = 40,
    WIDTH_BETWEEN_BAR = 50,
    MAX_BAR_HEIGHT = 150;


var renderCloud = function(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > maxElement) {
            maxElement = arr[i];
        }
    }
    return maxElement;
};
var getRandomColor = function (min, max) {
    var b = Math.floor(Math.random() * (max - min + 1)) + min;
    return "rgb(0,0," + b + ")";
};


window.renderStatistics = function(ctx, names, times) {

    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
    renderCloud(ctx, CLOUD_X, CLOUD_Y, "#ffffff");

    ctx.fillStyle = "#000000";
    ctx.font = "16px PT Mono";
    ctx.fillText("Ура вы победили!", CLOUD_X + BIG_GAP, CLOUD_Y + TEXT_HEIGHT);
    ctx.fillText("Список результатов:", CLOUD_X + BIG_GAP, CLOUD_Y + 2 * TEXT_HEIGHT);

    
    var maxTime = getMaxElement(times);
   
    for (var i = 0; i < names.length; i++) {
        ctx.fillStyle = "#000000";
        ctx.fillText(names[i], CLOUD_X + BIG_GAP + (BAR_WIDTH + WIDTH_BETWEEN_BAR) * i, CLOUD_Y + 2 * TEXT_HEIGHT + 4 * GAP + MAX_BAR_HEIGHT + TEXT_HEIGHT);
        ctx.fillText(Math.round(times[i]), CLOUD_X + BIG_GAP + (BAR_WIDTH + WIDTH_BETWEEN_BAR) * i, CLOUD_Y + 2 * TEXT_HEIGHT + 4 * GAP + MAX_BAR_HEIGHT - (barHeight * times[i])/maxTime - GAP/2);
        if (names[i] == "Вы") {
            ctx.fillStyle = "rgba(255, 0, 0, 1)"; 
        } else {
            ctx.fillStyle = getRandomColor(60, 255);   
        }
        ctx.fillRect(CLOUD_X + BIG_GAP + (BAR_WIDTH + WIDTH_BETWEEN_BAR) * i, CLOUD_Y + 2 * TEXT_HEIGHT + 4 * GAP + MAX_BAR_HEIGHT, BAR_WIDTH, (-barHeight * times[i])/maxTime);    
    }

    
};
})();