import { useDimensionContext } from '@contexts/DimensionContext';
import { Bounds } from '@types';

type Props = {
    bounds: Bounds;
    color: string;
    text?: string;
};
export default ({ bounds, color, text }: Props) => {
    const { dimension } = useDimensionContext();
    const rectX = bounds.width - (dimension === '2d' ? 270 : 180);
    const rectY = 30;
    const rectWidth = 255;
    const rectHeight = 72;

    const centerX = rectX + rectWidth / 2;
    const centerY = rectY + rectHeight / 2;

    const transform =
        dimension === '2d' ? '' : 'matrix(0.707 0.409 -0.707 0.409 0 0)';
    return (
        <svg overflow="visible">
            <rect
                transform={transform}
                x={rectX}
                y={rectY}
                rx="12"
                ry="12"
                width={rectWidth}
                height={rectHeight}
                fill={color}
                opacity="0.8"
            ></rect>
            <g fontWeight="bold" fontSize="40pt" fill="#fff">
                <text
                    transform={transform}
                    x={centerX}
                    y={centerY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ pointerEvents: 'none' }}
                >
                    <tspan>{text ?? ''}</tspan>
                </text>
            </g>
        </svg>
    );
};
