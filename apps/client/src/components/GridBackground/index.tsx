import { useGraphCanvasContext } from '@contexts/GraphCanvas';
import { useGraphDimensionContext } from '@contexts/GraphDimensionContext';
import GridPatternMajor from './patterns/GridPatternMajor';
import GridPatternMinor from './patterns/GridPatternMinor';

export default () => {
    const { dimension } = useGraphDimensionContext();
    const { viewBox } = useGraphCanvasContext();
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
