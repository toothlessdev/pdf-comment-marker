export type BaseCanvasPlugin<
    T extends Record<string, unknown> = Record<string, unknown>
> = (
    options: T
) => (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
) => void | Promise<void>;
