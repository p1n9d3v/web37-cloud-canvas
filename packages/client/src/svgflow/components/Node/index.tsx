import { useTheme } from '@mui/material';
import Anchor from '@svgflow/components/Anchor';
import Server from '@svgflow/components/Node/svgs/Server';
import { GRID_SIZE } from '@svgflow/constants';
import { useEdgeContext } from '@svgflow/contexts/EdgeContext';
import { AnchorType, Dimension, Edge, Node, Point } from '@svgflow/types';
import { calculateAnchorPoints, getNodeSizeForDimension } from '@svgflow/utils';
import { createElement, memo, MouseEvent, useMemo } from 'react';

type Props = {
    node: Node;
    // visibleEdges: Edge[];
    dimension: Dimension;
    isSelected: boolean;
    onStartDragNode: (nodeId: string, point: Point) => void;
    onSelectNode: (nodeId: string) => void;
};

const getNodeComponent = (type: string) => {
    switch (type) {
        case 'server':
            return Server;
        default:
            return () => (
                <rect width={GRID_SIZE} height={GRID_SIZE} fill="gray" />
            );
    }
};

export default memo(
    ({ node, dimension, isSelected, onStartDragNode, onSelectNode }: Props) => {
        const theme = useTheme();
        const { id, type, point } = node;
        const { width, height } = getNodeSizeForDimension(dimension);

        const {
            state: { edges },
        } = useEdgeContext();

        const connectedAnchors: AnchorType[] = useMemo(
            () =>
                edges
                    .filter((edge) => {
                        return edge.sourceId === id;
                    })
                    .map((edge) => edge.sourceAnchorType),
            [edges]
        );

        //TODO: 화면에 보이는 edge에 관련해서 찾을지 고민.. 이렇게 하면 zoom/pan에서 너무 많은 리렌더링이 발생함
        //
        // const connectedAnchors: AnchorType[] = useMemo(
        //     () =>
        //         visibleEdges
        //             .filter((edge) => {
        //                 return edge.sourceId === id;
        //             })
        //             .map((edge) => edge.sourceAnchorType),
        //     [visibleEdges]
        // );

        const anchors = calculateAnchorPoints(
            {
                x: 0,
                y: 0,
            },
            dimension
        );

        const handleMouseDown = (event: MouseEvent) => {
            event.stopPropagation();
            const { clientX, clientY } = event;
            onStartDragNode(id, {
                x: clientX,
                y: clientY,
            });
        };

        const handleDbClick = () => {
            onSelectNode(id);
        };

        return (
            <g
                id={id}
                style={{ transform: `translate(${point.x}px, ${point.y}px)` }}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDbClick}
            >
                {createElement(getNodeComponent(type), {
                    dimension,
                    width,
                    height,
                })}

                {dimension === '2d' && (
                    <rect
                        width={width}
                        height={height}
                        fill="none"
                        stroke={theme.palette.primary.main}
                        strokeWidth="2"
                        stroke-dasharray={isSelected ? '10,5' : undefined}
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            from="0"
                            to="15"
                            dur="1.5s"
                            repeatCount="indefinite"
                        />
                    </rect>
                )}

                {Object.entries(anchors).map(([anchorType, point]) => (
                    <Anchor
                        key={`${id}-${anchorType}`}
                        cx={point.x}
                        cy={point.y}
                        visible={
                            connectedAnchors.includes(
                                anchorType as AnchorType
                            ) || isSelected
                        }
                    />
                ))}
            </g>
        );
    }
);
