export type Dimension = '2d' | '3d';

export type Point = {
    x: number;
    y: number;
};

export interface ViewBox extends Point {
    width: number;
    height: number;
}

export interface Node {
    id: string;
    type: string;
    point: Point;
    label?: string;
    groupId?: string;
    properties?: Record<string, any>;
}

export interface Edge {
    id: string;
    source: string;
    target: string;
    controlPoints?: Point[];
}

export interface Group {
    id: string;
    type: string;
    label: string;
    point: Point;
    nodes: string[];
}

export interface GraphData {
    nodes: Node[];
    edges: Edge[];
    groups: Group[];
}
