const sizes = document.querySelectorAll('.size-button');
sizes.forEach(sizeButton => sizeButton.addEventListener('click', changeSize));

let smallBtn = document.getElementById('small-btn');
let mediumBtn = document.getElementById('medium-btn');
let largeBtn = document.getElementById('large-btn');

let clearBtn = document.getElementById('clear').addEventListener('click', clearDrawingboard);

const modes = document.querySelectorAll('.color-button');
modes.forEach(mode => mode.addEventListener('click', changeMode));

let classicBtn = document.getElementById('classic');
let randomBtn = document.getElementById('random');
let retroBtn = document.getElementById('retro');
let eraseBtn = document.getElementById('eraser');

let currentSize = 'Medium';
mediumBtn.classList.add('active');

let currentMode = 'Classic';
classicBtn.classList.add('active');

let drawingBoard = document.getElementById('drawing-board');
let grids = [];

function changeSize(e) {
    grids = [];
    currentSize = e.target.textContent;
    console.log(currentSize);
    if (currentSize === 'Small') {
        smallBtn.classList.add('active');
        mediumBtn.classList.remove('active');
        largeBtn.classList.remove('active');
    } else if (currentSize === 'Medium') {
        smallBtn.classList.remove('active')
        mediumBtn.classList.add('active');
        largeBtn.classList.remove('active');
    } else if (currentSize === 'Large') {
        smallBtn.classList.remove('active');
        mediumBtn.classList.remove('active');
        largeBtn.classList.add('active');
    }
    createGrid();
    beginPainting();
}

function createGrid() {
    emptyDrawingBoard();
    let number = 0;
    let classSize = '';

    switch (currentSize) {
        case 'Small':
            number = 2691;
            classSize = 'small-grid';
            break;
        case 'Medium':
            number = 1008;
            classSize = 'medium-grid';
            break;
        case 'Large':
            number = 120;
            classSize = 'large-grid';
            break;
    }

    for (let i = 0; i < number; i++) {
        let grid = document.createElement('div');
        grid.classList.add(classSize);
        grid.classList.add('grid');
        drawingBoard.append(grid);
        grids.push(grid);
    }
}

function emptyDrawingBoard() {
    while (drawingBoard.firstChild) {
        drawingBoard.removeChild(drawingBoard.firstChild);
    }
}

function clearDrawingboard() {
    grids.forEach(grid => grid.style.backgroundColor = '#cfcccc');
}

function changeMode(e) {
    currentMode = e.target.textContent;
    if (currentMode === 'Classic') {
        classicBtn.classList.add('active');
        randomBtn.classList.remove('active');
        retroBtn.classList.remove('active');
        eraseBtn.classList.remove('active');
    } else if (currentMode === 'Random') {
        classicBtn.classList.remove('active');
        randomBtn.classList.add('active');
        retroBtn.classList.remove('active');
        eraseBtn.classList.remove('active');
    } else if (currentMode === 'Retro') {
        classicBtn.classList.remove('active');
        randomBtn.classList.remove('active');
        retroBtn.classList.add('active');
        eraseBtn.classList.remove('active');
    } else if (currentMode === 'Eraser') {
        classicBtn.classList.remove('active');
        randomBtn.classList.remove('active');
        retroBtn.classList.remove('active');
        eraseBtn.classList.add('active');
    }
}

function beginPainting() {
    grids.forEach(grid => grid.addEventListener('mouseenter', e => {
        if (currentMode === 'Classic') {
            e.target.style.backgroundColor = '#707070';
        }
        if (currentMode === 'Random') {
            let red = Math.floor(Math.random() * 257);
            let blue = Math.floor(Math.random() * 257);
            let green = Math.floor(Math.random() * 257);
            e.target.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
        }
        if (currentMode === 'Retro') {
            const retroPallete = ['#FB3617', '#FC945C', '#F6C48E', '#83B799', '#1D8698'];
            e.target.style.backgroundColor = retroPallete[Math.floor(Math.random() * retroPallete.length)];
        }
        if (currentMode === 'Eraser') {
            e.target.style.backgroundColor = '#cfcccc';
        }
    }));
}

createGrid();
beginPainting();