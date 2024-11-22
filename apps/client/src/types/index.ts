export type Dimension = '2d' | '3d';

export type Point = { x: number; y: number };

export type GridPoint = { col: number; row: number };

export type Size = { width: number; height: number; offset?: number };

export type ViewBox = Point & Size;

export type Bounds = Point & Size;

export type Node = {
    id: string;
    type: string;
    name: string;
    point: Point;
    size: {
        '2d': Size;
        '3d': Size;
    };
    properties: { [key: string]: any };
    connectors: { [key: string]: Point };
    groupIds: string[];
};

export type Edge = {
    id: string;
    type: 'arrow' | 'line';
    source: {
        id: string;
        connectorType: ConnectorType;
    };
    target: {
        id: string;
        connectorType: ConnectorType;
    };
    bendPoints: { x: number; y: number }[];
};

export type Group = {
    id: string;
    type: string;
    name: string;
    nodeIds: string[];
    bounds: Bounds;
    properties: { [key: string]: any };
    childGroupIds: string[];
    parentGroupId?: string;
};

export type ConnectorType = 'top' | 'right' | 'bottom' | 'left' | 'center';
export type ConnectorMap = Record<Partial<ConnectorType>, Point>;
export interface Connector {
    type: 'node' | 'bend' | string;
    point: Point;
    connectorType?: ConnectorType;
}
