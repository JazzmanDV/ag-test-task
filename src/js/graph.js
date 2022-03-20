import G6 from "@antv/g6";

import mockData from "./mockData.js";
import { toggleItemState, changeBranchVisibility } from "./utils.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage.js";

// ------GRAPH INIT------

const mountNode = document.getElementById("mountNode");

const width = window.innerWidth;
const height = window.innerHeight;

let graphData = loadFromLocalStorage("graph-data");
// layout не определен, так как мы сохраняем позиции узлов в localStorage (если это не первый запуск)
let layout = null;

// Если не нашли сохраненных данных в localStorage,
// то используем mockData и доверяем изначальное позиционирование узлов Dagre layout
if (!graphData) {
    graphData = mockData;
    layout = {
        type: "dagre",
        nodesep: 10,
        ranksep: 30,
    };
}

const graph = new G6.Graph({
    container: "mountNode",
    width,
    height,
    fitCenter: true,
    minZoom: 0.5,
    maxZoom: 3,
    layout: layout,
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
    defaultNode: {
        size: 50,
        style: {
            cursor: "pointer",
        },
    },
    defaultEdge: {
        style: {
            stroke: "#C5D8FF",
            endArrow: true,
        },
    },
    nodeStateStyles: {
        folded: {
            fill: "#5F95FF",
        },
    },
});

graph.read(graphData);
graph.fitCenter();

// ------GRAPH EVENTS INIT------

graph.on("node:click", (e) => {
    const node = e.item;

    const outEdges = node.getOutEdges();
    if (!outEdges.length) {
        return;
    }

    toggleItemState(node, "folded");

    const visibility = !node.hasState("folded");
    outEdges.forEach((edge) => changeBranchVisibility(edge, visibility));
});

graph.on("node:dragend", (e) => {
    saveToLocalStorage("graph-data", graph.save());
});

const scaleInput = document.getElementById("scale-input");
graph.on("wheelzoom", () => {
    scaleInput.value = graph.getZoom();
});

export default graph;
