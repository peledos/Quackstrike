const canva = document.getElementById("des").getContext('2d');
const canvasElement = document.getElementById("des");
// auxiliares
let a = 0;
let isMouseDown = false;
let explosoes = [];
let temporaryTexts = []; // Array para armazenar textos temporários
let armaEquipada = "pistol"; // Arma inicial equipada
let impactos = [];

let fundo = new Game(0, 0, 950, 1920, 0, [], './assets/fundo.png', 0, 0, 0, false);
let fundo2 = new Game(1152, 0, 950, 1920, 0, [], './assets/fundo.png', 0, 0, 0, false);
let fundoMenu = new Game(0, 0, 950, 1920, 0, [], './assets/fundo.png', 0, 0, 0, false);
let texto = new Game(0, 0, 970, 1920, 0, [], './assets/fundo.png', 0, 0, 0, false);
let bullet = new Bullet(0, 0, 0, 0, 0, [], './assets/IMG_png/pato-preto.png', 0, 0, 0, false);
let tremFundo = new Game(30, 730, 214, 1038, 0, [], './assets/IMG_png/tremz.png', 0, 0, 0, false);

let pistol = new Bullet(250, 270, 60, 90, 0, [], './assets/pistol.png', 0, 0, 0, false);
let shotgun = new Bullet(810, 280, 50, 100, 0, [], './assets/shotgun.png', 0, 0, 0, false);
let lanca_granada = new Bullet(800, 570, 70, 100, 0, [], './assets/lanca_granada.png', 0, 0, 0, false);
let ak47 = new Bullet(250, 560, 70, 120, 0, [], './assets/ak47.png', 0, 0, 0, false);

// Declarando os patos
let patos = [
    new Ducks(-40, 400, 50, 80, 0, [], './assets/IMG_png/pato-preto.png', 0, 0, 0, false),
    new Ducks(-50, 200, 50, 80, 0, [], './assets/IMG_png/pato-preto.png', 0, 0, 0, false),
    new Ducks(-45, 250, 50, 80, 0, [], './assets/IMG_png/pato-preto.png', 0, 0, 0, false),
    new Ducks(-65, 300, 50, 80, 0, [], './assets/IMG_png/pato-preto.png', 0, 0, 0, false),
    new Ducks(-60, 350, 50, 80, 0, [], './assets/IMG_png/pato-preto.png', 0, 0, 0, false)
];

let balasPorArma = {
    pistol: 5,
    shotgun: 10,
    ak47: 20,
    lanca_granada: 3
};

bullet.bullets = Array(balasPorArma[armaEquipada]).fill('bullet');

let armasCompradas = { pistol: true, shotgun: false, ak47: false, lanca_granada: false }; // Controle de armas compradas

let menu = false; // Variável para controlar o menu
let play = false; // Variável para controlar o jogo
let loja = true; // Variável para controlar a loja
let gameOver = false; // Variável para controlar o game over


document.addEventListener("keydown", (event) => {
    // Verifica se o jogador pressionou a tecla "Escape"
    if (event.key === "Escape") {
        menu = true;
        play = false;
        loja = false;
    }
});

