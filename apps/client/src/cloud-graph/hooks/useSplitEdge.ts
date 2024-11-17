import { Edge, Node, Point } from '@cloud-graph/types';
import { getSvgPoint } from '@cloud-graph/utils';
import { nanoid } from 'nanoid';

type Props = {
    svg: SVGSVGElement;
    updateEdge: (edge: Edge, pointer: Node) => void;
};
export default ({ svg, updateEdge }: Props) => {
    const handleSplit = (edge: Edge, point: Point) => {
        const svgPoint = getSvgPoint(svg, point);

        const pointer = {
            id: `node-${nanoid()}`,
            type: 'pointer',
            point: svgPoint,
            size: {
                d2: { width: 6, height: 6 },
                d3: { width: 6, height: 6 },
            },
        };

        updateEdge(edge, pointer);
    };

    return {
        handleSplit,
    };
};
