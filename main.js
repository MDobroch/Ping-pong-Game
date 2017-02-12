window.onload = function() {

    //vars
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 400;
    var ballX = canvas.width / 2;
    var ballY = canvas.height / 2 - 5;
    var ballSpeedX = 15;
    var ballSpeedY = 5;
    var paddle1Size = 100;
    var paddle2Size = 100;
    var mousePosY = mousePosX = 0;
    var framesPerSecond = 30;
    var score1 = score2 = 0;
    var match;
    var paddle2pos = 150;
    var aiSpeed = 4;
    var ping = new Audio("ping.wav");
    var loose = new Audio("loose.wav");

    //EventListener
    canvas.addEventListener('mousemove', mousemove)

    //RenderGame
    setInterval(function() {
        renderGameField();
        renderGame();
    }, 1000 / framesPerSecond);


    function mousemove(e) {
        mousePosX = e.clientX;
        mousePosY = e.clientY;
    }

    function newGame(win) {
        if (win) {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2 - 5;
            ballSpeedX = -ballSpeedX;
        } else {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2 - 5;
            ballSpeedX = ballSpeedX;
        }
    }



    function renderGame() {
        drawingCircle(ballX, ballY, 11, "white");
        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY;


        if (ballX <= 0) {
            if (ballY <= (mousePosY + paddle1Size / 2) && ballY >= (mousePosY - paddle1Size / 2)) {
                ping.play();
                ballSpeedX = -ballSpeedX;
                ballSpeedY = (Math.floor(Math.random() * 10) + 1);
            } else {
                loose.play();
                newGame(true);
                score2++;
            }
        }

        if (ballX >= canvas.width) {
            if (ballY >= paddle2pos && ballY <= paddle2pos + paddle2Size) {
                ping.play();
                ballSpeedX = -ballSpeedX;
                ballSpeedY = (Math.floor(Math.random() * 10) + 1);
            } else {
                loose.play();
                newGame(true);
                score1++;
            }
        }



        if (ballY > canvas.height || ballY < 0) {
            ping.play();
            ballSpeedY = -ballSpeedY;
        }

        if (ballY > (paddle2pos) + paddle2Size / 2) {
            paddle2pos = paddle2pos + aiSpeed;
        } else if (ballY < (paddle2pos) + paddle2Size / 2) {
            paddle2pos = paddle2pos - aiSpeed;
        }


    }


    function renderGameField() {
        drawingRect(0, 0, canvas.width, canvas.height, 'black');
        drawingRect(5, mousePosY - (paddle1Size / 2), 2, paddle1Size, 'white');
        drawingRect((canvas.width - 10), paddle2pos + 5, 2, paddle2Size, 'white');



        ctx.font = "15px vardana";
        ctx.fillText(score1, (canvas.width / 4), 50);
        ctx.fillText(score2, (canvas.width - canvas.width / 4), 50);
        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    function drawingRect(posX, posY, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(posX, posY, width, height);
    }

    function drawingCircle(posX, posY, radius, color) {
        ctx.beginPath();
        ctx.arc(posX, posY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
    }


}