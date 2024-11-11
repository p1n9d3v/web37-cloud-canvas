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
    const { x, y, width, height } = viewBox;
    const points = [
        `${x},${y}`,
        `${x + width},${y}`,
        `${x + width},${y + height}`,
        `${x},${y + height}`,
    ].join(' ');

    return (
        <>
            {showSubLines && (
                <GridPatternMinor points={points} dimension={dimension} />
            )}
            <GridPatternMajor points={points} dimension={dimension} />
        </>
    );
};
