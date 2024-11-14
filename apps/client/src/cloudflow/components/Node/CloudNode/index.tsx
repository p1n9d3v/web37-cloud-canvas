import Anchor from '@cloudflow/components/Anchor';
import Server from '@cloudflow/components/Node/CloudNode/Server';
import { useEdgeContext } from '@cloudflow/contexts/EdgeContext';
import { AnchorType, CloudNodeType, Dimension } from '@cloudflow/types';
import { calculateAnchorPoints } from '@cloudflow/utils';
import { useTheme } from '@mui/material';
import { createElement, useMemo } from 'react';

const cloudNodeFactory = (type: CloudNodeType) => {
    switch (type) {
        case 'server':
            return Server;
        default:
            return () => <></>;
    }
};

type Props = {
    nodeId: string;
    type: CloudNodeType;
    width: number;
    height: number;
    dimension: Dimension;
    isSelected: boolean;
    onStartConnect: (anchorType: AnchorType) => void;
};

export default ({
    nodeId,
    type,
    width,
    height,
    dimension,
    isSelected,
    onStartConnect,
}: Props) => {
    const theme = useTheme();

    const {
        state: { edges },
    } = useEdgeContext();

    const connectedAnchors = useMemo(
        () =>
            edges
                .filter((edge) => {
                    return edge.source.id === nodeId;
                })
                .map((edge) => edge.source.anchorType),
        [edges],
    );

    const anchors = calculateAnchorPoints(
        {
            x: 0,
            y: 0,
        },
        dimension,
    );

    return (
        <>
            {createElement(cloudNodeFactory(type), {
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
                    strokeDasharray={isSelected ? '10,5' : undefined}
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
                    key={`${nodeId}-${anchorType}`}
                    cx={point.x}
                    cy={point.y}
                    color={theme.palette.text.primary}
                    visible={
                        connectedAnchors.includes(anchorType as AnchorType) ||
                        isSelected
                    }
                    onStartConnect={() =>
                        onStartConnect(anchorType as AnchorType)
                    }
                />
            ))}
        </>
    );
};
