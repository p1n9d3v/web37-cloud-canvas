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
    type: CommonNodeType | CloudNodeType;
    point: Point;
};

export type NodeWithAnchor = Node & { anchorType?: AnchorType };

export type Edge = {
    id: string;
    source: NodeWithAnchor;
    target: NodeWithAnchor;
    type: 'line' | 'arrow';
};

export type Connection = {
    node: Node;
    anchorType: AnchorType;
};

export type CommonNodeType = 'pointer';
export type CloudNodeType = 'server';
