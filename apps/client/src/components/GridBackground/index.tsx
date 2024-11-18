import { useCloudGraphContext } from '@contexts/CloudGraph';
import { Dimension } from '@types';
import GridPatternMajor from './patterns/GridPatternMajor';
import GridPatternMinor from './patterns/GridPatternMinor';

export default ({ dimension }: { dimension: Dimension }) => {
    const { viewBox } = useCloudGraphContext();
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
