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

    var appleCount = 3
    var currentAppleCount = 0

    let plansza = []
    let queue = []

    var snakeDirection = ''


    for (let i = 0; i < 10; i++) {
        plansza[i] = [];
        for (let j = 0; j < 10; j++) {
            plansza[i][j] = 0; //wypelnianie planszy pustymie miejscami
        }
    }

    class Snake {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    function startingSnake() {
        var s1 = new Snake(6, 2)
        var s2 = new Snake(6, 3)
        var s3 = new Snake(6, 4)

        plansza[6][2] = 2
        plansza[6][3] = 2
        plansza[6][4] = 2

        queue.push(s1)
        queue.push(s2)
        queue.push(s3)

        snakeDirection = 'bottom'
        fillMap()
    }

    startingSnake()

    function moveSnake() {
        let positionOfHead = queue.length - 1

        var newSnakeX = queue[positionOfHead].x
        var newSnakeY = queue[positionOfHead].y

        console.log(snakeDirection)

        if (snakeDirection == 'top') {
            newSnakeY -= 1
            if (newSnakeY == 0) {
                newSnakeY = 9
            }
        }
        else if (snakeDirection == 'bottom') {
            newSnakeY += 1
            if (newSnakeY == 10) {
                newSnakeY = 0
            }
        }
        else if (snakeDirection == 'left') {
            newSnakeX -= 1
            if (newSnakeX == 0) {
                newSnakeX = 9
            }
        }
        else if (snakeDirection == 'right') {
            newSnakeX += 1
            if (newSnakeX == 10) {
                newSnakeX = 0
            }
        }

        plansza[newSnakeX][newSnakeY] = 2
        let s = new Snake(newSnakeX, newSnakeY)
        queue.push(s)

        let ogon = queue.shift()
        plansza[ogon.x][ogon.y] = 0

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
    // 2 -> snake

    //dodawanie jablek
    while (currentAppleCount < appleCount) {
        restoreApples()
    }

    function restoreApples() {
        let x = Math.floor((Math.random() * 10) + 1);
        let y = Math.floor((Math.random() * 10) + 1);
        if (plansza[x][y] != 2) {
            plansza[x][y] = 1
            currentAppleCount += 1
        }
        else {
            currentAppleCount += 0
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
                else if (plansza[i][j] == 2) {
                    ctx.fillStyle = "green";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                }
            }
        }
    }
    fillMap()



}
