const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const all_possible_win_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const grid_elements = document.querySelectorAll('[data-cell]')
const Maze = document.getElementById('Maze')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let O_turn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    O_turn = false
    grid_elements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', for_clicks)
        cell.addEventListener('click', for_clicks, { once: true })
    })
    setMazeHoverClass()
    winningMessageElement.classList.remove('show')
}

function for_clicks(e) {
    const cell = e.target
    const currentClass = O_turn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (check_winning(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        alternate_turns()
        setMazeHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Match Draw!'
    } else {
        winningMessageTextElement.innerText = `${O_turn ? "Congratulations O" : "Congratulations X"} you Won!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...grid_elements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function alternate_turns() {
    O_turn = !O_turn
}

function setMazeHoverClass() {
    Maze.classList.remove(X_CLASS)
    Maze.classList.remove(CIRCLE_CLASS)
    if (O_turn) {
        Maze.classList.add(CIRCLE_CLASS)
    } else {
        Maze.classList.add(X_CLASS)
    }
}

function check_winning(currentClass) {
    return all_possible_win_combinations.some(combination => {
        return combination.every(index => {
            return grid_elements[index].classList.contains(currentClass)
        })
    })
}