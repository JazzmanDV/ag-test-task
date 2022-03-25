import G6 from "@antv/g6";

import mockData from "./mockData.js";
import { changeItemVisibility, checkBranch } from "./utils.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage.js";

// ------GRAPH INIT------

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

    const visibility = node.hasState("folded");

    outEdges.forEach((edge) => {
        const [visitedEdges, visitedNodes] = checkBranch(edge);

        for (const visitedNode of visitedNodes) {
            if (visitedNode === node) {
                continue;
            }
            const inEdges = visitedNode.getInEdges();
            for (const inEdge of inEdges) {
                if (!visitedEdges.has(inEdge)) {
                    return;
                }
            }
        }

        // Сворачиваем ветку
        const itemsForChangeVisibility = [...visitedEdges, ...visitedNodes];

        itemsForChangeVisibility.forEach((item) => {
            if (item === node) {
                return;
            }
            // При сворачивании все дочерние свернутые узлы должны сбросить свое состояние
            if (item.hasState("folded") && !visibility) {
                item.setState("folded", false);
            }
            changeItemVisibility(item, visibility);
        });

        // Если что-то было свернуто, то меняем состояние нашего исходного узла
        if (itemsForChangeVisibility.length > 0) {
            node.setState("folded", !visibility);
        }
    });
});

graph.on("node:dragend", (e) => {
    saveToLocalStorage("graph-data", graph.save());
});

const scaleInput = document.getElementById("scale-input");

graph.on("wheelzoom", () => {
    scaleInput.value = graph.getZoom();
});

export default graph;
