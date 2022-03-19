import G6 from "@antv/g6";

const data = {
    nodes: [
        { id: "node0", size: 50, label: "0" },
        { id: "node1", size: 30, label: "1" },
        { id: "node2", size: 30, label: "2" },
        { id: "node3", size: 30, label: "3" },
        { id: "node4", size: 30, label: "4" },
        { id: "node5", size: 30, label: "5" },
        { id: "node6", size: 15, label: "6" },
        { id: "node7", size: 15, label: "7" },
        { id: "node8", size: 15, label: "8" },
        { id: "node9", size: 15, label: "9" },
        { id: "node10", size: 15, label: "10" },
        { id: "node11", size: 15, label: "11" },
        { id: "node12", size: 15, label: "12" },
        { id: "node13", size: 15, label: "13" },
        { id: "node14", size: 15, label: "14" },
        { id: "node15", size: 15, label: "15" },
        { id: "node16", size: 15, label: "16" },
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
            {
                type: "collapse-expand",
                trigger: "click",
                onChange(item, collapsed) {
                    const data = item.get("model").data;
                    data.collapsed = collapsed;
                    return true;
                },
                shouldBegin: (e) => {
                    // Nothing happens when the current item has id 'node1'
                    if (e.item && e.item.getModel().id === "node1") return false;
                    return true;
                },
            },
        ],
    },
});

graph.data(data);
graph.render();
// graph.fitCenter();

if (typeof window !== "undefined") {
    window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
}
