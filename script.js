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

    let snakeDirection = ''



    for (let i = 0; i < 10; i++) {
        plansza[i] = [];
        for (let j = 0; j < 10; j++) {
            plansza[i][j] = 0; //wypelnianie planszy pustymi miejscami
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
            if (newSnakeY == -1) {
                snakeHitWall()
            }
        }
        else if (snakeDirection == 'down') {
            newSnakeY += 1
            if (newSnakeY == 10) {
                snakeHitWall()
            }
        }
        else if (snakeDirection == 'left') {
            newSnakeX -= 1
            if (newSnakeX == -1) {
                snakeHitWall()
            }
        }
        else if (snakeDirection == 'right') {
            newSnakeX += 1
            if (newSnakeX == 10) {
                snakeHitWall()
            }
        }

        //jesli jablko na nowej pozycji glowy węża
        if (plansza[newSnakeX][newSnakeY] == 1) {
            plansza[newSnakeX][newSnakeY] = 2
            let s = new Snake(newSnakeX, newSnakeY)
            queue.push(s)

            score += 1
            addRandomApple()
        }
        else {
            plansza[newSnakeX][newSnakeY] = 2
            let s = new Snake(newSnakeX, newSnakeY)
            queue.push(s)

            let ogon = queue.shift()
            plansza[ogon.x][ogon.y] = 0
        }
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
    function addRandomApple() {
        let x = Math.floor((Math.random() * 10) + 1);
        let y = Math.floor((Math.random() * 10) + 1);

        if (plansza[x][y] != 1 && plansza[x][y] != 2) {
            plansza[x][y] = 1
        }
        else {
            addRandomApple()
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

    let upKey = document.getElementById("up")
    upKey.addEventListener("click", up)

    let leftKey = document.getElementById("left")
    leftKey.addEventListener("click", left)

    let rightKey = document.getElementById("right")
    rightKey.addEventListener("click", right)

    let downKey = document.getElementById("down")
    downKey.addEventListener("click", down)

    function up() {
        if (snakeDirection != 'up' && snakeDirection != 'down') {
            snakeDirection = 'up'
            moveSnake()
        }
    }

    function left() {
        if (snakeDirection != 'left' && snakeDirection != 'right') {
            snakeDirection = 'left'
            moveSnake()
        }
    }

    function right() {
        if (snakeDirection != 'right' && snakeDirection != 'left') {
            snakeDirection = 'right'
            moveSnake()
        }
    }

    function down() {
        if (snakeDirection != 'down' && snakeDirection != 'up') {
            snakeDirection = 'down'
            moveSnake()
        }
    }

    function snakeHitWall() {
        alert(`Przegrałeś! Twój wynik to: ${score}`)
        reloadPage()
    }

    function reloadPage(){
        window.location.reload();
    }
}