// Adiciona o evento de clique ao canvas para checar os menus e o jogo
canvasElement.addEventListener("click", (event) => {
    const rect = canvasElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Verifica se o jogador está no menu
    if (menu === true) {
        // Verifica se o clique foi no botão "Jogar"
        if (mouseX >= 350 && mouseX <= 750 && mouseY >= 225 && mouseY <= 375) {
            play = true;
            loja = false;
            menu = false;
            console.log("Botão Jogar clicado!");
        }

        // Verifica se o clique foi no botão "Loja"
        if (mouseX >= 350 && mouseX <= 750 && mouseY >= 405 && mouseY <= 555) {
            loja = true;
            play = false;
            menu = false;
            console.log("Botão Loja clicado!");
        }
    } else if (loja === true) {
        // Pistola (grátis)
        if (mouseX >= 150 && mouseX <= 450 && mouseY >= 225 && mouseY <= 375) {
            if (armasCompradas.pistol) {
                armaEquipada = "pistol";
                console.log("Pistola equipada!");
            }
        }

        // Shotgun
        if (mouseX >= 710 && mouseX <= 1010 && mouseY >= 225 && mouseY <= 375) {
            if (armasCompradas.shotgun) {
                armaEquipada = "shotgun";
                console.log("Shotgun equipada!");
            } else if (fundo.score >= 500) {
                fundo.score -= 500; // Deduz os pontos
                armasCompradas.shotgun = true; // Marca como comprada
                armaEquipada = "shotgun"; // Equipa a arma
                console.log("Shotgun comprada e equipada!");
            } else {
                console.log("Pontos insuficientes para comprar a Shotgun!");
            }
        }

        // AK-47
        if (mouseX >= 150 && mouseX <= 450 && mouseY >= 525 && mouseY <= 675) {
            if (armasCompradas.ak47) {
                armaEquipada = "ak47";
                console.log("AK-47 equipada!");
            } else if (fundo.score >= 250) {
                fundo.score -= 250; // Deduz os pontos
                armasCompradas.ak47 = true; // Marca como comprada
                armaEquipada = "ak47"; // Equipa a arma
                console.log("AK-47 comprada e equipada!");
            } else {
                console.log("Pontos insuficientes para comprar a AK-47!");
            }
        }

        // Lança-granada
        if (mouseX >= 710 && mouseX <= 1010 && mouseY >= 525 && mouseY <= 675) {
            if (armasCompradas.lanca_granada) {
                armaEquipada = "lanca_granada";
                console.log("Lança-granada equipada!");
            } else if (fundo.score >= 500) {
                fundo.score -= 500; // Deduz os pontos
                armasCompradas.lanca_granada = true; // Marca como comprada
                armaEquipada = "lanca_granada"; // Equipa a arma
                console.log("Lança-granada comprada e equipada!");
            } else {
                console.log("Pontos insuficientes para comprar o lança-granada!");
            }
        }
    } else if (play === true) {
        // Lógica de clique no jogo com perks das armas
        if (armaEquipada === "pistol" && bullet.bullets.length >= 1) {
            // Pistola: lógica padrão
            bullet.bullets.pop(); // Remove uma bala
            let acertou = false;

            patos.forEach((pato) => {
                if (
                    mouseX >= pato.x &&
                    mouseX <= pato.x + pato.w &&
                    mouseY >= pato.y &&
                    mouseY <= pato.y + pato.h
                ) {
                    pato.duck_reset(true); // Reinicia o pato
                    fundo.score += 10; // Adiciona 10 pontos ao score
                    acertou = true;

                    temporaryTexts.push({ text: "+10", x: mouseX, y: mouseY, time: Date.now() });
                }
            });

            impactos.push({ x: mouseX, y: mouseY, time: Date.now() });

            if (!acertou) {
                fundo.score -= 5;
                temporaryTexts.push({ text: "-5", x: mouseX, y: mouseY, time: Date.now() });
            }
        } else if (armaEquipada === "shotgun" && bullet.bullets.length >= 1) {
            // Shotgun: dispara 5 tiros em um raio de 100px
            bullet.bullets.pop(); // Remove uma bala
            bullet.bullets.pop(); // Remove uma bala
            bullet.bullets.pop(); // Remove uma bala
            bullet.bullets.pop(); // Remove uma bala
            bullet.bullets.pop(); // Remove uma bala
            let acertou = false;

            for (let i = 0; i < 5; i++) {
                const offsetX = Math.floor(Math.random() * 201) - 100; // Valor entre -100 e 100
                const offsetY = Math.floor(Math.random() * 201) - 100; // Valor entre -100 e 100

                const shotX = mouseX + offsetX;
                const shotY = mouseY + offsetY;

                impactos.push({ x: shotX, y: shotY, time: Date.now() });

                patos.forEach((pato) => {
                    if (
                        shotX >= pato.x &&
                        shotX <= pato.x + pato.w &&
                        shotY >= pato.y &&
                        shotY <= pato.y + pato.h
                    ) {
                        pato.duck_reset(true); // Reinicia o pato
                        fundo.score += 10; // Adiciona 10 pontos ao score
                        acertou = true;

                        temporaryTexts.push({ text: "+10", x: shotX, y: shotY, time: Date.now() });
                    }
                });
            }

            if (!acertou) {
                fundo.score -= 5;
                temporaryTexts.push({ text: "-5", x: mouseX, y: mouseY, time: Date.now() });
            }
        } else if (play === true && armaEquipada === "ak47" && bullet.bullets.length >= 1) {
            isMouseDown = true; // Marca que o botão do mouse está pressionado
            // AK-47: dispara continuamente enquanto o botão é pressionado
            const shootAk47 = () => {
                if (isMouseDown && bullet.bullets.length > 0) {
                    bullet.bullets.pop(); // Remove uma bala
                    let acertou = false;

                    patos.forEach((pato) => {
                        if (
                            mouseX >= pato.x &&
                            mouseX <= pato.x + pato.w &&
                            mouseY >= pato.y &&
                            mouseY <= pato.y + pato.h
                        ) {
                            pato.duck_reset(true); // Reinicia o pato
                            fundo.score += 10; // Adiciona 10 pontos ao score
                            acertou = true;

                            temporaryTexts.push({ text: "+10", x: mouseX, y: mouseY, time: Date.now() });
                        }
                    });
                    impactos.push({ x: mouseX, y: mouseY, time: Date.now() });

                    if (!acertou) {
                        fundo.score -= 5;
                        temporaryTexts.push({ text: "-5", x: mouseX, y: mouseY, time: Date.now() });
                    }

                    setTimeout(shootAk47, 200); // Delay de 0.2 segundos entre os disparos
                }
            };

            shootAk47(); // Inicia o disparo contínuo
        } else if (armaEquipada === "lanca_granada" && bullet.bullets.length >= 1) {
            // Lança-granada: causa dano em área
            bullet.bullets.pop(); // Remove uma bala
            let acertou = false;

            // Adiciona a explosão ao array
            explosoes.push({ x: mouseX, y: mouseY, time: Date.now() });

            patos.forEach((pato) => {
                const distance = Math.sqrt(
                    Math.pow(mouseX - (pato.x + pato.w / 2), 2) +
                    Math.pow(mouseY - (pato.y + pato.h / 2), 2)
                );

                if (distance <= 400) { // Raio de explosão de 400px
                    pato.duck_reset(true); // Reinicia o pato
                    fundo.score += 10; // Adiciona 10 pontos ao score
                    acertou = true;

                    temporaryTexts.push({ text: "+10", x: pato.x, y: pato.y, time: Date.now() });
                }
            });

            if (!acertou) {
                fundo.score -= 5;
                temporaryTexts.push({ text: "-5", x: mouseX, y: mouseY, time: Date.now() });
            }
        }
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "r" || event.key === "R") {
        if (armaEquipada === "pistol" || armaEquipada === "shotgun" || armaEquipada === "ak47" || armaEquipada === "lanca_granada") {
            // Recarrega o array de balas com base na arma equipada
            bullet.bullets = Array(balasPorArma[armaEquipada]).fill('bullet');
            console.log(`${armaEquipada} recarregada!`);
        }
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "f") {
        fundo.score += 100; // Adiciona 100 pontos ao score
    }
});

