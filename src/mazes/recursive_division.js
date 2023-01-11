var grid = new Array()

function RecursiveDivision(x, y) {
    grid = new Array()
    for(let i = 0; i < x; i++) {
        grid[i] = new Array()
        for(var j = 0; j < y; j++) {
            grid[i][j] = 0
        }
    }
    addOuterWalls(grid)
    addInnerWalls(true, 1, grid[0].length - 1, 1, grid.length - 1)
    addOuterWalls(grid)
    return grid    
}

function addOuterWalls(grid) {
    for(let i = 0; i < grid.length; i++) {
        if(i === 0 || i === (grid.length - 1)) {
            for(let j = 0; j < grid[0].length; j++) {
                grid[i][j] = 1
            }
        } else {
            grid[i][0] = 1
            grid[i][grid[0].length - 1] = 1
        }
    }
}

function addInnerWalls(horizontalCheck, minX, maxX, minY, maxY) {
    if(horizontalCheck) {
        if(maxX - minX < 2) {
            return
        }
        var y = Math.floor(randomNumber(minY, maxY) / 2) * 2
        addHorizontalWall(minX, maxX, y)
        addInnerWalls(!horizontalCheck, minX, maxX, minY, y-1)
        addInnerWalls(!horizontalCheck, minX, maxX, y+1, maxY)
    } else {
        if(maxY - minY < 2) {
            return
        }
        var x = Math.floor(randomNumber(minX, maxX) / 2) * 2
        addVerticalWall(minY, maxY, x)
        addInnerWalls(!horizontalCheck, minX, x-1, minY, maxY)
        addInnerWalls(!horizontalCheck, x+1, maxX, minY, maxY)
    }
}

function addHorizontalWall(minX, maxX, y) {
    var hole = Math.floor(randomNumber(minX, maxX)/2)*2+1
    for(let i = minX; i <= maxX; i++) {
        if(i == hole) {
            grid[y][i] = 0
        } else {
            grid[y][i] = 1
        }
    }
}

function addVerticalWall(minY, maxY, x) {
    var hole = Math.floor(randomNumber(minY, maxY)/2)*2+1
    for(let i = minY; i <= maxY; i++) {
        if(i == hole) {
            grid[i][x] = 0
        } else {
            grid[i][x] = 1
        }
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default RecursiveDivision;