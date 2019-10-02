/**
 * @author Rodrigo Ruotolo Barbosa <roderickruotolo@gmail.com>
 * Game Scenes
 * @description AllObjects responsible by display scenes from game: 
 * ScenesManager
 * Scene
 * SceneMenu
 * SceneInstructions
 * SceneGame
 * SceneWinner
 * SceneLoser
 *
 */
var Scene = function (Session) {
    this.sceneName = "";
    this.session = Session;
    this.draw = function () {};
};

/**
 * Scene Menu
 */
var SceneMenu = function (Session) {
    Scene.call(this, Session);
    this.sceneName = "sceneMenu";
    this.draw = function () {        
        clearScreen(cv, ctx, 
        	this
        		.session
        		.definitions
        		.backgroundColor);
        drawHeader(ctx, 
        	this.session.definitions, 
        	this.session.players[0], 
        	this.session.players[1], 
        	this.session.hiScore);
        drawFooter(ctx, this.session.definitions);
        drawTextMenu(ctx, this.session.definitions);
        Menu.drawOnePlayer();
        //ctx.fillStyle = this.session.definitions.primaryColor;
    };
};
SceneMenu.prototype = Object.create(Scene.prototype);


/**
 * @description
 * Scene responsable for show instructions and score rules
 */
var SceneInstructions = function (Session) {
    Scene.call(this, Session);
    this.sceneName = "sceneInstructions";

    this.draw = function () {
        clearScreen(cv, ctx, this.session.definitions.backgroundColor);
        drawHeader(ctx, this.session.definitions, Session.players[0], Session.players[1], this.session.hiScore);
        drawFooter(ctx, this.session.definitions);
        
        var ufo     = new UfoInvader(cv.width / 3.3, cv.height  / 1.95);
        var small   = new SmallInvader(cv.width / 3.14, cv.height / 1.79);
        var medium  = new MediumInvader(cv.width / 3.18, cv.height / 1.63);
        var large   = new LargeInvader(cv.width / 3.2, cv.height  /  1.47);

        ObjectsOnStage.avatars = new Array(ufo, small, medium, large);
        ctx.fillText("*SCORE   ADVANCE   TABLE*", cv.width / 3.9, cv.height / 2.1);

        typeWriter(ctx, "PLAY", cv.width / 2.4, cv.height / 3.3, function() {
            typeWriter(ctx, "SPACE    INVADERS!", cv.width / 3.1, cv.height / 2.7, function() {
                for (var i = 0; i < ObjectsOnStage.avatars.length; i++) {
                    ObjectsOnStage.avatars[i].render();
                }
                typeWriter(ctx, this.session.definitions, "= ? MISTERY", cv.width / 2.5, cv.height / 1.85, function() {
                    typeWriter(ctx, this.session.definitions, "= 30 POINTS", cv.width / 2.5, cv.height / 1.7, function() {
                        typeWriter(ctx, this.session.definitions, "= 20 POINTS", cv.width / 2.5, cv.height / 1.55, function() {
                            typeWriter(ctx, this.session.definitions, "= 10 POINTS", cv.width / 2.5, cv.height / 1.4, function (){ 
                                turnThePage(ctx, this.session.definitions, "right");
                             })
                        })
                    })
                })
            })
        });

    };
};
SceneInstructions.prototype = Object.create(Scene.prototype);



/**
 * Scene Default Run Game
 */
