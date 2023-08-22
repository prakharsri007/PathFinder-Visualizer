export function astar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.heuristic = calculateHeuristic(startNode, finishNode);
    const openSet = [startNode];

    while (openSet.length > 0) {
        sortNodesByFValue(openSet);
        const currentNode = openSet.shift();

        if (currentNode === finishNode) {
            return visitedNodesInOrder;
        }

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        updateNeighbors(currentNode, grid, finishNode, openSet);
    }
    
    return visitedNodesInOrder; // No path found
}

function sortNodesByFValue(nodes) {
    nodes.sort((nodeA, nodeB) => nodeA.fValue - nodeB.fValue);
}

function calculateHeuristic(node, targetNode) {
    const dx = Math.abs(node.col - targetNode.col);
    const dy = Math.abs(node.row - targetNode.row);
    return dx + dy; // Manhattan distance heuristic
}

function updateNeighbors(node, grid, targetNode, openSet) {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        if (neighbor.isWall || neighbor.isVisited) {
            continue;
        }

        const tentativeG = node.distance + 1;
        if (tentativeG < neighbor.distance) {
            neighbor.previousNode = node;
            neighbor.distance = tentativeG;
            neighbor.heuristic = calculateHeuristic(neighbor, targetNode);
            neighbor.fValue = neighbor.distance + neighbor.heuristic;

            if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
            }
        }
    }
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors;
}