(function(){

    var cnv = document.querySelector('canvas');
    var ctx = cnv.getContext('2d');

    //Estados do jogo
    var START = 1, PLAY = 2, OVER = 3;
    var gameState = START;

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
        
    }

    function render(){
        ctx.clearRect(0, 0, cnv.width, cnv.height);


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

    loop();

}());