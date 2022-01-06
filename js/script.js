(function(){

    var cnv = document.querySelector('canvas');
    var ctx = cnv.getContext('2d');


    //Funções
    function loop(){
        requestAnimationFrame(loop, cnv);
        update();
        render();
    }

    function update(){
        
    }

    function render(){
        
    }

    loop();

}());