var gmStart = false; // games start
var hasWnr = false; // games stop
var curPl = 1; // current player

// scores:: maybe not needed
var pl1Sr = 0;
var pl2Sr = 0;

// solider cnts
var maxSl = 13;
var pl1Sl, pl2Sl = maxSl;

// triggerKeys
var pl1Ky = 'a';
var pl2Ky = 'l';
var triggerKy  = pl1Ky; // default

// walls
var maxW = 80;
var w1 = [];
for (var i = 1; i <= maxW; i++) {
    w1[i] = {x:0, y:0, c: 0};
}
var w2 = w1;

// targetSignCoord
var tgX, tgY = 0;
var tgClr = '#FF10F0';
var tgXLmt, tgYLmt = 0;
var stpX, stpY = 0;

// indicatorBox 
var ibLoc = 0;


// temp
var triesCnt = 0;

//canvas init
const dCanvas = document.getElementById('dCanvas');
const ctx = dCanvas.getContext("2d");
            
// key events
document.addEventListener("keyup", somethingUp, false);
document.addEventListener("keydown", somethingUp, false);

function somethingUp(e) {
    var dkey = e.key.toLowerCase();
    // start game
    if (gmStart == false && dkey == 'y') {
        dCanvas.style.background = '#ccc';
        gmStart = true;
        setInterval(playOn, 10);
        attack();
    }

    // fireKeys
    if (gmStart == true && hasWnr == false && dkey == triggerKy.toLowerCase()) {
        attack();
    }

    // directionKeys
    if (gmStart == true && hasWnr == false && (dkey == 'arrowup' || dkey == 'arrowdown'
    || dkey == 'arrowleft' || dkey == 'arrowright')) {
        // move arrow
        calculateTarget(dkey);
    }
}

setInterval(playOn, 10);

// init object
function playOn() {
    // parapara mangga effect
    ctx.clearRect(0, 0, dCanvas.width, dCanvas.height);

    // draw current box
    /*ctx.beginPath();
    ibLoc = (curPl == 1) ? 2: 249;
    ctx.rect(ibLoc, 1, 50, 30);
    ctx.stroke();
    ctx.closePath();*/
    
    // draw wall
    /*ctx.beginPath();
    ctx.rect(145, 100, 10, 75);
    ctx.fillStyle = '#a5700d';
    ctx.fill();
    ctx.closePath();*/

    // draw counter left
    // draw counter right

    // draw house left & right
    drawHouses(w1, w2);

    // draw weapon left
    ctx.beginPath();
    ctx.rect(65, 128, 10, 20);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();
    
    // draw weapon right
    ctx.beginPath();
    ctx.rect(225, 128, 10, 20);
    ctx.fillStyle = '#0000FF';
    ctx.fill();
    ctx.closePath();    
    
    // sling and stone over here
    //drawSling();
    //drawStone();
    

    /*// draw target range
    ctx.beginPath();
    ctx.arc(75, 138, 10, 1.5*Math.PI, 0.5*Math.PI, false);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(225, 138, 10, 1.5*Math.PI, 0.5*Math.PI, true);
    ctx.fillStyle = '#0000FF';
    ctx.fill();
    ctx.closePath();*/

    // target +
    ctx.beginPath();
    ctx.font = "24px arial";
    ctx.fillStyle = tgClr;
    ctx.fill();
    ctx.fillText("+", tgX, tgY);
    ctx.closePath();

    // dotted line
    ctx.beginPath();
    ctx.moveTo(stpX, 138);
    if (curPl == 1) {
        ctx.lineTo(tgX+9, tgY-5);
    } else {
        ctx.lineTo(tgX+5, tgY-5);
    }
    ctx.stroke();
    ctx.closePath();
}


function attack() {
    // release rock
    //release(curPl);

    // temp scoring
    triesCnt++;
    if (triesCnt == 10) {
        hasWnr = true;
    }
    if (curPl == 1) {
        tgX = 90;
        tgY = 145;
        tgClr = '#FF10F0';
        curPl = 2;
        stpX = 75;
        triggerKy = pl1Ky;
    } else {
        tgX = 190;
        tgY = 145;
        tgClr = '#1F51FF';
        curPl = 1;
        stpX = 225;
        triggerKy = pl2Ky;
    }
    tgXLmt = tgX;
    tgYLmt = tgY;
}

function drawHouses(w1, w2) {
    // left
    var lx = 2;
    var ly = 70;
    var wp = 8;
    var wpl = 8;
    for (var i = 1; i <= maxW; i++) {
        // check hit
        var curB = w1[i];
        if (curB.c == 0) {
            ctx.beginPath();
            ctx.rect(lx, ly, 6, 6);
            ctx.fillStyle = '#FF0000';
            ctx.fill();
            ctx.closePath();
        }
        if (i % wpl == 0) {
            ly = ly + wp;
            lx = lx - (wpl * wp);
        }
        lx = lx + wp;
    }

    // right
    lx = 236;
    ly = 70;
    for (var i = 1; i <= maxW; i++) {
        // check hit
        var curB = w2[i];
        if (curB.c == 0) {
            ctx.beginPath();
            ctx.rect(lx, ly, 6, 6);
            ctx.fillStyle = '#0000FF';
            ctx.fill();
            ctx.closePath();
        }
        if (i % wpl == 0) {
            ly = ly + wp;
            lx = lx - (wpl * wp);
        }
        lx = lx + wp;
    }
}


function calculateTarget(dkey) {
    var minX = tgXLmt - 10;
    var maxX = tgXLmt + 10;
    var minY = tgYLmt - 10;
    var maxY = tgYLmt + 10;

    if (dkey == 'arrowup' && tgY  > minY) {
        tgY = tgY - 1;
    } else if (dkey == 'arrowdown' && tgY < maxY) {
        tgY = tgY + 1;
    } else if (dkey == 'arrowleft' && tgX > minX) {
        tgX = tgX - 1;
    } else if (dkey == 'arrowright' && tgX < maxX) {
        tgX = tgX + 1;
    }
}


function release(pl) {
    // get tip of arrow(which arrow was used and which side to attach is based on pl)
    // calculate trajectory from tip of arrow
    // calculate number of deminished soldiers from opponent side through rocks coordinates
}