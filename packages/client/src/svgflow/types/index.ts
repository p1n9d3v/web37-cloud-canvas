export type Dimension = '2d' | '3d';

export type Point = {
    x: number;
    y: number;
};

export interface ViewBox extends Point {
    width: number;
    height: number;
}

export type AnchorType = 'top' | 'right' | 'bottom' | 'left';

export type Node = {
    id: string;
    type: string;
    point: Point;
};

export type Edge = {
    id: string;
    sourceId: string;
    targetId: string;
    sourceAnchorType: AnchorType;
    targetAnchorType: AnchorType;
};
