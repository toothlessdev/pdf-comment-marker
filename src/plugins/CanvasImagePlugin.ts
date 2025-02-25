import { BaseCanvasPlugin } from "./BaseCanvasPlugin";

export type CanvasImagePluginOptions = {
    imgSrc: string;

    zoom?: boolean;
    pan?: boolean;
};

export const CanvasImagePlugin: BaseCanvasPlugin<CanvasImagePluginOptions> = ({
    imgSrc,
}: CanvasImagePluginOptions) => {
    return (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        const image = new Image();
        image.src = imgSrc;

        image.onload = () => {
            const baseScale = Math.min(
                canvas.width / image.width,
                canvas.height / image.height
            );
            ctx.drawImage(
                image,
                0,
                0,
                image.width * baseScale,
                image.height * baseScale
            );
        };
    };
};
