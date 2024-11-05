export type ViewBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type Node = {
    id: string;
    type: string;
    x: number;
    y: number;
};

export type Edge = {
    id: string;
    source: string;
    target: string;
};
