import debounce from "lodash/debounce";

import "./index.css";

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

const rangeInput = document.getElementById("scale");
rangeInput.step = 10e-10;
rangeInput.min = graph.cfg.minZoom;
rangeInput.max = graph.cfg.maxZoom;
rangeInput.value = graph.getZoom();

rangeInput.addEventListener("input", (e) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    graph.zoomTo(e.target.value, { x: width / 2, y: height / 2 });
});

graph.on("wheelzoom", (e) => {
    rangeInput.value = graph.getZoom();
});

graph.render();
