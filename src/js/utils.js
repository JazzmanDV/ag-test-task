export function toggleItemState(item, state) {
    item.setState(state, !item.hasState(state));
    return item.hasState(state);
}

export function changeItemVisibility(item, visibility) {
    item.changeVisibility(visibility);
}

export function changeBranchVisibility(edge, visibility) {
    const target = edge.getTarget();

    // Если мы рекурсивно прячем ветки, при этом у нас ранее эта ветка уже была спрятана, то обнуляем состояние корневого узла этой свернутой ветки за ненадобностью
    if (target.hasState("folded") && !visibility) {
        toggleItemState(target, "folded");
    }

    // Прячем дочерний узел
    changeItemVisibility(target, visibility);

    // Прячем все входящие в дочерний узел дуги
    target.getInEdges().forEach((edge) => changeItemVisibility(edge, visibility));

    // Рекурсивно прячем все исходящие из дочернего узла ветки
    target
        .getOutEdges()
        .filter((edge) => edge.getSource() !== edge.getTarget())
        .forEach((edge) => changeBranchVisibility(edge, visibility));
}
