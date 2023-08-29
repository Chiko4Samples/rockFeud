var gOvr = false; // finish flg

//canvas init
const dCanvas = document.getElementById('dCanvas');
const ctx = dCanvas.getContext("2d");


/*
setInterval(function() {
    // prompt start
    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.key == 'y' || e.key == 'Y') {
            dCanvas.style.background = '#ccc';

            // game start
            init();
        }
    };
}, 10);*/
init();

// init object
function init() {
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
}