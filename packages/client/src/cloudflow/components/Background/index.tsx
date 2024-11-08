import { ViewBox } from '@types';
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
    const pointsInfo = {
        topLeft: [viewBox.position.x, viewBox.position.y],
        topRight: [viewBox.position.x + viewBox.width, viewBox.position.y],
        bottomRight: [
            viewBox.position.x + viewBox.width,
            viewBox.position.y + viewBox.height,
        ],
        bottomLeft: [viewBox.position.x, viewBox.position.y + viewBox.height],
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
