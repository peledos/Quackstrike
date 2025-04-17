const canva = document.getElementById("des").getContext('2d');

let pato = new Ducks(100,400,50,80,0,[],'./assets/IMG_png/pato-preto.png',0,0,0,false);
let fundo = new Game(0,0,950,1920,0,[],'./assets/fundo.png',0,0,0,false);
let fundo2 = new Game(1152,0,950,1920,0,[],'./assets/fundo.png',0,0,0,false);
let texto = new Game(0,0,970,1920,0,[],'./assets/fundo.png',0,0,0,false);
let bullet = new Bullet(0,0,0,0,0,[],'./assets/IMG_png/pato-preto.png',0,0,0,false);
let tremFundo = new Game(0, 360, 595, 1038, 0,[],'./assets/IMG_png/tremz.png',0,0,0,false);
let obj = new Game(0, 0, 0, 0, 0,[],'./assets/IMG_png/tremz.png',0,0,0,false);
bullet.bullets = ['bullet1', 'bullet2', 'bullet3', 'bullet4', 'bullet5'];

let play = false;
let telaInicial = true;
function checarClickNoPato() {
    const canvasElement = document.getElementById("des");


    canvasElement.addEventListener("click", (event) => {
        if (bullet.bullets.length >= 1) {
        const rect = canvasElement.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const tiro = true;
        // Verifica se o clique está dentro dos limites do pato
        if (
            mouseX >= pato.x &&
            mouseX <= pato.x + pato.w &&
            mouseY >= pato.y &&
            mouseY <= pato.y + pato.h
        ) {
            bullet.bullets.pop();
            console.log("Acertou o pato! Balas: " + bullet.bullets.length);
            pato.duck_reset(tiro) // Reinicia o pato
            fundo.score += 10; // Adiciona 10 pontos ao score
            console.log(mouseX, mouseY); // Para depuração
        } else {
            console.log("Sem balas");
            console.log("R para recarregar");
            // Aqui você pode adicionar lógica para recarregar as balas
            bullet.bullets.push(new Bullet(0,0,0,0,0,[],'./assets/IMG_png/pato-preto.png',0,0,0,false));
            console.log(bullet.bullets.length);
        }
    }
    });
}

function desenha(){
    // fundo.drawBackground(canva);
    // fundo2.drawBackground(canva);
    // pato.drawDuck(canva);
    // tremFundo.drawBackground(canva)
}

function atualiza(){
    if(telaInicial){
        obj._drawRoundedRect(canva, 390, 410, 350, 100, 10,'orange');
        texto.drawText(canva, "Clique para iniciar o jogo", 400, 475, "30px Arial", "black");
    }
    if(play){
        pato.mov_duck(6,0);
        pato.duck_reset();
        checarClickNoPato();
        fundo.mov_background(-2,0);
        fundo2.mov_background(-2, 0);
        texto.drawText(canva, "Pontos: " + fundo.score, 100, 100, "30px Arial", "yellow");
        texto.drawText(canva, "Balas: " + bullet.bullets.length, 100, 150, "30px Arial", "yellow");
        texto.drawText(canva, "Clique no pato para atirar", 100, 200, "30px Arial", "yellow");

    if (fundo.x + fundo.w <= 0) {
        fundo.x = fundo2.x + fundo2.w;
    }
    if (fundo2.x + fundo2.w <= 0) {
        fundo2.x = fundo.x + fundo.w;
    }
}
checarClickNoPato();
}

function main(){
    canva.clearRect(0,0,1152,1080)
    desenha()
    atualiza()
    requestAnimationFrame(main)

}

main()