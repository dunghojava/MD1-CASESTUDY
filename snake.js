const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");

// create the unit

const box = 32;

// load images

let ground = new Image();
ground.src = "images/ground1.png";

let foodImg = new Image();
foodImg.src = "images/food.png";

// load audio files

let dead = new Audio("audio/dead.mp3");
let eat = new Audio("audio/eat.mp3");
let up = new Audio("audio/move.mp3");
let right = new Audio("audio/move.mp3");
let left = new Audio("audio/move.mp3");
let down = new Audio("audio/move.mp3");

// create the snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// create the food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score var

let score = 0;
document.getElementById('score').innerHTML = 'Score: ' + score;

//control the snake

let move;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && move != "RIGHT") {
        left.play();
        move = "LEFT";
    } else if (key == 38 && move != "DOWN") {
        move = "UP";
        up.play();
    } else if (key == 39 && move != "LEFT") {
        move = "RIGHT";
        right.play();
    } else if (key == 40 && move != "UP") {
        move = "DOWN";
        down.play();
    }
}

function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "#8c8c8c";
        } else {
            ctx.fillStyle = "#cccccc";
        }
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#4d4d4d";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (move == "LEFT") {
        snakeX -= box;
    }
    if (move == "UP") {
        snakeY -= box;
    }
    if (move == "RIGHT") {
        snakeX += box;
    }
    if (move == "DOWN") {
        snakeY += box;
    }

    // if the snake eats the food

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        console.log('check score  --------> ', score)
        document.getElementById('score').innerHTML = 'Score: ' + score;
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // check collision function
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    // game over

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        console.log('check snakeX ========> ', snakeX)
        console.log('check snakeY ========> ', snakeY)
        dead.play();
        GameOver();
    }

    snake.unshift(newHead);
}

function GameOver() {
    document.getElementById('gameover').style.display = 'block';
}

let game = setInterval(draw, 75);


















