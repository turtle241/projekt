let topOne = Number(localStorage.getItem("one")) || 0
let topTwo = Number(localStorage.getItem("two")) || 0
let topThree = Number(localStorage.getItem("three")) || 0
let topFour = Number(localStorage.getItem("four")) || 0
let topFive = Number(localStorage.getItem("five")) || 0

let oneLabel = document.getElementById("one")
let twoLabel = document.getElementById("two")
let threeLabel = document.getElementById("three")
let fourLabel = document.getElementById("four")
let fiveLabel = document.getElementById("five")

function reloadHighscores() {
    oneLabel.innerHTML = `${topOne}`
    twoLabel.innerHTML = `${topTwo}`
    threeLabel.innerHTML = `${topThree}`
    fourLabel.innerHTML = `${topFour}`
    fiveLabel.innerHTML = `${topFive}`
}

document.addEventListener("DOMContentLoaded", function () {
    // let highscore = Number(localStorage.getItem("highscore"))

    // let highScoreLabel = document.getElementById("highscore")
    // highScoreLabel.innerHTML = `Highscore: ${highscore}`

    reloadHighscores()

    localStorage.setItem("name", "Anonime")
});

document.getElementById("changeName").addEventListener("click", changeName);

function changeName() {
    let person = prompt("Please enter your name:", "");
    if (person == null || person == "") {
        return
    } else {
        playerNick = person
        localStorage.setItem("name", playerNick)

        let currentPlayerName = document.getElementById("currPlayer")
        currentPlayerName.innerHTML = `Playing as: ${playerNick}`
    }
}


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

    let plansza = []
    let queue = []

    let previousDir = ''
    let snakeDirection = ''
    var direction = 0
    let changedDirections = false

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
            let x = queue[queue.length - 1].x;
            let y = queue[queue.length - 1].y;

            // 4 -> lewo-góra 
            if ((previousDir == "right" && snakeDirection == "up") || (previousDir == "down" && snakeDirection == "left")) {
                queue[queue.length - 1].direction = 4;
                plansza[x][y] = 4;
            }
            // 5 -> prawo-góra 
            else if ((previousDir == "left" && snakeDirection == "up") || (previousDir == "down" && snakeDirection == "right")) {
                queue[queue.length - 1].direction = 5;
                plansza[x][y] = 5;
            }
            // 6 -> lewo-dół 
            else if ((previousDir == "right" && snakeDirection == "down") || (previousDir == "up" && snakeDirection == "left")) {
                queue[queue.length - 1].direction = 6;
                plansza[x][y] = 6;
            }
            // 7 -> prawo-dół 
            else if ((previousDir == "left" && snakeDirection == "down") || (previousDir == "up" && snakeDirection == "right")) {
                queue[queue.length - 1].direction = 7;
                plansza[x][y] = 7;
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

    let gameInterval = window.setInterval(moveSnake, 400)
    let isGameOver = false

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
        let half = tileSize / 2;

        switch (x) {
            case 2: // wąż poziomo
                ctx.fillRect(i * tileSize, j * tileSize + 1, tileSize, tileSize - 2);
                break;
            case 3: // wąż pionowo
                ctx.fillRect(i * tileSize + 1, j * tileSize, tileSize - 2, tileSize);
                break;
            case 4: // lewo - góra
                ctx.fillRect(i * tileSize, j * tileSize + 1, half + 1, tileSize - 2); // ramię w lewo
                ctx.fillRect(i * tileSize + 1, j * tileSize, tileSize - 2, half + 1); // ramię w górę
                break;
            case 5: // prawo - góra
                ctx.fillRect(i * tileSize + half - 1, j * tileSize + 1, half + 1, tileSize - 2); // ramię w prawo
                ctx.fillRect(i * tileSize + 1, j * tileSize, tileSize - 2, half + 1); // ramię w górę
                break;
            case 6: // lewo - dół
                ctx.fillRect(i * tileSize, j * tileSize + 1, half + 1, tileSize - 2); // ramię w lewo
                ctx.fillRect(i * tileSize + 1, j * tileSize + half - 1, tileSize - 2, half + 1); // ramię w dół
                break;
            case 7: // prawo - dół
                ctx.fillRect(i * tileSize + half - 1, j * tileSize + 1, half + 1, tileSize - 2); // ramię w prawo
                ctx.fillRect(i * tileSize + 1, j * tileSize + half - 1, tileSize - 2, half + 1); // ramię w dół
                break;
        }
    }

    function drawApple(i, j) {
        const x = i * tileSize;
        const y = j * tileSize;
        const center = tileSize / 2;

        ctx.fillStyle = "#5d3a1a";
        ctx.fillRect(x + center - 1, y + 1, 2, 3);

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x + center, y + center + 1, tileSize / 2 - 1, 0, Math.PI * 2);
        ctx.fill();
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
                    ctx.fillStyle = "white";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);

                    drawApple(i, j)
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
        if (isGameOver) return
        isGameOver = true

        // if (score > highscore) {
        //     localStorage.setItem("highscore", score)
        //     updateHighScore(score)
        // }

        clearInterval(gameInterval)

        updateHighScores()

        alert(`Game over "${localStorage.getItem("name")}"! Your score: ${score}`)
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

    function updateHighScoresInLocalStorage() {
        localStorage.setItem("one", topOne)
        localStorage.setItem("two", topTwo)
        localStorage.setItem("three", topThree)
        localStorage.setItem("four", topFour)
        localStorage.setItem("five", topFive)
    }

    function updateHighScores() {
        // let highScoreLabel = document.getElementById("highscore")
        // highScoreLabel.innerHTML = `Highscore: ${newHighscore}`
        if (score > topOne) {
            topFive = topFour
            topFour = topThree
            topThree = topTwo
            topTwo = topOne
            topOne = score
        } else if (score > topTwo) {
            topFive = topFour
            topFour = topThree
            topThree = topTwo
            topTwo = score
        } else if (score > topThree) {
            topFive = topFour
            topFour = topThree
            topThree = score
        } else if (score > topFour) {
            topFive = topFour
            topFour = score
        } else if (score > topFive) {
            topFive = score
        }
        reloadHighscores()
        updateHighScoresInLocalStorage()
    }
    // document.addEventListener("DOMContentLoaded", function () {
    //       updateHighScore(highscore)
    // });
}


// localStorage.setItem("scores", "")