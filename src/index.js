import "./index.css";

import graph from "./js/graph.js";
import prepareUnfoldAllButton from "./js/prepareUnfoldAllButton.js";
import prepareFilterInput from "./js/prepareFilterInput.js";
import prepareScaleInput from "./js/prepareScaleInput.js";
import prepareResetButton from "./js/prepareResetButton.js";

// ------COMMON EVENTS INIT------

prepareUnfoldAllButton();
prepareFilterInput();
prepareScaleInput();
prepareResetButton();

const mountNode = document.getElementById("mountNode");
if (typeof window !== "undefined") {
    window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!mountNode || !mountNode.scrollWidth || !mountNode.scrollHeight) return;
        graph.changeSize(mountNode.scrollWidth, mountNode.scrollHeight);
    };
}
