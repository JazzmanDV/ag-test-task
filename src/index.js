import "./index.css";

import graph from "./js/graph.js";
import prepareUnfoldButton from "./js/prepareUnfoldButton.js";
import prepareFilterInput from "./js/prepareFilterInput.js";
import prepareScaleInput from "./js/prepareScaleInput.js";

// ------COMMON EVENTS INIT------

prepareUnfoldButton();
prepareFilterInput();
prepareScaleInput();

if (typeof window !== "undefined") {
    window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
}
