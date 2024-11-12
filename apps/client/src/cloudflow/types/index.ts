export type Dimension = '2d' | '3d';

export type Point = {
    x: number;
    y: number;
};

export interface ViewBox extends Point {
    width: number;
    height: number;
}

export type AnchorType = 'top' | 'right' | 'bottom' | 'left' | 'center';

export type Node = {
    id: string;
    type: string;
    point: Point;
};

export type Edge = {
    id: string;
    source: Node & { anchorType: AnchorType };
    target: Node & { anchorType: AnchorType };
};

export type Connection = {
    node: Node;
    anchorType: AnchorType;
};
