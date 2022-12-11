let zoom = (amount) => {
    pixelCompute((square) => {
        square.size += amount;
    });
}

let draw = () => {
    clearScreen("#DDDDDD")
    pixelPredict((i1, i2, c, square) => square.x * square.size + zX > -square.size &&
                                                 square.x * square.size + zX < canvas.width &&
                                                 square.y * square.size + zY > -square.size &&
                                                 square.y * square.size + zY < canvas.height,(square) => {
            ctx.fillStyle = square.color;
            ctx.strokeStyle = "#000000";
            ctx.fillRect(zX + square.x * square.size, zY + square.y * square.size, square.size, square.size);
            ctx.strokeRect(zX + square.x * square.size, zY + square.y * square.size, square.size, square.size);


    });
}

let processClick = (mX, mY, button) => {
    pixelCompute((square) => {
        if(square.x * square.size < mX && square.x * square.size + square.size > mX &&
            square.y * square.size < mY && square.y * square.size + square.size > mY) {
            if(button === 0) {
                square.color = document.getElementById("colorPick").value;
            } else if(button === 2) {
                document.getElementById("colorPick").value = square.color;
            }
        }
    });
}

let clearScreen = (color) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}