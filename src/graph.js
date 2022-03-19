import G6 from "@antv/g6";

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

if (typeof window !== "undefined") {
    window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
}

export default graph;
