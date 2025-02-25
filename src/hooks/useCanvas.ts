import { useLayoutEffect, useRef } from "react";

export type CanvasPlugin = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
) => void | Promise<void>;

export type UseCanvasOptions = {
    width: number;
    height: number;
    devicePixelRatio?: number;

    plugins: CanvasPlugin[];
};

export const useCanvas = ({
    width,
    height,
    devicePixelRatio = 1,
    plugins,
}: UseCanvasOptions) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvasRef.current?.getContext("2d");
        if (!canvas || !ctx) throw new Error("Canvas 가 초기화되지 않았습니다");

        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.scale(devicePixelRatio, devicePixelRatio);

        plugins.forEach((plugin) => {
            plugin(canvas, ctx);
        });
    }, [width, height, devicePixelRatio, plugins]);

    return { canvasRef };
};
