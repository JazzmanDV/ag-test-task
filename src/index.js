import graph from "./js/graph.js";
import data from "./js/mockData.js";
import { toggleItemState, changeBranchVisibility } from "./js/utils.js";

graph.data(data);

graph.on("node:click", (e) => {
    const node = e.item;

    const outEdges = node.getOutEdges();
    if (!outEdges.length) {
        return;
    }

    toggleItemState(node, "collapsed");

    outEdges.forEach((edge) => changeBranchVisibility(edge, !edge.isVisible()));
});

// graph.on("node:dragend", (e) => saveToLocalStorate(graph.write()));

graph.render();
