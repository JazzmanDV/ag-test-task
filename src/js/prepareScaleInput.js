import graph from "./graph.js";

export default function prepareScaleInput() {
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
}
