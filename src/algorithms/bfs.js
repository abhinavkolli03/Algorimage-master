function Bfs(startNode, endNode) {
    let openSet = [];
    openSet.push(startNode)
    let path = []
    let visitedNodes = []
    let closedSet = []
    while(openSet.length > 0) {
        let current = openSet[0]
        visitedNodes.push(current)
        if(current.x === endNode.x && current.y === endNode.y) {
            let temp = current;
            path.push(temp)
            while(temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
            console.log("found")
            path = path.slice(1, -1)
            visitedNodes = visitedNodes.slice(1, -1)
            return {path, visitedNodes};
        }
        openSet = openSet.filter(element => element !== current);
        closedSet.push(current)
        let neighbors = current.neighbors
        for(let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]
            if(closedSet.includes(neighbor) || neighbor.isWall) {
                continue
            }
            openSet.push(neighbor)
            neighbor.previous = current
        }
    }
    visitedNodes = visitedNodes.slice(1, -1)
    return {path, visitedNodes};
}

export default Bfs;