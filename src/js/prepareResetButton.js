import graph from "./graph.js";

import mockData from "./mockData.js";
import { removeFromLocalStorage } from "./localStorage.js";

export default function prepareResetButton() {
    const scaleInput = document.getElementById("scale-input");

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", () => {
        graph.updateLayout({
            type: "dagre",
            nodesep: 10,
            ranksep: 30,
        });

        graph.read(mockData);

        scaleInput.value = graph.getZoom();

        removeFromLocalStorage("graph-data");
    });
}
