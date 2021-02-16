const box = document.querySelector(".container");
const speed = 5;
let time;
let lastTime = 0;
box.innerHTML = " ";
let cancel;
let snake = false;
setInterval(function () {
    time = new Date().getTime();
})
let direction = { x: 0, y: 0 }
window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y !== 0) break
            direction = { x: 0, y: -1 }
            break
        case "ArrowDown":
            if (direction.y !== 0) break
            direction = { x: 0, y: 1 }
            break
        case "ArrowLeft":
            if (direction.x !== 0) break
            direction = { x: -1, y: 0 }
            break
        case "ArrowRight":
            if (direction.x !== 0) break
            direction = { x: 1, y: 0 }
            break
    }
});
const snakeBody = [{ x: 10, y: 11 }]
let food = { x: 10, y: 1 }
let expand = 0;
function move() {
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    snakeBody[0].x += direction.x;
    snakeBody[0].y += direction.y;
};
function draw() {
    snakeBody.forEach(current => {
        const element = document.createElement("div")
        element.style.gridRowStart = current.y
        element.style.gridColumnStart = current.x
        element.classList.add('snake')
        box.appendChild(element)
    });
    const foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    box.appendChild(foodElement)


};

function update() {

    if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
        food = { x: Math.floor((Math.random() * 21) + 1), y: Math.floor((Math.random() * 21) + 1) }
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })


    }
};
function OutOfGrid() {
    if (snakeBody[0].x > 21 || snakeBody[0].x < 1 || snakeBody[0].y > 21 || snakeBody[0].y < 1) {
        cancelAnimationFrame(cancel)
        if (confirm("You loose! Click Ok to play again")) {
            window.location.reload()
        }

    }

};

function intersction(pos) {
    return snakeBody.some(function (current, index) {
        if (index === 0 || index === 1) return false
        return current.x === pos.x && current.y === pos.y
    })

};
function currentTime() {
    cancel = requestAnimationFrame(currentTime)
    const lastSecond = (time - lastTime) / 1000
    if (lastSecond < 1 / speed) return;
    lastTime = time
    move()
    box.innerHTML = ''
    draw()
    update()
    OutOfGrid()
    if (intersction(snakeBody[0])) {
        cancelAnimationFrame(cancel)
        if (confirm("You loose! Click Ok to play again")) {
            window.location.reload()
        }
    }


};

window.requestAnimationFrame(currentTime)

