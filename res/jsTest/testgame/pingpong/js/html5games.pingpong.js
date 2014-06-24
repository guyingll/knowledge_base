var KEY = {
	UP : 38,
	DOWN : 40,
	W : 87,
	S : 83
}
/*
 $(function(){
 $(document).keydown(function(e){
 switch(e.which){
 case KEY.UP:
 var top=parseInt($("#paddleB").css("top"));
 $("#paddleB").css("top",top-5);
 break;
 case KEY.DOWN:
 var top=parseInt($("#paddleB").css("top"));
 $("#paddleB").css("top",top+5);
 break;
 case KEY.W:
 var top=parseInt($("#paddleA").css("top"));
 $("#paddleA").css("top",top-5);
 break;
 case KEY.S:
 var top=parseInt($("#paddleA").css("top"));
 $("#paddleA").css("top",top+5);
 break;
 }
 });
 });*/

var pingpong = {}
pingpong.pressedkeys = [];
pingpong.ball = {
	speed : 5,
	x : 150,
	y : 100,
	directionX : 1,
	directionY : 1
}

$(function() {
	alert("test")
	pingpong.timer = setInterval(gameloop, 30);
	$(document).keydown(function(e) {
		pingpong.pressedkeys[e.which] = true;
	});

	$(document).keyup(function(e) {
		pingpong.pressedkeys[e.which] = false;
	});
})
function gameloop() {
	moveBall();
	movePaddles();
}

function moveBall() {
	var playgroundHeight = parseInt($("#playround").height());
	var playgroundWidth = parseInt($("#playround").width());
	var ball = pingpong.ball;
	//下
	if (ball.y + ball.speed * ball.directionY > playgroundHeight - 20) {
		ball.directionY = -1;
	}
	//上
	if (ball.y + ball.speed * ball.directionY < 0) {
		ball.directionY = 1
	}
	//右
	if (ball.x + ball.speed * ball.directionX > playgroundWidth - 20) {
		ball.directionX = -1;
	}
	//左
	if (ball.x + ball.speed * ball.directionX < 0) {
		ball.directionX = 1
	}
	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;

	$("#ball").css({
		"left" : ball.x,
		"top" : ball.y
	})

	var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
	var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
	var paddleAYTop = parseInt($("#paddleA").css("top"));
	console.log(ball.x + ball.speed * ball.directionX + ":" + paddleAX)
	if (ball.x + ball.speed * ball.directionX >= paddleAX) {
		if (ball.y + ball.speed * ball.directionY <= paddleAYBottom && (ball.y + ball.speed * ball.directionY >= paddleAYTop)) {
			ball.directionX = 1;
		}
	}

	var paddleBX = parseInt($("#paddleB").css("left"));
	var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
	var paddleBYTop = parseInt($("#paddleB").css("top"));
	console.log(ball.x + ball.speed * ball.directionX + ":" + paddleBX + "\n")
	if (ball.x + ball.speed * ball.directionX >= paddleBX) {
		if (ball.y + ball.speed * ball.directionY <= paddleBYBottom && (ball.y + ball.speed * ball.directionY >= paddleBYTop)) {
			ball.directionX = -1;
		}
	}

}

function movePaddles() {
	if (pingpong.pressedkeys[KEY.UP]) {
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top", top - 5);
	}
	if (pingpong.pressedkeys[KEY.DOWN]) {
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top", top + 5);
	}
	if (pingpong.pressedkeys[KEY.W]) {
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top", top - 5);
	}
	if (pingpong.pressedkeys[KEY.S]) {
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top", top + 5);
	}
}
