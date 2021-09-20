const startButton = document.getElementById("start")
const timeList = document.getElementById("time-list")
const gameTime = document.getElementById("time")
const board = document.getElementById("board")
const screens = document.querySelectorAll(".screen")

const background = [
    "linear-gradient(90deg, #1624e3 0%, #40ec30 47%, #4cf746 100%)",
    "linear-gradient(90deg, #c8db70 0%, #80977f 47%, #c9cc09 100%)",
    "linear-gradient(90deg, #fc6363 0%, #b82a2a 47%, #ee0606 100%)",
    "linear-gradient(90deg, #fbff00 0%, #da7676 47%, #bdaad6 100%)",
    "linear-gradient(90deg, #8d8d77 0%, #8edda8 47%, #4cb338 100%)",
    "linear-gradient(90deg, #9904fd 0%, #7e6299 47%, #8ac07f 100%)",
    "linear-gradient(90deg, #ffffff 0%, #645572 47%, #152013 100%)",
]

const COLORS = [
    "#ed8787",
    "#9c3030",
    "#6d309c",
    "#20ba53",
    "#ede60e",
    "#fff700",
    "#b3257a",
    "#f20707",
    "#493dd1",
    "#c9a41c",
    "#d373ff",
]

let time = 0
let score = 0

startButton?.addEventListener("click", (event) => {
    event.preventDefault()
    scrollScreen(0)
})

timeList?.addEventListener("click", (event) => {
    if (event.target?.classList.contains("time-btn")) {
        time = parseInt(event.target?.getAttribute("data-time"))
        startGame()
    }
})

board?.addEventListener("click", (event) => {
    if (event.target?.classList.contains("circle")) {
        score++
        event.target?.remove()
        createRandomCircle()
    }
})

const startGame = () => {
    scrollScreen(1)
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setGameTime(time)
}

const finishGame = () => {
    gameTime?.parentNode?.classList.add("hide")
    board.innerHTML = `<h1>Cчет <span class="primary">${score}</span></h1>`
}

const scrollScreen = (screenNumber) => {
    screens[screenNumber].classList.add("up")
}

const setGameTime = (value) => {
    gameTime.innerHTML = `00:${value}`
}

const decreaseTime = () => {
    if (time === 0) {
        finishGame()
    } else {
        let currentTime = --time
        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }
        setGameTime(currentTime)
    }
}

const createRandomCircle = () => {
    const circle = document.createElement("div")
    const circleSize = getRandomNumber(20, 60)
    const { width, height } = board?.getBoundingClientRect()
    const x = getRandomNumber(0, width - circleSize)
    const y = getRandomNumber(0, height - circleSize)
    const color = getRandomColor(COLORS)

    circle.classList.add("circle")
    circle.style.background = `${getRandomColor(background)}`
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}, 0 0 14px ${color}, 4px 4px 9px ${color}`
    circle.style.width = `${circleSize}px`
    circle.style.height = `${circleSize}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board?.append(circle)
}

const getRandomNumber = (minValue, maxValue) => {
    return Math.round(Math.random() * (maxValue - minValue) + minValue)
}

const getRandomColor = (colors) => {
    return colors[Math.floor(Math.random() * colors.length)]
}
