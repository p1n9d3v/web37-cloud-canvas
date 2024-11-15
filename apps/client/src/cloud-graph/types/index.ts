export type Dimension = '2d' | '3d';

export type Position = {
    x: number;
    y: number;
};

export type Size = {
    width: number;
    height: number;
};

export interface ViewBox extends Position, Size {}

export interface Node {
    id: string;
    type: string;
    position: Position;
    size: Size;
    label?: string;
    groupId?: string;
    properties?: Record<string, any>;
}

export interface Edge {
    id: string;
    source: string;
    target: string;
    controlPoints?: Position[];
}

export interface Group {
    id: string;
    type: string;
    label: string;
    position: Position;
    size: Size;
    nodes: string[];
}

export interface GraphData {
    nodes: Node[];
    edges: Edge[];
    groups: Group[];
}
