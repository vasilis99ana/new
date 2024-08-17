canvas.addEventListener('mousedown', function(e) {
    var x = e.clientX - canvas.offsetLeft,
        y = e.clientY - canvas.offsetTop;

    // hit test
    var modelCoordinates = viewToModel(x, y);
    openBlock(modelCoordinates.x, modelCoordinates.y);
    render();
});