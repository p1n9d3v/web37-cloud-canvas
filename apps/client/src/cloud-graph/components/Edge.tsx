import { Dimension, Edge } from '@cloud-graph/types';
import { calculateAnchorPoints } from '@cloud-graph/utils';
import { useTheme } from '@mui/material';

type Props = {
    edge: Edge;
    dimension: Dimension;
};

export default ({ edge, dimension }: Props) => {
    const theme = useTheme();
    const { id, type, source, target } = edge;

    const sourceAnchor = calculateAnchorPoints(source.node, dimension);
    const targetAnchor = calculateAnchorPoints(target.node, dimension);

    const sourcePoint = source.anchorType
        ? sourceAnchor[source.anchorType]
        : source.node.point;
    const targetPoint = target.anchorType
        ? targetAnchor[target.anchorType]
        : target.node.point;

    return (
        <g id={id} data-type="graph-edge">
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="5"
                    markerHeight="5"
                    refX="5"
                    refY="2.5"
                    orient="auto"
                >
                    <path
                        d="M 0 0 L 5 2.5 L 0 5 Z"
                        fill={theme.palette.text.primary}
                    />
                </marker>
            </defs>
            <line
                x1={sourcePoint.x}
                y1={sourcePoint.y}
                x2={targetPoint.x}
                y2={targetPoint.y}
                stroke={theme.palette.text.primary}
                strokeWidth={2}
                markerEnd={type === 'arrow' ? 'url(#arrowhead)' : ''}
            />
        </g>
    );
};
