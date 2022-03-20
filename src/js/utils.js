export function changeItemVisibility(item, visibility) {
    item.changeVisibility(visibility);
}

export function checkBranch(edge, visitedEdges = new Set(), visitedNodes = new Set()) {
    const target = edge.getTarget();

    visitedEdges.add(edge);
    visitedNodes.add(target);

    target.getOutEdges().forEach((edge) => {
        if (visitedNodes.has(edge.getTarget())) {
            visitedEdges.add(edge);
        } else {
            checkBranch(edge, visitedEdges, visitedNodes);
        }
    });

    return [visitedEdges, visitedNodes];
}
