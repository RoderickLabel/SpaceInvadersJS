/**
 * @author Rodrigo Ruotolo <roderickruotolo@gmail.com>
 */

/**
 * Object Game is parent of the majority actors game kinds
 */
var ObjectGame = function (x, y) {
    //this.centerX;
    //this.centerY;
    this.x = x;
    this.y = y;
    this.maps;
    this.currentMap = 0;
    this.isAlive = 1;
    this.velocity = 1;
    this.color = Definitions.primaryColor;
    this.direction = 1;
};

ObjectGame.prototype.render = function () {
    if (this.maps.length > 0) {
        for (var i = 0; i < this.maps[this.currentMap].length; i++) {
            for (var j = 0; j < this.maps[this.currentMap][i].length; j++) {
                if (this.maps[this.currentMap][i][j]) {
                    ctx.fillStyle = this.color;
                } else {
                    ctx.fillStyle = Definitions.backgroundColor;
                }
                ctx.fillRect(
                    this.x + Definitions.pixelSize * j, 
                    this.y + Definitions.pixelSize * i, 
                    Definitions.pixelSize, Definitions.pixelSize
                );
            }
        }
    } else {
        new Error("The propertie maps is empty");
    }
};


ObjectGame.prototype.move = function (x, y) {    
    this.x += x * this.direction * this.velocity;
    this.y += y * this.direction * this.velocity;
};

// if Collision detected return true
ObjectGame.prototype.verifyColision = function (target) {
    return (
        this.x < target.x + target.width &&
        this.x + this.width > target.x &&
        this.y < target.y + target.height &&
        this.height + this.y > target.y
    );
};