export type ViewBox = {
    position: {
        x: number;
        y: number;
    };
    width: number;
    height: number;
};

export type Node = {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
    };
};

export type Edge = {
    id: string;
    source: string;
    target: string;
};
