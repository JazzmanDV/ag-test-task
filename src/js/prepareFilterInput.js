import debounce from "lodash/debounce";

import graph from "./graph.js";

export default function prepareFilterInput() {
    const debouncedOnFilterInput = debounce((e) => {
        const node = graph.find("node", (node) => node.getModel().label === e.target.value);
        graph.focusItem(node, true, { easing: "easeCubic", duration: 500 });
    }, 600);

    const filterInput = document.getElementById("filter-input");
    filterInput.addEventListener("input", debouncedOnFilterInput);
}
