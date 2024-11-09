export type Dimension = '2d' | '3d';

export type Point = {
    x: number;
    y: number;
};
export type ViewBox = {
    point: Point;
    width: number;
    height: number;
};

export type Node = {
    id: string;
    type: string;
    point: Point;
};