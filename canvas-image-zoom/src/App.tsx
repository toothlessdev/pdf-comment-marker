import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gridImage from "./assets/grid.jpg";

export default function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [zoom, setZoom] = useState(1);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const baseScaleRef = useRef(1);

    useLayoutEffect(() => {
        const canvasElement = canvasRef.current;
        if (!canvasElement) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            console.log(e.deltaY);
            setZoom((prev) => (e.deltaY < 0 ? prev * 1.1 : prev * 0.9));
        };

        canvasElement.addEventListener("wheel", onWheel);

        return () => {
            canvasElement.removeEventListener("wheel", onWheel);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const image = new Image();
        image.src = gridImage;

        image.onload = () => {
            imageRef.current = image;
            baseScaleRef.current = Math.min(canvas.width / image.width, canvas.height / image.height);
            drawImage();
        };

        function drawImage() {
            if (!imageRef.current) return;
            const currentScale = baseScaleRef.current * zoom;
            const x = (canvas.width - imageRef.current.width * currentScale) / 2;
            const y = (canvas.height - imageRef.current.height * currentScale) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(imageRef.current, x, y, imageRef.current.width * currentScale, imageRef.current.height * currentScale);
        }
    }, [zoom]);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{
                width: "800px",
                height: "600px",
                border: "1px solid black",
            }}></canvas>
    );
}
