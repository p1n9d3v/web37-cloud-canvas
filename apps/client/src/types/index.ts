export type Dimension = '2d' | '3d';
export type ViewBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type Node = {
    id: string;
    type: string;
    name: string;
    position: { x: number; y: number };
    size: {
        d2: { width: number; height: number };
        d3: { width: number; height: number };
    };
    properties: { [key: string]: any };
    connectors: { x: number; y: number }[];
};

export type Edge = {
    id: string;
    sourceNodeId: string;
    targetNodeId: string;
    bendPoints: { x: number; y: number }[];
};

export type Group = {
    id: string;
    type: string;
    name: string;
    nodes: string[];
    groups: string[];
    bounds: { x: number; y: number; width: number; height: number };
    properties: { [key: string]: any };
};
