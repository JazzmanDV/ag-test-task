import G6 from "@antv/g6";

import data from "./mockData.js";
import { toggleItemState, setItemLabel, changeBranchVisibility } from "./utils.js";

const container = document.getElementById("mountNode");
const width = window.innerWidth;
const height = window.innerHeight;

const graph = new G6.Graph({
    container: "mountNode",
    width,
    height,
    layout: {
        type: "dagre",
        nodesep: 10,
        ranksep: 30,
    },
    modes: {
        default: [
            "drag-node",
            {
                type: "drag-canvas",
                enableOptimize: true,
            },
            {
                type: "zoom-canvas",
                enableOptimize: true,
            },
        ],
    },
});

graph.data(data);
graph.render();

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

if (typeof window !== "undefined") {
    window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
}
