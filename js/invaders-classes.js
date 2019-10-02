
// Alien invaders from game
var Invader = function (x, y) {
    ObjectGame.call(this, x, y);
    this.currentMap = 0;
};

Invader.prototype = Object.create(ObjectGame.prototype);

Invader.prototype.alternateMap = function (statusToggle) {
    if (statusToggle && this.currentMap == 0) {
        this.currentMap = 1;
    } else if (statusToggle && this.currentMap == 1) {
        this.currentMap = 0;
    } else if (statusToggle && this.currentMap == 2) {
        this.currentMap = 3;
    }    
    //this.render(this.maps[this.currentMap], this.x, this.y);    
};

var SmallInvader = function (x, y) {
    ObjectGame.call(this, x, y);
    this.points = 30;
    this.maps = [
        PixelSprites.Squid, 
        PixelSprites.Squid2, 
        PixelSprites.AlienExplosion, 
        PixelSprites.Dead
    ];
    this.width = Definitions.pixelSize * this.maps[0][0].length;
    this.height = Definitions.pixelSize * this.maps[0].length;
};
SmallInvader.prototype = Object.create(Invader.prototype);

var MediumInvader = function (x, y) {
    ObjectGame.call(this, x, y);
    this.points = 20;
    this.maps = [
        PixelSprites.Crab, 
        PixelSprites.Crab2, 
        PixelSprites.AlienExplosion, 
        PixelSprites.Dead
    ];
    this.width = Definitions.pixelSize * this.maps[0][0].length;
    this.height = Definitions.pixelSize * this.maps[0].length;
};
MediumInvader.prototype = Object.create(Invader.prototype);

var LargeInvader = function (x, y) {
    ObjectGame.call(this, x, y);
    this.points = 10;
    this.maps = [
        PixelSprites.Jellyfish, 
        PixelSprites.Jellyfish2, 
        PixelSprites.AlienExplosion, 
        PixelSprites.Dead
    ];
    this.width = Definitions.pixelSize * this.maps[0][0].length;
    this.height = Definitions.pixelSize * this.maps[0].length;
};
LargeInvader.prototype = Object.create(Invader.prototype);

var UfoInvader = function (x, y) {
    ObjectGame.call(this, x, y);
    this.color = "red";
    this.points = (new Array(50, 100, 150))[Math.getRandomInt(0, 2)]; // personality function
    this.velocity = 2;
    this.maps = [
        PixelSprites.UFO, 
        PixelSprites.UFO, 
        PixelSprites.AlienExplosion, 
        PixelSprites.Dead
    ];
    this.width = Definitions.pixelSize * this.maps[0][0].length;
    this.height = Definitions.pixelSize * this.maps[0].length;
}
UfoInvader.prototype = Object.create(Invader.prototype);

var CoreCannon = function(x, y) {     
    Invader.call(this, x, y);
    this.color = Definitions.secondaryColor;
    this.velocity = 8;
    this.maps = [
        PixelSprites.Cannon, 
        PixelSprites.Cannon, 
        PixelSprites.AlienExplosion, 
        PixelSprites.Dead
    ];
    this.width = Definitions.pixelSize * this.maps[0][0].length;
    this.height = Definitions.pixelSize * this.maps[0].length;
};
CoreCannon.prototype = Object.create(Invader.prototype);

// Lateral Colision of CoreCannon
CoreCannon.prototype.move = function (positionX) {
    var insideRightLimit = (positionX < cv.width - this.width);
    var insideLeftLimit = (positionX > 1);
    if (insideLeftLimit && insideRightLimit) {
        this.x = positionX;
    }
};

CoreCannon.prototype.shoot = function() {
    var laserCannon = new LaserCannon(this.x + (this.width / 2 - 1), this.y);
    ObjectsOnStage.laserCannon.push(laserCannon);
};


// Laser Cannon
var LaserCannon = function (x, y) {
    this.x = x;
    this.y = y - 10;
    this.velocity = 30;
    this.isAlive = 1;
    this.width = 3;
    this.height = 15;
    this.color = Definitions.primaryColor;
};

LaserCannon.prototype.move = function () {
    this.y -= this.velocity;
    this.render();
};

LaserCannon.prototype.render = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
};

LaserCannon.prototype.collisionWasDetected = function (target) {
    // if Collision detected!
    return (
        this.x < target.x + target.width &&
        this.x + this.width > target.x &&
        this.y < target.y + target.height &&
        this.height + this.y > target.y
    );
};


// Laser Invader
var LaserInvaders = function (x, y) {
    LaserCannon.call(this, x, y);
};
LaserInvaders.prototype = Object.create(LaserCannon.prototype);
LaserInvaders.prototype.move = function () {
    this.y += this.velocity;
    this.render();             
};


var LaserSmallInvader = function (x, y) {
    LaserInvaders.call(this, x, y);
};
LaserSmallInvader.prototype = Object.create(LaserInvaders.prototype);
LaserSmallInvader.prototype.render = function () {
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x + 1, this.y);
    ctx.lineTo(this.x - 1, this.y + 3.75);
    ctx.lineTo(this.x + 1, this.y + 7.5);
    ctx.lineTo(this.x - 1, this.y + 11.25);
    ctx.lineTo(this.x + 1, this.y + 15);
    ctx.stroke();
};


var LaserMediumInvader = function (x, y) {
    LaserInvaders.call(this, x, y);
};
LaserMediumInvader.prototype = Object.create(LaserInvaders.prototype);
LaserMediumInvader.prototype.render = function () {
    //ctx.lineWidth = 3;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - 0.75, this.y, this.width / 2, this.height - 3);
    ctx.beginPath();
    ctx.moveTo(this.x - 3, this.y + 10);
    ctx.lineTo(this.x + 3, this.y + 10);
    ctx.lineTo(this.x + 0, this.y + 15);
    ctx.fillStyle = this.color;
    ctx.fill();
};


var LaserLargeInvader = function (x, y) {
    LaserInvaders.call(this, x, y);
};
LaserLargeInvader.prototype = Object.create(LaserInvaders.prototype);
LaserLargeInvader.prototype.render = function () {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x - 1.5, this.y);
    ctx.lineTo(this.x + 1.5, this.y + 5);
    ctx.lineTo(this.x - 1.5, this.y + 10);
    ctx.lineTo(this.x + 1.5, this.y + 15);
    ctx.stroke();
};


var LaserUfoInvader = function (x, y) {
    LaserInvaders.call(this, x, y);
};
LaserUfoInvader.prototype = Object.create(LaserInvaders.prototype);
LaserUfoInvader.prototype.render = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width / 2, this.height);
    ctx.fillRect(this.x - 3.5, this.y, this.width + 6, this.width / 2);
};


var BaseShelter = function (x, y) {
    ObjectGame.call(this, x, y);
    this.currentMap = 0;
};
BaseShelter.prototype = Object.create(ObjectGame.prototype);