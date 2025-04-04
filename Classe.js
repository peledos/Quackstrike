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
        this.score = score;
        this.time = time;
        this.isGameOver = isGameOver;
    }}

class Ducks extends Game{
    speedX = 0;
    speedY = 0;
    isShot = false;

    duck_reset(){
        if(this.x >= 1152){
            let aleatorio = (Math.floor(Math.random() * 101)) * -1
            this.x = aleatorio
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