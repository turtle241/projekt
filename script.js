document.addEventListener("DOMContentLoaded", function () {
    let highscore = Number(localStorage.getItem("highscore"))

    let highScoreLabel = document.getElementById("highscore")
    highScoreLabel.innerHTML = `Highscore: ${highscore}`
});

document.getElementById("start").addEventListener("click", gameStart);

let gameRuning = false

function gameStart() {
    if (gameRuning) {
        return
    }
    gameRuning = true
    // console.log('weszlo')
    const canvas = document.getElementById("myCanvas");

    const ctx = canvas.getContext("2d");
    const tileSize = 10

    let score = 0
    let scores = []

    let plansza = []
    let queue = []

    let previousDir = ''
    let snakeDirection = ''
    var direction = 0
    let changedDirections = false

    localStorage.getItem("highscore");
    let highscore = Number(localStorage.getItem("highscore"))

    for (let i = 0; i < 10; i++) {
        plansza[i] = [];
        for (let j = 0; j < 10; j++) {
            plansza[i][j] = 0; //wypelnianie planszy pustymi miejscami
        }
    }

    class Snake {
        // constructor(x, y) {
        //     this.x = x;
        //     this.y = y;
        //     this.direction = 2
        // }

        constructor(x, y, direction) {
            this.x = x;
            this.y = y;
            this.direction = direction;
        }
    }

    function startingSnake() {
        var s1 = new Snake(6, 2, 3)
        var s2 = new Snake(6, 3, 3)
        var s3 = new Snake(6, 4, 3)

        plansza[6][2] = 3
        plansza[6][3] = 3
        plansza[6][4] = 3

        queue.push(s1)
        queue.push(s2)
        queue.push(s3)

        snakeDirection = 'down'

        addRandomApple()
        addRandomApple()
        addRandomApple()

        fillMap()

    }

    startingSnake()

    function moveSnake() {
        let positionOfHead = queue.length - 1

        var newSnakeX = queue[positionOfHead].x
        var newSnakeY = queue[positionOfHead].y

        console.log(snakeDirection)

        // wersja z przenikaniem przez sciany
        // if (snakeDirection == 'up') {
        //     newSnakeY -= 1
        //     if (newSnakeY == -1) {
        //         newSnakeY = 9
        //     }
        // }
        // else if (snakeDirection == 'down') {
        //     newSnakeY += 1
        //     if (newSnakeY == 10) {
        //         newSnakeY = 0
        //     }
        // }
        // else if (snakeDirection == 'left') {
        //     newSnakeX -= 1
        //     if (newSnakeX == -1) {
        //         newSnakeX = 9
        //     }
        // }
        // else if (snakeDirection == 'right') {
        //     newSnakeX += 1
        //     if (newSnakeX == 10) {
        //         newSnakeX = 0
        //     }
        // }


        // wersja z przegrywaniem po walnięciu w sciane
        if (snakeDirection == 'up') {
            newSnakeY -= 1
            direction = 3
            if (newSnakeY == -1) {
                gameOver()
            }
        }
        else if (snakeDirection == 'down') {
            newSnakeY += 1
            direction = 3
            if (newSnakeY == 10) {
                gameOver()
            }
        }
        else if (snakeDirection == 'left') {
            newSnakeX -= 1
            direction = 2
            if (newSnakeX == -1) {
                gameOver()
            }
        }
        else if (snakeDirection == 'right') {
            newSnakeX += 1
            direction = 2
            if (newSnakeX == 10) {
                gameOver()
            }
        }

        if (changedDirections) {
            let x = queue[queue.length - 1].x
            let y = queue[queue.length - 1].y
            if ((previousDir == "left" && snakeDirection == "up") || (previousDir == "up" && snakeDirection == "left")) {
                queue[queue.length - 1].direction = 4
                plansza[x][y] = 4
            }
            if ((previousDir == "right" && snakeDirection == "up") || (previousDir == "up" && snakeDirection == "right")) {
                queue[queue.length - 1].direction = 5
                plansza[x][y] = 5
            }
            if ((previousDir == "left" && snakeDirection == "down") || (previousDir == "down" && snakeDirection == "left")) {
                queue[queue.length - 1].direction = 6
                plansza[x][y] = 6
            }
            if ((previousDir == "right" && snakeDirection == "down") || (previousDir == "down" && snakeDirection == "right")) {
                queue[queue.length - 2].direction = 7
                plansza[x][y] = 7
            }
        }

        console.log(direction)

        //jesli jablko na nowej pozycji glowy węża
        if (plansza[newSnakeX][newSnakeY] == 1) {
            plansza[newSnakeX][newSnakeY] = direction
            let s = new Snake(newSnakeX, newSnakeY, direction)
            queue.push(s)

            score += 1
            updateScore()
            addRandomApple()
        }
        //jesli snake wjedzie w siebie
        else if (plansza[newSnakeX][newSnakeY] != 0 && plansza[newSnakeX][newSnakeY] != 1) {
            gameOver()
        }
        else {
            plansza[newSnakeX][newSnakeY] = direction
            let s = new Snake(newSnakeX, newSnakeY, direction)
            queue.push(s)

            let ogon = queue.shift()
            plansza[ogon.x][ogon.y] = 0
        }
        console.log(plansza[newSnakeX][newSnakeY])

        changedDirections = false
        fillMap()

    }

    window.setInterval(moveSnake, 400)


    //test apple
    // plansza[3][4] = 1
    // plansza[0][0] = 1
    // plansza[6][2] = 1

    // Legenda:
    // 0 -> puste pole
    // 1 -> apple

    //2 -> snake horizontal
    //3 -> snake vetrical
    //4 -> snake (left - up)
    //5 -> snake (right - up)
    //6 -> snake (left - down)
    //7 -> snake (right - down)

    //dodawanie jablek
    function addRandomApple() {
        let x = Math.floor((Math.random() * 10));
        let y = Math.floor((Math.random() * 10));

        if (plansza[x][y] == 0) {
            plansza[x][y] = 1
        }
        else {
            addRandomApple()
        }
    }

    function drawTile(x, i, j) {
        switch (x) {
            case 2:
                ctx.fillRect(i * tileSize, j * tileSize + 1, tileSize, tileSize - 2);
                break
            case 3:
                ctx.fillRect(i * tileSize + 1, j * tileSize, tileSize - 2, tileSize);
                break
            case 4:
                ctx.fillRect(i * tileSize + 1, j * tileSize + 1, tileSize - 2, tileSize - 2);
                break
            case 5:
                ctx.fillRect(i * tileSize + 1, j * tileSize + 1, tileSize - 2, tileSize - 2);
                break
            case 6:
                ctx.fillRect(i * tileSize + 1, j * tileSize + 1, tileSize - 2, tileSize - 2);
                break
            case 7:
                ctx.fillRect(i * tileSize + 1, j * tileSize + 1, tileSize - 2, tileSize - 2);
                break


        }
    }

    function fillMap() {
        //wypelnianie miejsc kolorami zaleznie od wartosci
        for (let i = 0; i < 10; i += 1) {
            for (let j = 0; j < 10; j += 1) {
                if (plansza[i][j] == 0) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                }
                else if (plansza[i][j] == 1) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                }
                else {
                    ctx.fillStyle = "white";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                    ctx.fillStyle = "green";
                    // ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                    drawTile(plansza[i][j], i, j)
                }
            }
        }
    }
    fillMap()

    let upKey = document.getElementById("up")
    upKey.addEventListener("click", up)

    let leftKey = document.getElementById("left")
    leftKey.addEventListener("click", left)

    let rightKey = document.getElementById("right")
    rightKey.addEventListener("click", right)

    let downKey = document.getElementById("down")
    downKey.addEventListener("click", down)

    function up() {
        previousDir = snakeDirection

        if (snakeDirection != 'up' && snakeDirection != 'down') {
            snakeDirection = 'up'
        }

        if (previousDir != snakeDirection) {
            changedDirections = true
        }
    }

    function left() {
        previousDir = snakeDirection

        if (snakeDirection != 'left' && snakeDirection != 'right') {
            snakeDirection = 'left'
        }

        if (previousDir != snakeDirection) {
            changedDirections = true
        }
    }

    function right() {
        previousDir = snakeDirection

        if (snakeDirection != 'right' && snakeDirection != 'left') {
            snakeDirection = 'right'
        }

        if (previousDir != snakeDirection) {
            changedDirections = true
        }
    }

    function down() {
        previousDir = snakeDirection

        if (snakeDirection != 'down' && snakeDirection != 'up') {
            snakeDirection = 'down'
        }

        if (previousDir != snakeDirection) {
            changedDirections = true
        }
    }

    function gameOver() {
        if (score > highscore) {
            localStorage.setItem("highscore", score)
            updateHighScore(score)
        }

        scores.push(score)

        alert(`Game over! Score: ${score}`)
        reloadPage()
    }

    function reloadPage() {
        window.location.reload();
    }

    addEventListener('keydown', (event) => {
        switch (event.key) {
            case "ArrowLeft":
                left()
                event.preventDefault()
                break
            case "ArrowRight":
                right()
                event.preventDefault()
                break
            case "ArrowUp":
                up()
                event.preventDefault()
                break
            case "ArrowDown":
                down()
                event.preventDefault()
                break
        }
    })

    function updateScore() {
        let wynikLabel = document.getElementById("score")
        wynikLabel.innerHTML = `Score: ${score}`
    }

    function updateHighScore(newHighscore) {
        let highScoreLabel = document.getElementById("highscore")
        highScoreLabel.innerHTML = `Highscore: ${newHighscore}`
    }

    updateHighScore(highscore)

    document.addEventListener("DOMContentLoaded", function () {
        updateHighScore(highscore)
    });
}