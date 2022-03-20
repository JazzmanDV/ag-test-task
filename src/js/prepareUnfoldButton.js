import graph from "./graph.js";

import { toggleItemState } from "./utils.js";

export default function prepareUnfoldButton() {
    const unfoldAllButton = document.getElementById("unfold-all-button");
    unfoldAllButton.addEventListener("click", () => {
        graph.findAll("node", (node) => !node.isVisible()).forEach((node) => node.changeVisibility(true));
        graph.findAll("edge", (edge) => !edge.isVisible()).forEach((edge) => edge.changeVisibility(true));

        graph.findAllByState("node", "folded").forEach((node) => toggleItemState(node, "folded"));
    });
}
