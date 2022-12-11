const canvas = document.getElementById('_canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let wHalf = canvas.width / 2;
let hHalf = canvas.height / 2;

let zX = wHalf;
let zY = hHalf;

let size = 100;
let amt = 500;

let xOff = 0;
let yOff = 0;

class square {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.ox = this.x;
        this.oy = this.y;
        this.size = size;
        this.color = color;
    }
}

let grid = [];
for (let i = 0; i < amt; i++) {
    grid[i] = [];
    for (let j = 0; j < amt; j++) {
        grid[i][j] = new square(i - wHalf / size - (size/2*amt-zX)/size, j - hHalf / size - (size/2*amt-zY)/size, size, '#FFFFFF');
    }
}

let pixelCompute = (consumer) => {
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            consumer(grid[i][j]);
        }
    }
}

let pixelPredict = (predicate, consumer) => {
    let count = 0;
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if(predicate(i, j, count++, grid[i][j])) {
                consumer(grid[i][j]);
            }
        }
    }
}

let loop = () => {
    requestAnimationFrame(loop);
    draw();
}

document.addEventListener("wheel", (e) => {
    zoom(e.deltaY/-138);
})

let mousePosLast = [0, 0];
let mouseDown = false;
let mousePosBefore = [0, 0];
let mouseMoved = false;

canvas.addEventListener("mousemove", (e) => {
    mouseMoved = true;
    if (mouseDown) {
        xOff = mousePosBefore[0] + (e.clientX - mousePosLast[0]);
        yOff = mousePosBefore[1] + (e.clientY - mousePosLast[1]);
        pixelCompute((square) => {
            square.x = square.ox + xOff / size;
            square.y = square.oy + yOff / size;
        });
    } else {
        mousePosLast[0] = e.clientX;
        mousePosLast[1] = e.clientY;
    }
});

canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    mouseMoved = false;
});

canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
    mousePosBefore[0] = xOff;
    mousePosBefore[1] = yOff;
    if(!mouseMoved) processClick(e.clientX - wHalf, e.clientY - hHalf, e.button);
    mouseMoved = false;
});

document.addEventListener('contextmenu', event => event.preventDefault());

// -----

loop();