function desenha() {
    if (play === true) {
        fundo.drawBackground(canva);
        fundo2.drawBackground(canva);

        // Desenha todos os patos
        patos.forEach((pato, index) => {
            if (index < 2 || (index < 4 && fundo.score >= 50) || (index < 5 && fundo.score >= 90)) {
                pato.drawDuck(canva);
            }
        });

        // Desenha trem
        tremFundo.drawBackground(canva);

        // Desenha explosões
        explosoes.forEach((explosao, index) => {
            const elapsedTime = Date.now() - explosao.time;
            if (elapsedTime < 1000) { // Exibe a explosão por 1 segundo
                const gif = new Image();
                gif.src = './assets/explosao.gif'; // Caminho para o GIF da explosão
                canva.drawImage(gif, explosao.x - 200, explosao.y - 200, 400, 400); // Centraliza a explosão no clique
            } else {
                explosoes.splice(index, 1); // Remove a explosão após 1 segundo
            }
        });

        // Desenha os impactos
        impactos.forEach((impacto, index) => {
            const elapsedTime = Date.now() - impacto.time;
            if (elapsedTime < 100) { // Exibe o impacto por 2 segundos
                canva.fillStyle = "red"; // Cor do quadrado
                canva.fillRect(impacto.x - 2.5, impacto.y - 2.5, 5, 5); // Desenha o quadrado centralizado
            } else {
                impactos.splice(index, 1); // Remove o impacto após 2 segundos
            }
        });

        // Desenha textos temporários
        temporaryTexts.forEach((tempText) => {
            if (tempText.text === "+10") {
                texto.drawText(canva, tempText.text, tempText.x, tempText.y, "30px Arial", "lightgreen");
            } else if (tempText.text === "-5") {
                texto.drawText(canva, tempText.text, tempText.x, tempText.y, "30px Arial", "red");
            }
        });
    } else if (menu === true) {
        // Desenha menu
        fundoMenu.drawBackground(canva);
        fundo.drawRectangle(canva, 300, 100, 500, 700, "black", 0.5);
        fundo.drawRectangle(canva, 300, 100, 500, 100, "black", 0.5);
        canva.font = "30px Arial";
        canva.fillStyle = "white";
        texto.drawText(canva, "Menu", 510, 160, 500);
        fundo.drawRectangle(canva, 350, 225, 400, 150, "black", 0.5);
        fundo.drawRectangle(canva, 350, 405, 400, 150, "black", 0.5);
        texto.drawText(canva, "🎮 | Jogar", 480, 300, 500);
        texto.drawText(canva, "🏪 | Loja", 490, 490, 500);
        texto.drawText(canva, "⭐ | Pontos: " + fundo.score, 450, 600, 500);
    } else if (loja === true) {
        // Desenha loja
        fundoMenu.drawBackground(canva);
        fundo.drawRectangle(canva, 130, 100, 900, 800, "black", 0.5);
        fundo.drawRectangle(canva, 130, 100, 900, 100, "black", 0.5);
        fundo.drawRectangle(canva, 130, 100, 250, 100, "white", 0.5);

        canva.font = "30px Arial";
        canva.fillStyle = "white";

        texto.drawText(canva, "⭐ | Pontos: " + fundo.score, 150, 160, 500);
        texto.drawText(canva, "💲Loja💲", 510, 160, 500);

        // Pistola
        fundo.drawRectangle(canva, 150, 225, 300, 150, "black", 0.5);
        pistol.drawBackground(canva);
        texto.drawText(canva, "Pistola", 250, 365, "30px Arial Black", "white");
        texto.drawText(
            canva,
            armaEquipada === "pistol" ? "Equipped" : armasCompradas.pistol ? "Wonned" : "Free",
            235,
            440,
            "30px Arial Black",
            armaEquipada === "pistol" ? "lightgreen" : "white"
        );

        // Shotgun
        fundo.drawRectangle(canva, 710, 225, 300, 150, "black", 0.5);
        shotgun.drawBackground(canva);
        texto.drawText(canva, "Shotgun", 800, 365, "30px Arial Black", "white");
        texto.drawText(
            canva,
            armaEquipada === "shotgun" ? "Equipped" : armasCompradas.shotgun ? "Wonned" : "500⭐",
            820,
            440,
            "30px Arial Black",
            armaEquipada === "shotgun" ? "lightgreen" : "white"
        );

        // AK-47
        fundo.drawRectangle(canva, 150, 525, 300, 150, "black", 0.5);
        ak47.drawBackground(canva);
        texto.drawText(canva, "AK-47", 265, 660, "30px Arial Black", "white");
        texto.drawText(
            canva,
            armaEquipada === "ak47" ? "Equipped" : armasCompradas.ak47 ? "Wonned" : "250⭐",
            260,
            737,
            "30px Arial Black",
            armaEquipada === "ak47" ? "lightgreen" : "white"
        );

        // Lança-granada
        fundo.drawRectangle(canva, 710, 525, 300, 150, "black", 0.5);
        lanca_granada.drawBackground(canva);
        texto.drawText(canva, "Lança Granada", 740, 660, "30px Arial Black", "white");
        texto.drawText(
            canva,
            armaEquipada === "lanca_granada" ? "Equipped" : armasCompradas.lanca_granada ? "Wonned" : "500⭐",
            820,
            737,
            "30px Arial Black",
            armaEquipada === "lanca_granada" ? "lightgreen" : "white"
        );
    }
}

