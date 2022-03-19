export function toggleItemState(item, state) {
    item.setState(state, !item.hasState(state));
    return item.hasState(state);
}

export function setItemLabel(item, label) {
    item.update({ label });
}

function changeItemVisibility(item, visibility) {
    item.changeVisibility(visibility);
}

export function changeBranchVisibility(edge, visibility) {
    let target = edge.getTarget();

    if (target.hasState("collapsed") && visibility) {
        toggleItemState(target, "collapsed");
        setItemLabel(target, target.getModel().label.split(" (collapsed)")[0]);
    }

    changeItemVisibility(edge, visibility);
    changeItemVisibility(target, visibility);

    target.getOutEdges().forEach((edge) => changeBranchVisibility(edge, visibility));
}
