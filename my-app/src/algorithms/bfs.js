// Performs Breadth First Search; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const queue = [startNode];
    startNode.isVisited = true;

    while (queue.length > 0) {
        const currentNode = queue.shift();
        visitedNodesInOrder.push(currentNode);

        if (currentNode === finishNode) {
            return visitedNodesInOrder;
        }

        updateNeighbors(currentNode, grid, queue);
    }

    return visitedNodesInOrder; // No path found
}

function updateNeighbors(node, grid, queue) {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        if (neighbor.isVisited || neighbor.isWall) {
            continue;
        }
        neighbor.isVisited = true;
        neighbor.previousNode = node;
        queue.push(neighbor);
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

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the bfs method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
