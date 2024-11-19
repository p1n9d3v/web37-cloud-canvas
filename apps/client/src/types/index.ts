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
    point: Point;
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

export type Point = { x: number; y: number };

// export type Group = {
//   id: string;
//   type: 'Region' | 'VPC' | 'Subnet' | 'SecurityGroup'; // 그룹 유형 명시
//   name: string;
//   nodes: string[]; // 그룹에 직접 속한 노드들의 ID
//   groups: string[]; // 하위 그룹들의 ID
//   parentGroupId?: string; // 상위 그룹의 ID (루트 그룹인 경우 없음)
//   bounds: { x: number; y: number; width: number; height: number };
//   properties: { [key: string]: any }; // 그룹별 속성 (CIDR 블록 등)
// };
