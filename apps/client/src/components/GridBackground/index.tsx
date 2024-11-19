import { useCanvasContext } from '@contexts/CanvasContext';
import GridPatternMajor from './patterns/GridPatternMajor';
import GridPatternMinor from './patterns/GridPatternMinor';
import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';

export default () => {
    const { dimension } = useCanvasDimensionContext();
    const { viewBox } = useCanvasContext();
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
