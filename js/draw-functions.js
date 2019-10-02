/**
 * Draw Functions
 */



/**
 * @description Clear screen from stage with color previouly defined
 */
var clearScreen = function (cv, ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, cv.width, cv.height);
};


/**
 * @description Draw Ellipse on canvas
 */
var drawEllipse = function (ctx, x, y, w, h) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    //ctx.closePath(); // not used correctly, see comments (use to close off open path)
    //ctx.stroke();
    ctx.fill();
};

/**
 * @description Draw Ellipse Centralized
 */
var drawEllipseByCenter = function (ctx, cx, cy, w, h) {
    drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
};

/**
 * @description Draw Score
 */
var drawHeader = function (ctx, config, Player1, Player2, HiScore) {
    var player1 = Player1;
    var score = new String(Player1.score);

    ctx.fillStyle = config.primaryColor;
    ctx.font = config.fontProperties;

    ctx.fillText("SCORE<1>", 20, 30);
    ctx.fillText(score.padStart(4, "0"), 40, 60);

    ctx.fillText("HI-SCORE", 310, 30);
    ctx.fillText(HiScore, 340, 60);

    ctx.fillText("SCORE<2>", 600, 30);
    ctx.fillText(score.padStart(4, "0"), 625, 60);
    //ctx.fillText(Player2.score, 40, 60);
};

/**
 * @description Used only on first scene
 */
var drawTextMenu = function(ctx, config) {
    ctx.fillStyle = config.primaryColor;
    ctx.font = config.fontProperties;
    ctx.fillText("Press   Enter   KEY", 250, 300);
    ctx.fillText("<1 OR 2 PLAYERS>", 270, 350);
}

/**
 * @description Draw footer
 */
var drawFooter = function (ctx, config) {
    ctx.fillStyle = config.primaryColor;
    ctx.font = config.fontProperties;
    ctx.fillText("CREDIT 00", 550, 670);
};

/**
 * @description Special animation on Instruction Scene
 */
var typeWriter = function (ctx, config, text, x, y, callback) {    
    var total = text.length;
    var counter = 0;
    var spaceLetter = 14;

    var clear = function(id) {
        clearInterval(id);
        if (callback != null) {
            callback();
        }
    };
    
    ctx.fillStyle = config.primaryColor;
    ctx.fillText(text[0], x + counter * spaceLetter, y);

    var id = setInterval(function(){
        ctx.fillStyle = config.primaryColor;
        ctx.fillText(text[counter], x + counter * spaceLetter, y);
        if (counter >= total -1) {
            clear(id);
            console.log("String digitada, animação finalizada! " + new Date());
        }
        counter++;
    }, 60);
};

/**
 * @description Special animation on Instruction Scene
 */
var turnThePage = function (ctx, config, direction, callback) {
    var count = 0,
        intDirection = 1,
        initX = 0,
        velocity = 6;

    if (direction == "left") {
        intDirection *= -1
        initX = cv.width;
    }

    var clear = function(id) {
        clearInterval(id);
        if (callback != null) {
            callback();
        }
    };

    var id = setInterval(function() {
        ctx.fillStyle = config.backgroundColor;
        ctx.fillRect(40, 180, 40 + 5 * intDirection + count, 350);
        if (direction == "left" && count <= 0) {
            clear(id);
        }
        if (direction == "right" && count > cv.width - 60) {
            clear(id);
            console.log("Página virada " + new Date());
        }
        count += velocity;
    }, 50);
};



if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}