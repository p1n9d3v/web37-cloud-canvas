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

export type Anchor = {
    nodeId: string;
    type: AnchorType;
    point: Point;
};

export type AnchorType = 'top' | 'right' | 'bottom' | 'left';

export type Node = {
    id: string;
    type: string;
    point: Point;
};

export type Edge = {
    id: string;
    source: {
        id: string;
        anchorType: AnchorType;
        point: Point;
    };
    target: {
        id: string;
        anchorType: AnchorType;
        point: Point;
    };
};
