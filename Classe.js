class Game {
    constructor(x,y,h,w,a,ducks,image,bullets,score,time,isGameOver) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.a = a;
        this.ducks = ducks || [];
        this.image = image;
        this.bullets = bullets;
        this.score = score || 0;
        this.time = time;
        this.isGameOver = isGameOver;
    }

    drawBackground(canva){
        if (this.image) {
            let img = new Image();
            img.src = this.image;
            canva.drawImage(img, this.x, this.y, this.w, this.h);
        }
    }
    mov_background(speedX, speedY){
        this.x += speedX;
        this.y += speedY;
    }

    drawText(canva, text, x, y, font, color) {
        canva.font = font;
        canva.fillStyle = color;
        canva.fillText(text, x, y);
    }
}

class Ducks extends Game{
    speedX = 0;
    speedY = 0;

    duck_reset(tiro){
        if(this.x >= 1152 || tiro === true){
            this.y = Math.floor(Math.random() * (1080 - this.h));
            this.x = -Math.floor(Math.random() * 201);
        }
    }

    mov_duck(speedX, speedY){
        this.x += speedX;
        this.y += speedY;
    }

    isOutOfScreen(){
        return jogo = true
    }

    dieAnimation(){

    }

    drawDuck(canva){
        if (this.image) {
            let img = new Image();
            img.src = this.image;
            canva.drawImage(img, this.x, this.y, this.w, this.h);
        }
}
}

class Bullet extends Game{
    speed = 0
    isActive = false
    
    drawBullets(){

    }

    moveBullets(){
}}

class Scream extends Game{
    gameOverDraw(){

    }
    faseScreenDraw(){
    
    }
    homeScreenDraw(){

    }
    storeScreenDraw(){

    }

}