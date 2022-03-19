import graph from "./graph.js";
import data from "./mockData.js";
import { toggleItemState, setItemLabel, changeBranchVisibility } from "./utils.js";

graph.data(data);

graph.on("node:click", (e) => {
    const node = e.item;

    const outEdges = node.getOutEdges();
    if (!outEdges.length) {
        return;
    }

    const isCollapsed = toggleItemState(node, "collapsed");
    console.log(isCollapsed);

    if (isCollapsed) {
        setItemLabel(node, node.getModel().label + " (collapsed)");
    } else {
        setItemLabel(node, node.getModel().label.split(" (collapsed)")[0]);
    }

    outEdges.forEach((edge) => changeBranchVisibility(edge, !edge.isVisible()));
});

// graph.on("node:dragend", (e) => saveToLocalStorate(graph.write()));

graph.render();
