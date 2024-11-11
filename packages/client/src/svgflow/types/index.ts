export type Dimension = '2d' | '3d';

export type Point = {
    x: number;
    y: number;
};

export interface ViewBox extends Point {
    width: number;
    height: number;
}
