canva = document.getElementById("des").getContext('2d');

pato = new Ducks(100,400,50,80,0,[],'./assets/IMG_png/pato-preto.png',0,0,0,false);

function desenha(){
pato.drawDuck(canva);
}

function atualiza(){
    if(pato){
    pato.mov_duck(10,0);
    pato.duck_reset();
}

}

function main(){
    canva.clearRect(0,0,1152,1080)
    desenha()
    atualiza()
    requestAnimationFrame(main)

}

main()