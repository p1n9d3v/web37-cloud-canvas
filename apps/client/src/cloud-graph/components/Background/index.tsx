import { Dimension, ViewBox } from '@cloud-graph/types';
import GridPatternMajor from './patterns/GridPatternMajor';
import GridPatternMinor from './patterns/GridPatternMinor';

export default ({
    viewBox,
    dimension,
}: {
    viewBox: ViewBox;
    dimension: Dimension;
}) => {
    const { x, y, width, height } = viewBox;
    const points = [
        `${x},${y}`,
        `${x + width},${y}`,
        `${x + width},${y + height}`,
        `${x},${y + height}`,
    ].join(' ');

    return (
        <>
            <GridPatternMinor points={points} dimension={dimension} />
            <GridPatternMajor points={points} dimension={dimension} />
        </>
    );
};
