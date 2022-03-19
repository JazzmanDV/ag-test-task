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

    toggleItemState(node, "folded");

    outEdges.forEach((edge) => changeBranchVisibility(edge, !edge.isVisible()));
});

// graph.on("node:dragend", (e) => saveToLocalStorate(graph.write()));

const unfoldAllButton = document.getElementById("unfold-all-button");
unfoldAllButton.addEventListener("click", () => {
    graph.findAll("node", (node) => !node.isVisible()).forEach((node) => node.changeVisibility(true));
    graph.findAll("edge", (edge) => !edge.isVisible()).forEach((edge) => edge.changeVisibility(true));

    graph.findAllByState("node", "folded").forEach((node) => toggleItemState(node, "folded"));
});

const debouncedOnFilterInput = debounce((e) => {
    const node = graph.find("node", (node) => node.getModel().label === e.target.value);
    graph.focusItem(node, true, { easing: "easeCubic", duration: 500 });
}, 600);

const filterInput = document.getElementById("filter-input");
filterInput.addEventListener("input", debouncedOnFilterInput);

const scaleInput = document.getElementById("scale-input");
scaleInput.step = 10e-10;
scaleInput.min = graph.cfg.minZoom;
scaleInput.max = graph.cfg.maxZoom;
scaleInput.value = graph.getZoom();

scaleInput.addEventListener("input", (e) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    graph.zoomTo(e.target.value, { x: width / 2, y: height / 2 });
});

graph.on("wheelzoom", () => {
    scaleInput.value = graph.getZoom();
});

graph.render();
