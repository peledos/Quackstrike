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

    des_obj(canva, x, y, w, h, a, b1 = 0, b2 = 0) {
        canva.fillStyle = a;
        
        // Se não tem borda arredondada, usa fillRect normal
        if (b1 <= 0 && b2 <= 0) {
            canva.fillRect(x, y, w, h);
            return;
        }
        
        // Suporte para navegadores modernos com roundRect
        if (canva.roundRect) {
            canva.beginPath();
            canva.roundRect(x, y, w, h, [b1, b2]);
            canva.fill();
        } 
        // Fallback para navegadores antigos
        else {
            this._drawRoundedRect(canva, x, y, w, h, Math.max(b1, b2));
        }
    }

    // Método auxiliar para desenhar retângulos arredondados em navegadores antigos
    _drawRoundedRect(ctx, x, y, width, height, radius, a) {
        ctx.fillStyle = a;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
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

    checarArma(arma){
        if(arma == 1){
           return this.bullets = ['bullet1', 'bullet2', 'bullet3', 'bullet4', 'bullet5'];
        }
        else if(arma == 2){
           return this.bullets = ['bullet1', 'bullet2', 'bullet3', 'bullet4', 'bullet5', 'bullet6', 'bullet7', 'bullet8', 'bullet9', 'bullet10'];
        }
        else if(arma == 3){
           return this.bullets = ['bullet1', 'bullet2', 'bullet3', 'bullet4', 'bullet5', 'bullet6', 'bullet7', 'bullet8', 'bullet9', 'bullet10', 'bullet11', 'bullet12', 'bullet13', 'bullet14', 'bullet15'];
        }
    }
    
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