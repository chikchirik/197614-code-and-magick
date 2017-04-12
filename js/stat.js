'use strict';

function drawCloud(ctx, x, y, width, height) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(x + 10, y + 10, width, height);

  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillRect(x, y, width, height);
}

function drawText(ctx, x, y, text) {
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.font = 'normal 16px PT Mono';
  ctx.fillText(text, x, y);
}

function drawChart(ctx, x, y, names, times, height, barWidth, offset) {
  var color = function (name) {
    return name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgb(0, 0, ' + parseInt(255 * Math.random(), 10) + ')';
  };
  var maxTimes = Math.max.apply(null, times);
  var barHeight = function (time) {
    return (time * height) / maxTimes;
  };

  for (var i = 0; i < names.length; i++) {
    var xBar = x + i * (barWidth + offset);
    var yBar = y + height - barHeight(times[i]);
    drawText(ctx, xBar, yBar - 10, parseInt(times[i], 10));
    ctx.fillStyle = color(names[i]);
    ctx.fillRect(xBar, yBar, barWidth, barHeight(times[i]));
    drawText(ctx, xBar, y + height + 20, names[i]);
  }
}

window.renderStatistics = function (ctx, names, times) {
  drawCloud(ctx, 100, 10, 420, 270);
  drawText(ctx, 150, 30, 'Ура вы победили!');
  drawText(ctx, 150, 50, 'Список результатов:');
  drawChart(ctx, 150, 90, names, times, 150, 40, 50);
};
