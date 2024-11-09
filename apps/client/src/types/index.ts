export type Position = {
    x: number;
    y: number;
};
export type ViewBox = {
    position: Position;
    width: number;
    height: number;
};

export type AnchorType = 'top' | 'left' | 'right' | 'bottom';
export type Anchors = {
    top: Position;
    left: Position;
    right: Position;
    bottom: Position;
};

export type Node = {
    id: string;
    type: string;
    isFocused: boolean;
    position: Position;
    anchors: Anchors;
};

export type EdgePoint = {
    nodeId?: string;
    anchor: {
        type?: AnchorType;
        position: Position;
    };
};

export type Edge = {
    id: string;
    source: EdgePoint;
    target: EdgePoint;
};
