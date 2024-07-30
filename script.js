const gridContainer = document.querySelector("#grid-container");
const btnNewCells = document.querySelector("#btn-new-grid");


const randomRgba = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 0; 
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const getUserNum = () => {
    let numCells;
    numCells = prompt("Hello, please enter the number of squares per side for the new grid.");
    if (numCells === null) {
        clearContent();
    } else if (numCells === null || numCells < 1 || numCells > 100) {
        while (true) {
            numCells = prompt("Please enter a number between 1 and 100.");
            if (numCells === null) {
                break;
            } else if (!isNaN(numCells) && numCells <= 100 && numCells >= 1) {
                break;
            }
        };
    }
    return numCells;
};

const gridCreate = () => {
    let row;
    const cellSize = Math.floor(gridContainer.clientWidth / getUserNum());
    for (let r = 1; r <= numCells; r++) {
        row = document.createElement("div");
        for (let c = 1; c <= numCells; c++) {
            let column = document.createElement("div");
            column.classList.add("cells");
            column.id = `cell-${c}-${r}`;
            column.style.width = `${cellSize}px`;
            column.style.height = `${cellSize}px`;
            column.style.border = `2px solid #000`;
            let overlayOpacity = 0;
            let mouseCount = 0;
            column.addEventListener('mouseover', () => {
                const newColor = randomRgba();
                mouseCount++;
                column.style.backgroundColor = newColor;
                if (overlayOpacity < 1) {
                    overlayOpacity += 0.1; 
                    column.style.backgroundColor = `rgba(${newColor.match(/rgba\((\d+), (\d+), (\d+), ([\d\.]+)\)/)[1]}, 
                                                        ${newColor.match(/rgba\((\d+), (\d+), (\d+), ([\d\.]+)\)/)[2]}, 
                                                        ${newColor.match(/rgba\((\d+), (\d+), (\d+), ([\d\.]+)\)/)[3]}, 
                                                        ${overlayOpacity})`;
                    }
                if (mouseCount === 10) {
                    overlayOpacity = 0;
                    mouseCount = 0;
                    column.style.background = randomRgba();
                }
            });
            row.appendChild(column);
        }
        row.id = `cell-${1}-${r}`;
        gridContainer.appendChild(row);
    }
    return gridContainer;
};
const clearContent = () => {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    };
};
btnNewCells.addEventListener("click", () => {
    clearContent();
    setTimeout(() => {
        gridCreate(); 
    }, 100); 
    
});
