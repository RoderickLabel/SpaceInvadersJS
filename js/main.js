
/**
 * Space Invader Classic in Canvas
 * @author Rodrigo Ruotolo <roderickruotolo@gmail.com>
 */

var cv, ctx,
    gameSession;
    //hiScore = 2000;

/**
 * Game Definitions
 */
var Definitions = {
    fontProperties : "17pt 'Courier'",
    pixelSize : 3,
    primaryColor : "#FFFFFF",
    secondaryColor : "#AAFFFF",
    backgroundColor : "#000000",
    widthScreen: 750,
    heightScreen: 680,
};

// Início de todas as chamadas do jogo
window.addEventListener("load", function () {
    var setUp = new SetUp();
    var game = new SpaceInvaders();
    setUp.init();
    game.init();
    SoundsManager.loadSounds();
});



var SetUp = function () {
    this.init = function () {
        cv = document.getElementById("cv");
        cv.width = Definitions.widthScreen;
        cv.height = Definitions.heightScreen;
        ctx = cv.getContext("2d");
    }   
};

/**
 * Game Session
 */
var Session = function (Definitions) {
    this.players = new Array();
    this.definitions = Definitions;
    this.includePlayers = function (Player) {
        this.players.push(Player);
    }
    this.hiScore = 5000;
};

/**
 * Game Player
 */
var Player = function () {
    this.won = false;
    this.score = 0;
    this.isAlive = true;
    this.lives = 4;

    this.killed = function () {        
        this.lives--;

        if (this.lives == 0) {
            this.isAlive = false;
        }
    }
};

var SpaceInvaders = function () {
    this.init = function () {
        gameSession = new Session(Definitions);

        gamePlayer1 = new Player();
        gamePlayer2 = new Player();

        gameSession.includePlayers(gamePlayer1);
        gameSession.includePlayers(gamePlayer2);
        
        var GameScenes = [
            new SceneMenu(gameSession), 
            new SceneInstructions(gameSession), 
            new SceneGame(gameSession), 
            new SceneWinner(gameSession), 
            new SceneLoser(gameSession)
        ];        

        // var GameScenes = [new SceneWinner(gameSession)]; // Line to test each scene individually
        var scenesManager = new ScenesManager(GameScenes);
        scenesManager.run();
    };
};

// get integer random between two values
Math.getRandomInt = function (min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};


var Menu = {
    option : 1,
    altOption : function () {
        if (this.option == 1) {
            this.option = 2;
            this.drawTwoPlayers();
        } else if (this.option == 2) {
            this.option = 1;
            this.drawOnePlayer();
        }
    },
    drawOnePlayer : function () {
        players = 1;
        ctx.fillStyle = Definitions.secondaryColor;
        ctx.fillText("* 1 PLAYER", 290, 400);
        ctx.fillStyle = Definitions.primaryColor;
        ctx.fillText("* 2 PLAYERS", 290, 450);
    },
    drawTwoPlayers : function () {
        players = 2;
        ctx.fillStyle = Definitions.primaryColor;
        ctx.fillText("* 1 PLAYER", 290, 400);
        ctx.fillStyle = Definitions.secondaryColor;
        ctx.fillText("* 2 PLAYERS", 290, 450);
    }
};



/**
 * @return Array - a object array
 */
var createSpaceInvaders = function () {     
    var AlienInvaders = [];
    // Create indexes for push
    for (var i = 0; i < 5; i++) {
        AlienInvaders[i] = [];
    }
    // Populate array
    for (var i = 0; i < 11; i++) {
        // Create Small Invaders
        AlienInvaders[0][i] = new SmallInvader(100 + (50 * i), 20 + 140);

        // Create Medium Invaders
        AlienInvaders[1][i] = new MediumInvader(100 + (50 * i), 20 + 180);
        AlienInvaders[2][i] = new MediumInvader(100 + (50 * i), 20 + 220);

        // Create Large Invaders
        AlienInvaders[3][i] = new LargeInvader(100 + (50 * i), 20 + 260);
        AlienInvaders[4][i] = new LargeInvader(100 + (50 * i), 20 + 300);

    }
    return AlienInvaders;
};

var SpaceInvadersMask = function (AlienInvaders) {
    this.aliens = AlienInvaders;
    this.masks = new Array();
    this.totalMasks = 0;
    this.animatedFinished = false;
    this.create = function () {
        for (var i = 0; i < this.aliens.length; i++) {
            for (var j = 0; j < this.aliens[i].length; j++) {
                this.masks.push({
                    x:this.aliens[i][j].x, 
                    y:this.aliens[i][j].y, 
                    w:this.aliens[i][j].width, 
                    h:this.aliens[i][j].height
                });
            }
        }
        this.totalMasks = this.masks.length - 1;
    };
    this.render = function () {
        if (this.totalMasks > 0) {            
            ctx.fillStyle = "#000000";
            for (var i = 0; i < this.totalMasks; i++) {
                ctx.fillRect(this.masks[i].x, this.masks[i].y, 40, 40);
            }
        }
    };
    this.remove = function () {
        this.totalMasks--;
    };
    this.run = function () {
        // Efeito para mostrar os invasores...
        if (this.totalMasks > 0) {
            for (var i = 0; i < 2; i++) {
                this.render();
                this.remove();
            }
        } else {
            this.animatedFinished = true;
        }
    }
};





