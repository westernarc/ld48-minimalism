var canvas = null;
var context = null;
var heights = []; //Contains coordinates for slope peaks/valleys
var beats = [];  //Contains x values for each beat
var player = {x:0, y:0};  //position of player
var slope = 0;  //Slope of where the player is standing

var distanceBetweenNodes = 200; //Distance between nodes of slope

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

  heights.push({x:0, y:canvas.height/2 + 1});
  heights.push({x:200, y:canvas.height/2 + 1});
  heights.push({x:400, y:canvas.height/2 + 1});
  heights.push({x:600, y:canvas.height/2 + 1});
  heights.push({x:800, y:canvas.height/2 + 1});
  
  player.x = canvas.width/2;
  player.y = canvas.height/2 + 1;
}
var x = 0;
var y = 0;
var opac = 0;
function draw() {
  //Clear the frame
  context.fillStyle = "#444";
  context.fillRect(0, 0, canvas.width, canvas.height);

  if(x < canvas.width + 200) {
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
  while(heights.length < 10) {
    //Calculate slope
	var pushX = heights[heights.length-1].x + distanceBetweenNodes;
    heights.push({x: pushX, y:-100* Math.random() + canvas.height/2});
	heightslope = (heights[heights.length-1].y - heights[heights.length-2].y)/(heights[heights.length-1].x - heights[heights.length-2].x);
	var numOfBeats = Math.abs(heightslope) * 10;
	for(var i = 0; i < numOfBeats; i += 1) {
		if(heightslope >= 1) {
			beats.push({x:pushX - (i / numOfBeats) * distanceBetweenNodes, positive:true});
		} else {
			beats.push({x:pushX - (i / numOfBeats) * distanceBetweenNodes, positive:false});
		}
	}
  }
  
  //Draw mountain
  context.strokeStyle = "rgba(230,230,230,1)";
  context.beginPath();
  context.moveTo(0, canvas.height/2);
  for(i = 0; i < heights.length; i += 1) {
	heights[i].x -= 1;
	if(heights[i].x < -distanceBetweenNodes) {
		heights.shift();
	}
	if(heights[i].x > x) {
		context.lineTo(x, canvas.height/2+1);
	} else {
		context.lineTo(heights[i].x, heights[i].y);
	}
	context.fillStyle = "#eee";
	context.font = "12px Arial";
	context.fillText("x:" + Math.round(heights[i].x) + ", y:" + Math.round(heights[i].y), heights[i].x, heights[i].y);
  }
  if(x < canvas.width) {
	context.lineTo(x, canvas.height/2+1);
  } else {
	context.lineTo(canvas.width, canvas.height/2);
  }
  context.closePath();
  context.fill();
  
	//Update player
	//Calculate height of player
	for(i = 1; i < heights.length; i += 1) {
		if(heights[i].x >= player.x && heights[i-1].x < player.x) {
			//Find the two heights the player is between
			//Find slope
			slope = (heights[i].y - heights[i-1].y)/(heights[i].x - heights[i-1].x);
			//Find y value
			player.y = slope * (player.x - heights[i-1].x) + heights[i-1].y;
		}
	}
	//Draw player
	context.strokeStyle = 'rgba(0.1,0.1,0.1,1)';
	context.beginPath();
	context.arc(player.x,player.y,4,0,2*Math.PI, false);
	context.closePath();
	context.stroke();
  
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

  //Remove beats before -10 px
  while(beats[0].x < -100) {
	beats.shift();
  }
  for(i = 0; i < beats.length; i += 1) {
    beats[i].x -= 1;
    context.beginPath();
    context.arc(100 + beats[i].x,canvas.height - canvas.height * 3 / 24,2,0,2*Math.PI, false);
    context.closePath();
    context.stroke();
  }
  requestAnimationFrame(draw);
}