var SceneGame = function (Session) {
    Scene.call(this, Session);
    this.sceneName = "sceneGame"; 
    
    //var timeScene = 7;    
    var timeScene = 14;
    var count = 0;
    var start = null;
    

    this.draw = function () {

        var parent = this;

        clearScreen(cv, ctx, parent.session.definitions.backgroundColor);
        ctx.font = parent.session.definitions.fontProperties;
        drawHeader(ctx, parent.session.definitions, parent.session.players[0], parent.session.players[1], parent.session.hiScore);
        drawFooter(ctx, parent.session.definitions);
        ctx.fillText("PLAY  PLAYER <1>", cv.width / 3, cv.height / 2.1); 

        window.setTimeout(function () {
            
            clearScreen(cv, 
            	ctx, 
            	parent.session.definitions.backgroundColor);
            drawHeader(ctx, 
            	parent.session.definitions, 
            	parent.session.players[0], 
            	parent.session.players[1], 
            	parent.session.hiScore);
            drawFooter(ctx, 
            	parent.session.definitions);

            ObjectsOnStage.stageIsOver = false;

            //ObjectsOnStage
            ufo1 = new UfoInvader(50, 90);
            ObjectsOnStage.ufo = [ufo1];
            ObjectsOnStage.cannon = new CoreCannon(50, 580);
            ObjectsOnStage.alienInvaders = createSpaceInvaders();
            ObjectsOnStage.laserCannon = new Array();

            
            masks = new SpaceInvadersMask(ObjectsOnStage.alienInvaders);
            masks.create();

            window.setInterval(function() {

                clearScreen(cv, 
                	ctx, 
                	parent.session.definitions.backgroundColor);
                drawHeader(ctx, 
                	parent.session.definitions, 
                	parent.session.players[0], 
                	parent.session.players[1], 
                	parent.session.hiScore);
                drawFooter(ctx, parent.session.definitions);

                var toogle = (count % timeScene == 0);
                
                
                // ufo movement
                if (ObjectsOnStage.ufo[0].x > cv.width + 100 || ObjectsOnStage.ufo[0].x < -100) {
                    ObjectsOnStage.ufo[0].direction *= -1;
                } // ufo move and render
                ObjectsOnStage.ufo[0].move(ObjectsOnStage.ufo[0].velocity, 0);
                ObjectsOnStage.ufo[0].render();


                ObjectsOnStage.cannon.render();                
                
                // render all aliens invaders from game
                ObjectsOnStage.renderInvaders();

                // verifica colisões do lazer atirado pelo jogador
                ObjectsOnStage.verifyCannonShoot(parent.session);

                ObjectsOnStage.animateInvaders(count % 10 == 0);

                // Efeito para simular renzerização dos invasores finalizado!
                if (masks.animatedFinished) {
                    if (count % 2 == 0) {
                        ObjectsOnStage.moveInvadersTroopers(8, 8);
                    }
                    // Music and UFOs sound
                    if (count % 2 == 0) {
                        if (toogle) {
                            //SoundsManager.playSoundTrack();
                        }
                        if (ObjectsOnStage.ufo[0].isAlive && (count % 5 == 0)) {
                            //SoundsManager.playSound('ufoHighpitch');                        
                        }
                    }
                } else {
                    // Efeito para simular renderização dos invasores...
                    masks.run();
                }

                if (count > 6000) {
                    count = 0;
                }

                if (count > 500) {
                    console.log("agora o jogo começou");
                }

                count++;

            }, 60);
            
            var controlsGame = function (e) {
                var key = e.which || e.keyCode;

                // shoot
                if (key === 32) { // 32 space
                    // atira apenas um lazer por vez
                    if ( ObjectsOnStage.lasersAreDead() ) {
                        ObjectsOnStage.cannon.shoot();
                        SoundsManager.playSound('invaderKilled');
                    }
                // move left
                } else if (key === 37) {
                    ObjectsOnStage.cannon.move(ObjectsOnStage.cannon.x - ObjectsOnStage.cannon.velocity, 0);
                // move right
                } else if (key === 39) {
                    ObjectsOnStage.cannon.move(ObjectsOnStage.cannon.x + ObjectsOnStage.cannon.velocity, 0);
                }
            };

            window.addEventListener("keydown", controlsGame);
            if (ObjectsOnStage.stageIsOver) {            
                window.removeEventListener("keydown", controlsGame);
            }

            

        }, 2000);


    };
};
SceneGame.prototype = Object.create(Scene.prototype);



/**
 * Scene Winner
 */
var SceneWinner = function (Session) {
    Scene.call(this, Session);
    this.sceneName = "sceneWinner"; 
    this.draw = function () {
        clearScreen(cv, ctx, this.session.definitions.backgroundColor);
        ctx.font = this.session.definitions.fontProperties;
        ctx.fillText("Thanks for Playing!", 10, 50);
    };
};
SceneWinner.prototype = Object.create(Scene.prototype);



/**
 * Scene Loser
 */
var SceneLoser = function (Session) {
    Scene.call(this, Session);
    this.sceneName = "sceneLoser"; 
    this.draw = function () {
        clearScreen(cv, ctx, this.session.definitions.backgroundColor);
        ctx.font = this.session.definitions.fontProperties;
        ctx.fillText("You Lose!",10,50);
    };
};
SceneLoser.prototype = Object.create(Scene.prototype);



/**
 * Scenes Manager
 * @param GameScenes Scene[]
 */
var ScenesManager = function (GameScenes) {
    this.currentScene = 0;
    this.won = false;
    this.gameScenes = GameScenes;
    this.nextScene = function () {
        if (this.currentScene == 2 && this.won) {
            this.currentScene = 3;
            this.gameScenes[3];
        } else if (this.currentScene == 2 && !this.won) {
            this.currentScene = 3;
            this.gameScenes[3];
        } else {
            this.currentScene++;
            this.gameScenes[this.currentScene];
            console.log("Cena atual: " + this.currentScene + " " + new Date());
        }
    },
    this.run = function () {
        var parent = this;
        //this.gameScenes[this.currentScene].objectsInStage = this.objectsInStage;
        this.gameScenes[this.currentScene].draw();

        // Aqui iniciamos o menu e setaremos o objeto this.session.definitions 
        // dependendo das escolhas do usuário 
        if (this.gameScenes[this.currentScene].sceneName == "sceneMenu") {
            var initGame = function (e) {
                var key = e.which || e.keyCode;
                if (key === 13) { // 13 is enter
                    // code for enter
                    parent.nextScene();
                    window.removeEventListener("keydown", initGame);
                    parent.run();
                } else if (key === 38 || key === 40) {
                    Menu.altOption();
                }
            };
            window.addEventListener("keydown", initGame);

        // Aqui roda a cena de preparação onde são mostradas as pontuações básicas
        } else if (this.gameScenes[this.currentScene].sceneName == "sceneInstructions") {
            
            window.setTimeout(function () {
                console.log("Terminada cena de preparação "  + new Date());
                parent.nextScene();
                parent.run();
            }, 10000);

        // Aqui a lógica do jogo, criação e 
        // comportamento dos objetos relativos aos personagens, 
        // dificuldade e tals
        } else if (this.gameScenes[this.currentScene].sceneName == "sceneGame") {
            
            
            //console.log(ObjectsOnStage);

        }
    }
};