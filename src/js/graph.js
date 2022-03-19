import G6 from "@antv/g6";

const container = document.getElementById("mountNode");

const width = window.innerWidth;
const height = window.innerHeight;

const graph = new G6.Graph({
    container: "mountNode",
    width,
    height,
    fitCenter: true,
    minZoom: 0.5,
    maxZoom: 3,
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
    defaultNode: {
        size: 50,
        style: {
            cursor: "pointer",
        },
    },
    defaultEdge: {
        style: {
            stroke: "#C5D8FF",
        },
    },
    nodeStateStyles: {
        folded: {
            fill: "#5F95FF",
        },
    },
});

if (typeof window !== "undefined") {
    window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
}

export default graph;
