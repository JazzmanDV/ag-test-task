export function toggleItemState(item, state) {
    item.setState(state, !item.hasState(state));
    return item.hasState(state);
}

function changeItemVisibility(item, visibility) {
    item.changeVisibility(visibility);
}

export function changeBranchVisibility(edge, visibility) {
    let target = edge.getTarget();

    if (target.hasState("folded") && visibility) {
        toggleItemState(target, "folded");
    }

    changeItemVisibility(edge, visibility);
    changeItemVisibility(target, visibility);

    target.getOutEdges().forEach((edge) => changeBranchVisibility(edge, visibility));
}
