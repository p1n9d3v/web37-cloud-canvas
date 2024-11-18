export type Dimension = '2d' | '3d';

export type Point = {
    x: number;
    y: number;
};

export type GridPoint = {
    col: number;
    row: number;
};

export type Size = {
    width: number;
    height: number;
};

export interface ViewBox extends Point, Size {}

export type Node = {
    id: string;
    type: string;
    size: {
        d2: Size;
        d3: Size;
    };
    point: Point;
    label?: string;
    groupId?: string;
    properties?: Record<string, any>;
};

export type Edge = {
    id: string;
    type: string;
    source: {
        node: Node;
        anchorType?: AnchorType;
    };
    target: {
        node: Node;
        anchorType?: AnchorType;
    };
};

export type Group = {
    id: string;
    type: string;
    label: string;
    point: Point;
    nodes: string[];
};

export type AnchorType = 'top' | 'right' | 'bottom' | 'left';
export type Anchors = Record<AnchorType, Point>;
