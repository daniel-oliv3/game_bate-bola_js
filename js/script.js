(function(){

    var cnv = document.querySelector('canvas');
    var ctx = cnv.getContext('2d');

    var gravity = 0.1;

    //Estados do jogo
    var START = 1, PLAY = 2, OVER = 3;
    var gameState = START;

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
    }


    //Mensagens
    var messeges = [];

    var startMessage = {
        text: "TOUCH TO START",
        y: cnv.height/2 - 100,
        font: "bold 30px Snas-Serif",
        color: "#f00",
        visible: true 
    };

    messeges.push(startMessage);

    //Eventos
    cnv.addEventListener('mousedown', function(e){
        switch(gameState){
            case START:
                gameState = PLAY;
                startMessage.visible = false;
                startGame();
                break;
        }
    }, false);




    //Funções
    function loop(){
        requestAnimationFrame(loop, cnv);
        if(gameState === PLAY){
            update();
        }    
        render();
    }

    function update(){
        //Ação da gravidade e deslocamento da bolinha
        ball.vy += gravity;
        ball.y += ball.vy;

        //Game Over
        if(ball.y - ball.radius > cnv.height){
            gameState = OVER;
            ball.visible = false;

            window.setTimeout(function(){
                startMessage.visible = true;
                gameState = START;
            }, 2000);
        }
    }

    function render(){
        ctx.clearRect(0, 0, cnv.width, cnv.height);

        //Renderização da bola
        if(ball.visible){
            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
        }

        //Renderização das mensagens de texto
        for(var i in messeges){
            var msg = messeges[i];
            if(msg.visible){
                ctx.font = msg.font;
                ctx.fillStyle = msg.color;
                ctx.fillText(msg.text, (cnv.width - ctx.measureText(msg.text).width)/2, msg.y);
            }
        }
    }

    //Função de inicialização do jogo
    function startGame(){
        ball.vy = 0;
        ball.y = 50;
        ball.vx - Math.floor(Math.random() * 21) - 10;
        ball.x = Math.floor(Math.random() * 261) + 20;
        ball.visible = true;
    }

    loop();

}());