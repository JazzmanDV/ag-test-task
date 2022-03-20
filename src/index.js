import "./index.css";

import graph from "./js/graph.js";
import prepareUnfoldButton from "./js/prepareUnfoldButton.js";
import prepareFilterInput from "./js/prepareFilterInput.js";
import prepareScaleInput from "./js/prepareScaleInput.js";

// ------COMMON EVENTS INIT------

prepareUnfoldButton();
prepareFilterInput();
prepareScaleInput();

const mountNode = document.getElementById("mountNode");
if (typeof window !== "undefined") {
    window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!mountNode || !mountNode.scrollWidth || !mountNode.scrollHeight) return;
        graph.changeSize(mountNode.scrollWidth, mountNode.scrollHeight);
    };
}
