var canvas = null;
var context = null;
var heights = []; //Contains coordinates for slope peaks/valleys
var beats = [];  //Contains x values for each beat

var requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(func){ setTimeout(func, 1000 / assumedFps);};

window.onload = function () {
  init();
  requestAnimationFrame(draw);
};

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  context.strokeRect(40, 40, 80, 40);
  context.fillText("Hello World!", 50, 65);

  beats.push(0);
  beats.push(30);
  heights.push({x:0, y:canvas.height/2 + 1});
  heights.push({x:100, y:canvas.height/2 + 1});
  heights.push({x:200, y:canvas.height/2 + 1});
  heights.push({x:300, y:canvas.height/2 + 1});
  heights.push({x:400, y:canvas.height/2 + 1});
  heights.push({x:500, y:canvas.height/2 + 1});
  heights.push({x:600, y:canvas.height/2 + 1});
  heights.push({x:700, y:canvas.height/2 + 1});
}
var x = 0;
var y = 0;
var opac = 0;
function draw() {
  //Clear the frame
  context.fillStyle = "#444";
  context.fillRect(0, 0, canvas.width, canvas.height);

  if(x < canvas.width) {
    x += 15;
    if(x >= canvas.width/2) {
      if(y < canvas.height / 12) {
        y += 5;
      }
    }
  } else {
    if(opac < 1) {
      opac += 0.1;
    }
  }
  while(heights.length < 9) {
    heights.push({x:(heights[heights.length-1].x + 100), y:-100* Math.random() + canvas.height/2});
  }
  
  //Draw mountain
  context.strokeStyle = "rgba(230,230,230,1)";
  context.beginPath();
  context.moveTo(0, canvas.height/2);
  for(i = 0; i < heights.length; i += 1) {
	heights[i].x -= 1;
	if(heights[i].x < -100) {
		heights.shift();
	}
    context.lineTo(heights[i].x, heights[i].y);
	context.fillStyle = "#eee";
	context.font = "12px Arial";
	context.fillText("x:" + Math.round(heights[i].x) + ", y:" + Math.round(heights[i].y), heights[i].x, heights[i].y);
  }
  context.lineTo(canvas.width, canvas.height/2);
  context.closePath();
  context.fill();
  
  
  context.strokeStyle = "rgba(230,230,230,0.2)";
  context.beginPath();
  context.moveTo(canvas.width/2,canvas.height*5/6);
  context.lineTo(canvas.width/2, canvas.height*5/6 + y);
  context.closePath();
  context.stroke();

  context.fillStyle = "rgba(230,230,230, " + opac + ")";
  context.font = "20px Arial";
  context.fillText("climber", 5, 23);
  context.font = "10px Arial";
  context.fillText("Z climb", 200, 23);
  context.fillText("X descend", 300, 23);

  for(i = 0; i < beats.length; i += 1) {
    beats[i] += 1;
    context.beginPath();
    context.arc(100 + beats[i],100,2,0,2*Math.PI, false);
    context.closePath();
    context.stroke();
  }
  requestAnimationFrame(draw);
}