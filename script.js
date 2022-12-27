function createEmptyBoard(){
    return[
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ];
}

let board = createEmptyBoard();

function enter(id){
    const [rowIndex,colIndex] = id.split('-');
    const value = Number(document.getElementById(id).value);
    if(isValid(board,rowIndex,colIndex,value)){
        board[rowIndex][colIndex] = value;
    }else if(!isValidRow(board,rowIndex,value)){
        alert(`'${value}' alredy exists in the row.`)
    }else if(!isValidCol(board,colIndex,value)){
        alert(`'${value}' alredy exists in the col.`)
    }
    else if(!isValidSquare(board,rowIndex,colIndex,value)){
        alert(`'${value}' alredy exists in the inner square.`)
    }
}


function createInput(rowIndex,colIndex){
    const input = document.createElement('input');
    const value = board[rowIndex][colIndex];
    input.id = rowIndex + '-' + colIndex;
    if(value != 0){
        input.value = value;
    }
    input.type = 'number';
    input.min = 1;
    input.max = 9;
    input.setAttribute('oninput',`enter("${input.id}")`);
    input.setAttribute('onfocus',"this.value=''");
    input.setAttribute('autocomplete',"off");
    return input;
}





function display(){

    document.querySelector('table').innerHTML = '';

    for(let rowIndex = 0; rowIndex < 9; rowIndex++){
        const tableRow = document.createElement('tr');
        tableRow.classList.add('border-left');
        tableRow.classList.add('border-right');
        if(rowIndex == 8 || rowIndex == 2 || rowIndex == 5){
            tableRow.classList.add('border-bottom')
        }
        if(rowIndex == 0){
            tableRow.classList.add('border-top');
        }
        for(let colIndex = 0; colIndex < 9; colIndex++){
            const tableCol = document.createElement('td');
            if(colIndex == 2 || colIndex == 5){
                tableCol.classList.add('border-right')
            }   
            const input = createInput(rowIndex,colIndex);
            tableCol.appendChild(input);
            tableRow.appendChild(tableCol);
        }
        document.querySelector('table').appendChild(tableRow);
    }
}


display();



function isValidSquare(board, row, col, value) {
    localRow = row - (row % 3);
    localCol = col - (col % 3);
    for (let i = localRow; i < localRow + 3; i++) {
        for (let j = localCol; j < localCol + 3; j++) {
            if (board[i][j] == value) {
                return false;
            }
        }
    }
    return true;
}

function isValidCol(board, col, value) {
    for (let row = 0; row < 9; row++) {
        if (board[row][col] == value) {
            return false;
        }
    }
    return true
}

function isValidRow(board, row, value) {
    for (let col = 0; col < 9; col++) {
        if (board[row][col] == value) {
            return false;
        }
    }
    return true;
}

function isValid(board, row, col, value) {
    return isValidRow(board, row, value) 
    && isValidCol(board, col, value) 
    && isValidSquare(board, row, col, value);
}

function solveBoard(){
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == 0) {
                for (let value = 1; value <= 9; value++) {
                    if (isValid(board, row, col, value)) {
                        board[row][col] = value;
                        if (solveBoard()) {
                            return true;
                        } else {
                            board[row][col] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}



function solve(){
    solveBoard();
    display();
    document.querySelectorAll('input').forEach(input=> input.disabled = true);
}



function reset(){
    board = createEmptyBoard();
    display();
}

function resize(){
    const table = document.querySelector('table');
    const height = table.getBoundingClientRect().height;
    const width = table.getBoundingClientRect().width;
    const min = Math.min(height,width);
    table.style.height = min;
    table.style.width = min;
}

resize();





        var resizeTimeout;
window.addEventListener('resize', function(event) {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function(){
    window.location.reload();
  }, 100);
});