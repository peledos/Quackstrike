canva = document.getElementById("des").getContext('2d');

let pato = new Ducks(100,400,50,80,0,[],'./assets/IMG_png/pato-preto.png',0,0,0,false);
let fundo = new Game(0,0,1080,1920,0,[],'./assets/fundo.png',0,0,0,false);
let fundo2 = new Game(0,0,1080,1920,0,[],'./assets/fundo.png',0,0,0,false);
let texto = new Game(0,0,1080,1920,0,[],'./assets/fundo.png',0,0,0,false);

let play = true;

function checarClickNoPato() {
    const canvasElement = document.getElementById("des");

    canvasElement.addEventListener("click", (event) => {
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
            pato.duck_reset(tiro) // Reinicia o pato
            fundo.score += 10; // Adiciona 10 pontos ao score
            console.log(mouseX, mouseY); // Para depuração
        }
    });
}

function desenha(){
    fundo.drawBackground(canva);
    fundo2.drawBackground(canva);
    pato.drawDuck(canva);
}

function atualiza(){
    if(play){
        pato.mov_duck(6,0);
        pato.duck_reset();
        checarClickNoPato();
        fundo.mov_background(-2,0);
        fundo2.mov_background(-2, 0);
        texto.drawText(canva, "Pontos: " + fundo.score, 100, 100, "30px Arial", "yellow");

    if (fundo.x + fundo.w <= 0) {
        fundo.x = fundo2.x + fundo2.w;
    }
    if (fundo2.x + fundo2.w <= 0) {
        fundo2.x = fundo.x + fundo.w;
    }
}

}

function main(){
    canva.clearRect(0,0,1152,1080)
    desenha()
    atualiza()
    requestAnimationFrame(main)

}

main()