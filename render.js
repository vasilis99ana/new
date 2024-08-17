//bejoining logic here
var W=600, H=600;
var BLOCK_W=W/COLS,
    BLOCK_H=H/ROWS;
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
function modelToView(x,y){
    return {
        x:x*BLOCK_W,
        y:y*BLOCK_H
    };
}
function viewToModel(x,y){
    return{
        x:Math.floor(x/BLOCK_W),
        y:Math.floor(y/BLOCK_H)
    }
}
function renderBlock(x,y){
    var viewCoordinates = modelToView(x,y);
    ctx.fillStyle='#aaa';
    ctx.strokeStyle='black';
    ctx.fillRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
    ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
    if(state[y][x]==STATE_OPENED){
        ctx.fillStyle = 'black';
        ctx.font='20pt Verdana';
        ctx.fillText(board[y][x],viewCoordinates.x,viewCoordinates.y+BLOCK_H);
    }
}
function render() {
    for (var y = 0; y < ROWS; ++y) {
        for (var x = 0; x < COLS; ++x) {
            renderBlock(x, y);
        }
    }
}
render();