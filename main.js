const canva = document.getElementById("des").getContext('2d');

let pato = new Ducks(100, 400, 50, 80, 0, [], './assets/IMG_png/pato-preto.png', 0, 0, 0, false);
let fundo = new Game(0, 0, 950, 1920, 0, [], './assets/fundo.png', 0, 0, 0, false);
let fundo2 = new Game(1152, 0, 950, 1920, 0, [], './assets/fundo.png', 0, 0, 0, false);
let texto = new Game(0, 0, 970, 1920, 0, [], './assets/fundo.png', 0, 0, 0, false);
let bullet = new Bullet(0, 0, 0, 0, 0, [], './assets/IMG_png/pato-preto.png', 0, 0, 0, false);
let tremFundo = new Game(0, 360, 595, 1038, 0, [], './assets/IMG_png/tremz.png', 0, 0, 0, false);
bullet.bullets = ['bullet1', 'bullet2', 'bullet3', 'bullet4', 'bullet5'];

let play = true;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function reload() {
    if (bullet.bullets.length <= 0) {
        window.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() === "r") {
                bullet.bullets = ['bullet1', 'bullet2', 'bullet3', 'bullet4', 'bullet5'];
                console.log("🔫 Recarregado!");
                console.log("Total de balas:", bullet.bullets.length);
            }
        });
    }
}

async function tiro() {
    addEventListener("click", (e) => {
        if (bullet.bullets.length >= 1) {
            
            bullet.bullets.pop();
            
        }
})
};

function checarClickNoPato() {
    const canvasElement = document.getElementById("des");
    canvasElement.focus(); // garante que ele receba foco
    const rect = canvasElement.getBoundingClientRect();
    
    
    canvasElement.addEventListener("click", async (event) => {
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        console.log("Balas agora " + bullet.bullets); // Para depuração
        bullet.bullets.pop();
        console.log("Balas depois " + bullet.bullets.length); // Para depuração
        if (bullet.bullets.length >= 1) {
            const tiro = true;
            // Verifica se o clique está dentro dos limites do pato
            if (
                mouseX >= pato.x &&
                mouseX <= pato.x + pato.w &&
                mouseY >= pato.y &&
                mouseY <= pato.y + pato.h
            ) {

                console.log("Acertou o pato! Balas: " + bullet.bullets.length);
                pato.duck_reset(tiro) // Reinicia o pato
                fundo.score += 10; // Adiciona 10 pontos ao score
                console.log(mouseX, mouseY); // Para depuração

            }
        }
        bullet.bullets.pop();
    });
}

function desenha() {
    fundo.drawBackground(canva);
    fundo2.drawBackground(canva);
    pato.drawDuck(canva);
    tremFundo.drawBackground(canva)
}

function atualiza() {
    if (play) {
        pato.mov_duck(6, 0);
        pato.duck_reset();
        checarClickNoPato();
        fundo.mov_background(-2, 0);
        fundo2.mov_background(-2, 0);
        texto.drawText(canva, "Pontos: " + fundo.score, 100, 100, "30px Arial", "yellow");
        texto.drawText(canva, `Balas: ${bullet.bullets.length}`, 1000, 100, "30px Arial", "yellow");

        if (fundo.x + fundo.w <= 0) {
            fundo.x = fundo2.x + fundo2.w;
        }
        if (fundo2.x + fundo2.w <= 0) {
            fundo2.x = fundo.x + fundo.w;
        }
    }
    checarClickNoPato();
    reload();
    tiro();
}

function main() {
    canva.clearRect(0, 0, 1152, 1080)
    desenha()
    atualiza()
    requestAnimationFrame(main)

}

main()