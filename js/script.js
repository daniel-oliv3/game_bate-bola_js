(function(){
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');
	
	var gravity = 0.1;
	var catX = catY = hyp = 0;
	
	//Estados do jogo
	var START = 1, PLAY = 2, OVER = 3;
	var gameState = START;

	//Pontuação
	var score = 0;
	
	//Objeto bola
	var ball = {
		radius: 20,
		vx: 0,
		vy: 0,
		x: cnv.width/2 - 10,
		y: 50,
		color: "#00f",
		touched: false,
		visible: false
	};
	
	//Mensagens
	var messages = [];

	//Mensgem inicial
	var startMesage = {
		text: "TOUCH TO START",
		y: cnv.height/2 - 100,
		font: "bold 30px Sans-Serif",
		color: "#f00",
		visible: true
	};
	
	messages.push(startMesage);

	//Placar final
	var scoreText = Object.create(startMesage);
	scoreText.visible = false;
	scoreText.y = (cnv.height/2 + 50);
	
	//Eventos
	cnv.addEventListener('mousedown',function(e){
		catX = ball.x - e.offsetX;
		catY = ball.y - e.offsetY;
		hyp = Math.sqrt(catX*catX + catY*catY);
		switch(gameState){
			case START:
				gameState = PLAY;
				startMesage.visible = false;
				startGame();
				break;
			case PLAY:
				if(hyp < ball.radius && !ball.touched){
					ball.vx = Math.floor(Math.random()*21) - 10;
					ball.vy = -(Math.floor(Math.random()*6) + 5);
					ball.touched = true;
					score++;
				}
				break;
		}
	},false);
	
	cnv.addEventListener('mouseup',function(){
		if(gameState === PLAY){
			ball.touched = false;
		}
	},false);
	
	//Funções
	function loop(){
		requestAnimationFrame(loop,cnv);
		if(gameState === PLAY){
			update();
		}
		render();
	}
	
	function update(){
		//Ação da gravidade e deslocamento da bolinha
		ball.vy += gravity;
		ball.y += ball.vy;
		ball.x += ball.vx;
		
		//Quicar nas paredes
		if(ball.x + ball.radius > cnv.width || ball.x < ball.radius){
			if(ball.x < ball.radius){
				ball.x = ball.radius;
			} else {
				ball.x = cnv.width - ball.radius;
			}
			ball.vx *= -0.8;
		}
		
		//Quicar no teto
		if(ball.y < ball.radius && ball.vy < 0){
			ball.y = ball.radius;
			ball.vy *= -1;
		}
		
		//Game over
		if(ball.y - ball.radius > cnv.height){
			gameState = OVER;
			ball.visible = false;
			
			window.setTimeout(function(){
				startMesage.visible = true;
				gameState = START;
			},2000);
		}
	}
	
	function render(){
		ctx.clearRect(0,0,cnv.width,cnv.height);
		
		//Redenderização da bola
		if(ball.visible){
			ctx.fillStyle = ball.color;
			ctx.beginPath();
			ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
			ctx.closePath();
			ctx.fill();
			//Desenhar o placar
			ctx.font = "bold 15px Arial";
			ctx.fillStyle = "#000";
			ctx.fillText("SCORE: " + score, 10, 20);
		}

			
		//Renderização das mensagens de texto
		for(var i in messages){
			var msg = messages[i];
			if(msg.visible){
				ctx.font = msg.font;
				ctx.fillStyle = msg.color;
				ctx.fillText(msg.text,(cnv.width - ctx.measureText(msg.text).width)/2,msg.y);
			}
		}
	}
	
	//função de inicialização do jogo
	function startGame(){
		ball.vy = 0;
		ball.y = 50;
		ball.vx = Math.floor(Math.random()*21) - 10;
		ball.x = Math.floor(Math.random()*261) + 20;
		ball.visible = true;
		score = 0;
	}
	
	loop();
}());


























