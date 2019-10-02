

// Object collection from Scene
var ObjectsOnStage = { currentLineInvaders : 4, directionInvaders : 1 };

// animate space invaders
ObjectsOnStage.animateInvaders = function (toogle) {    
    for (var i = 0; i < this.alienInvaders.length; i++) {
        for (var j = 0; j < this.alienInvaders[i].length; j++) {
            this.alienInvaders[i][j].alternateMap(toogle);
        }
    }

    for (var i = 0; i < this.ufo.length; i++) {
        this.ufo[i].alternateMap(toogle);
    }
};

// render all aliens invaders from game        
ObjectsOnStage.renderInvaders = function () {    
    for (var i = 0; i < this.alienInvaders.length; i++) {
        for (var j = 0; j < this.alienInvaders[i].length; j++) {
            this.alienInvaders[i][j].render();
        }
    }
};

// move laserCannons
ObjectsOnStage.moveLaserCannon = function () {    
    if (this.laserCannon.length > 0) {
        for (var i = 0; i < this.laserCannon.length; i++) {
            this.laserCannon[i].move();
        }
    }
};

ObjectsOnStage.lasersAreDead = function () {
    if (this.laserCannon.length > 0) {
        for (var i = 0; i < this.laserCannon.length; i++) {
            if (this.laserCannon[i].isAlive) {
                return false;
            }
        }
    }
    return true;
};

ObjectsOnStage.verifyCannonShoot = function (Session) {

    if (this.laserCannon.length > 0) {
        
        // Varre cada projétil e os move, quadro a quadro
        for (var i = 0; i < this.laserCannon.length; i++) {
            
            if (this.laserCannon[i].isAlive == 1) {

                this.laserCannon[i].move();
                
                // passado o limite do alvo o projétil se destrói
                if (this.laserCannon[i].y < 0) {
                    ctx.fillStyle = (255, 200, 200);
                    drawEllipseByCenter(ctx, this.laserCannon[i].x, 3, 20, 10);
                    this.laserCannon[i].isAlive = 0;
                }

                // Verify colisions with Aliens Invaders
                for (var j = 0; j < this.alienInvaders.length; j++) {
                    for (var k = 0; k < this.alienInvaders[j].length; k++) {
                        if (this.laserCannon[i].isAlive == 1 && this.alienInvaders[j][k].isAlive == 1) {                            
                            if ( this.laserCannon[i].collisionWasDetected(this.alienInvaders[j][k]) ) {                                
                                // collision detected!
                                this.alienInvaders[j][k].currentMap = 2;
                                this.alienInvaders[j][k].isAlive = 0;
                                this.laserCannon[i].isAlive = 0;
                                SoundsManager.playSound('shoot');
                                // Sum points to Player
                                Session.players[0].score += this.alienInvaders[j][k].points;
                            }
                        }
                    }
                }

                // verify colision with UFO
                for (var u = 0; u < this.ufo.length; u++) {
                    //console.log(this.laserCannon[i].isAlive);
                    if (this.laserCannon[i].isAlive == 1 && this.ufo[u].isAlive == 1) {
                        if ( this.laserCannon[i].collisionWasDetected(this.ufo[u]) ) {
                            // collision detected!
                            // ctx.fillStyle = (255, 200, 200);
                            // drawEllipseByCenter(ctx, this.laserCannon[i].x, this.laserCannon[i].y, 30, 10);
                            this.ufo[u].currentMap = 2;
                            this.ufo[u].isAlive = 0;
                            this.laserCannon[i].isAlive = 0;
                            ctx.fillText(this.ufo[u].points, this.ufo[u].x + this.ufo[u].width * 0.3, this.ufo[u].y + this.ufo[u].height * 1.05);
                            Session.players[0].score += this.ufo[u].points;
                            SoundsManager.playSound('ufoLowpitch');
                        }
                    }
                }                    
            

            }

        }

    }

};


ObjectsOnStage.moveInvadersTroopers = function (x, y) { 
    var stepY = 0;
    var condition = (this.alienInvaders[0][10].x > cv.width - 60 || this.alienInvaders[0][0].x < 15);

    if (condition) {
        this.directionInvaders *= -1;
        stepY = y;
    }

    for (var i = 0; i < this.alienInvaders[this.currentLineInvaders].length; i++) {
        if (this.currentLineInvaders % 2 > 0 && condition) {
            this.alienInvaders[this.currentLineInvaders][i].move(x * this.directionInvaders * -1, 0 + stepY); 
        } else {
            this.alienInvaders[this.currentLineInvaders][i].move(x * this.directionInvaders, 0 + stepY); 
        }
    }

    if (this.currentLineInvaders == 0) {
        this.currentLineInvaders = 4;
    } else {
        this.currentLineInvaders--;
    }
};
