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
    // start game
    if (gmStart == false && e.key == 'y' || e.key == 'Y') {
        dCanvas.style.background = '#ccc';
        gmStart = true;
        setInterval(playOn, 10);
    }

    // attackKeys
    var triggerKy = (curPl == 1) ? pl1Ky : pl2Ky;
    if (gmStart == true && hasWnr == false && e.key == triggerKy.toLowerCase()) {
        console.log([e, e.key]);
        attack(curPl);
    }
}

setInterval(playOn, 10);

// init object
function playOn() {
    // parapara mangga effect
    ctx.clearRect(0, 0, dCanvas.width, dCanvas.height);

    // draw current box
    ctx.beginPath();
    ibLoc = (curPl == 1) ? 2: 249;
    ctx.rect(ibLoc, 1, 50, 30);
    ctx.stroke();
    ctx.closePath();
    
    // draw wall
    ctx.beginPath();
    ctx.rect(145, 100, 10, 75);
    ctx.fillStyle = '#a5700d';
    ctx.fill();
    ctx.closePath();

    // draw counter left
    // draw counter right

    // draw house left
    ctx.beginPath();
    ctx.rect(0, 60, 50, 90);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();

    // draw house right
    ctx.beginPath();
    ctx.rect(250, 60, 50, 90);
    ctx.fillStyle = '#0000FF';
    ctx.fill();
    ctx.closePath();

    // draw weapon left
    ctx.beginPath();
    ctx.rect(70, 130, 20, 20);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();
    
    // draw weapon right
    ctx.beginPath();
    ctx.rect(210, 130, 20, 20);
    ctx.fillStyle = '#0000FF';
    ctx.fill();
    ctx.closePath();      
    
    // sling and stone over here
    //drawSling();
    //drawStone();
}


function attack(pl) {
    // release rock
    release(curPl);

    // temp scoring
    triesCnt++;
    curPl = (curPl == 1) ? 2: 1;
    if (triesCnt == 10) {
        hasWnr = true;
    }
}


function release(pl) {
    // get tip of arrow(which arrow was used and which side to attach is based on pl)
    // calculate trajectory from tip of arrow
    // calculate number of deminished soldiers from opponent side through rocks coordinates
}