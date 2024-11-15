export interface Node {
    id: string;
    type: string;
    label: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    groupId?: string;
    properties?: Record<string, any>;
}

export interface Edge {
    id: string;
    source: string;
    target: string;
    controlPoints?: { x: number; y: number }[];
}

export interface Group {
    id: string;
    type: string;
    label: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    nodes: string[];
}

export interface GraphData {
    nodes: Node[];
    edges: Edge[];
    groups: Group[];
}
