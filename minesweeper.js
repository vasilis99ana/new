//game logic is inside here
console.log('Minesweeper loaded')
var COLS = 10, ROWS = 10, MINES = 10;
var board = [];
var state = [];
var STATE_CLOSED = 0,
    STATE_FLAGGED = 1,
    STATE_OPENED = 2;
var BLOCK_MINE = -1;
var playing = true;
function countMinesAround(x, y) {
    var count = 0;
    for (var dx = -1; dx <= 1; ++dx) {
        for (var dy = -1; dy <= 1; ++dy) {
            if (dx == 0 && dy == 0) {
                continue;
            }
            var yy = y + dy,
                xx = x + dx;
            if (inBounds(xx, yy)) {
                if (board[yy][xx] == BLOCK_MINE) {
                    ++count;
                }
            }
        }
    }
    return count;
}
function inBounds(x, y) {
    return x >= 0 && y >= 0
        && x < COLS && y < ROWS;
}
function init(){
    //Initialize the board
    for (var y = 0; y < ROWS; ++y) {
        board.push([]);
        state.push([]);
        for (var x = 0; x < COLS; ++x) {
            board[y].push(0);
            state[y].push(STATE_CLOSED);
        }
    }
    //Arm the minefield COLShile checking not to stack to mines in the same cell
    for (var mine = 0; mine < MINES; ++mine) {
        var x, y;
        do {
            x = Math.floor(Math.random() * COLS),
            y = Math.floor(Math.random() * ROWS);
        } while (board[y][x] == BLOCK_MINE);
        board[y][x] = BLOCK_MINE;
    }
    for (var y = 0; y < ROWS; ++y) {
        for (var x = 0; x < COLS; ++x) {
            if (board[y][x] != BLOCK_MINE) {
                board[y][x] = countMinesAround(x, y);
            }
        }
    }
}


function openBlock(x,y){
    if(!playing){
        return;
    }
    if (board[y][x] == BLOCK_MINE) {
        alert('Game over!');
        playing = false;
        //revealBoard(false);
        return;
    }
    state[y][x]=STATE_OPENED;
    if(board[y][x]==0){
        for(var dx=-1; dx<=1; ++dx){
            for(var dy=-1; dy<=1; ++dy){
                var xx=x+dx;
                var yy=y+dy;
                if(inBounds(xx,yy)){
                    if(state[yy][xx]!=STATE_OPENED){
                        openBlock(xx,yy);
                    }
                }
            }
        }
    }
}
init();