function atualiza() {
    if (play) {
        const currentTime = Date.now(); // Atualiza o tempo atual a cada frame

        // Remove textos temporários após 2 segundos
        temporaryTexts = temporaryTexts.filter((tempText) => currentTime - tempText.time < 2000);

        // Movimento dos patos
        patos.forEach((pato, index) => {
            if (index < 2 || (index < 4 && fundo.score >= 50) || (index < 5 && fundo.score >= 90)) {
                pato.mov_duck(6, 0);
                pato.duck_reset(); // Reinicia o pato se necessário
            }
        });

        // Atualiza o tempo e desenha textos
        fundo.drawRectangle(canva, 100, 65, 250, 150, "black", 0.5);
        texto.drawText(canva, "⭐ | Pontos: " + fundo.score, 100, 100, "30px Arial", "yellow");
        texto.drawText(canva, "🕛 | Tempo: " + (a / 100), 100, 150, "30px Arial", "yellow");
        texto.drawText(canva, "🔫 | Balas: " + bullet.bullets.length, 100, 200, "30px Arial", "yellow");
        if (bullet.bullets.length <= 3) {
            texto.drawText(canva, "" + bullet.bullets.length, 257, 200, "31px Arial", "red");
        }
        fundo.drawRectangle(canva, 100, 20, 135, 45, "black", 0.5);
        texto.drawText(canva, "ESC (Menu)", 105, 50, "20px Arial Black", "yellow");

        if (bullet.bullets.length === 0) {
            texto.drawText(canva, "Pressione R para recarregar", 350, 250, "30px Arial", "red");
        }

        // Movimento do fundo
        fundo.mov_background(-2, 0);
        fundo2.mov_background(-2, 0);

        if (fundo.x + fundo.w <= 0) {
            fundo.x = fundo2.x + fundo2.w;
        }
        if (fundo2.x + fundo2.w <= 0) {
            fundo2.x = fundo.x + fundo.w;
        }

        a++; // Incrementa o contador de tempo
    }
}

function main() {
    canva.clearRect(0, 0, 1152, 1080)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main();