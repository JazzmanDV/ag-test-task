import G6 from "@antv/g6";

const data = {
    nodes: [
        { id: "node0", label: "0" },
        { id: "node1", label: "1" },
        { id: "node2", label: "2" },
        { id: "node3", label: "3" },
        { id: "node4", label: "4" },
        { id: "node5", label: "5" },
        { id: "node6", label: "6" },
        { id: "node7", label: "7" },
        { id: "node8", label: "8" },
        { id: "node9", label: "9" },
        { id: "node10", label: "10" },
        { id: "node11", label: "11" },
        { id: "node12", label: "12" },
        { id: "node13", label: "13" },
        { id: "node14", label: "14" },
        { id: "node15", label: "15" },
        { id: "node16", label: "16" },
    ],
    edges: [
        { source: "node0", target: "node1", label: "0-1" },
        { source: "node0", target: "node2", label: "0-2" },
        { source: "node0", target: "node3", label: "0-3" },
        { source: "node0", target: "node4", label: "0-4" },
        { source: "node0", target: "node5", label: "0-5" },
        { source: "node1", target: "node6", label: "1-6" },
        { source: "node1", target: "node7", label: "1-7" },
        { source: "node2", target: "node8", label: "2-8" },
        { source: "node2", target: "node9", label: "2-9" },
        { source: "node2", target: "node10", label: "2-10" },
        { source: "node2", target: "node11", label: "2-11" },
        { source: "node2", target: "node12", label: "2-12" },
        { source: "node2", target: "node13", label: "2-13" },
        { source: "node3", target: "node14", label: "3-14" },
        { source: "node3", target: "node15", label: "3-15" },
        { source: "node3", target: "node16", label: "3-16" },
    ],
};

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

function changeItemVisibility(item) {
    item.changeVisibility(!item.isVisible());
}

function changeBranchVisibility(edge) {
    let target = edge.getTarget();

    changeItemVisibility(edge);
    changeItemVisibility(target);

    target.getOutEdges().forEach((edge) => changeBranchVisibility(edge));
}

graph.on("node:click", (e) => {
    const node = e.item;
    node.getOutEdges().forEach((edge) => changeBranchVisibility(edge));
});

// graph.on("node:dragend", (e) => saveToLocalStorate(graph.write()));

if (typeof window !== "undefined") {
    window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
}
