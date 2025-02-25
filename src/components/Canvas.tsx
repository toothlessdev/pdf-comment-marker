import { useCanvas } from "../hooks/useCanvas";
import { CanvasImagePlugin } from "../plugins/CanvasImagePlugin";

import gridImage from "../assets/grid.jpg";

export const Canvas = () => {
    const { canvasRef } = useCanvas({
        width: 800,
        height: 600,
        plugins: [
            CanvasImagePlugin({
                imgSrc: gridImage,
                zoom: true,
                pan: true,
            }),
        ],
    });

    return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
};
