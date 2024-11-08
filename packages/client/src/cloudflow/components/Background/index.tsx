import { Dimension, ViewBox } from '@cloudflow/types';
import GridPatternMajor from './patterns/GridPatternMajor';
import GridPatternMinor from './patterns/GridPatternMinor';

export default ({
    viewBox,
    showSubLines,
    dimension,
}: {
    viewBox: ViewBox;
    showSubLines: boolean;
    dimension: Dimension;
}) => {
    const { point, width, height } = viewBox;
    const pointsInfo = {
        topLeft: [point.x, point.y],
        topRight: [point.x + width, point.y],
        bottomRight: [point.x + width, point.y + height],
        bottomLeft: [point.x, point.y + height],
    };
    const points = Object.values(pointsInfo)
        .map((point) => point.join(','))
        .join(' ');

    return (
        <>
            {showSubLines && (
                <GridPatternMinor points={points} dimension={dimension} />
            )}
            <GridPatternMajor points={points} dimension={dimension} />
        </>
    );
};
