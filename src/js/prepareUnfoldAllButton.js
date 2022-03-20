import graph from "./graph.js";

import { toggleItemState } from "./utils.js";

function showItems(items) {
    items.forEach((item) => item.changeVisibility(true));
}

function findHiddenItems(itemType) {
    return graph.findAll(itemType, (item) => !item.isVisible());
}

export default function prepareUnfoldAllButton() {
    document.getElementById("unfold-all-button").addEventListener("click", () => {
        showItems(findHiddenItems("node"));
        showItems(findHiddenItems("edge"));
        graph.findAllByState("node", "folded").forEach((node) => toggleItemState(node, "folded"));
    });
}
