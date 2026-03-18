document.getElementById("start").addEventListener("click", gameStart);

function gameStart() {
    // console.log('weszlo')
    const canvas = document.getElementById("myCanvas");

    const ctx = canvas.getContext("2d");
    const tileSize = 10
    var appleCount = 3
    var currentAppleCount = 0

    var plansza = []

    for (let i = 0; i < 10; i++) {
        plansza[i] = [];
        for (let j = 0; j < 10; j++) {
            plansza[i][j] = 0; //wypelnianie planszy pustymie miejscami
        }
    }

    //test apple
    // plansza[3][4] = 1
    // plansza[5][7] = 1

    //test snake
    plansza[6][2] = 2
    plansza[6][3] = 2
    plansza[6][4] = 2

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
