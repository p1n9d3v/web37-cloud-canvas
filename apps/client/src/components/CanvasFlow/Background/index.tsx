import { ViewBox } from '@types';
import LinePattern from './LinePattern';
import SubLinePattern from './SubLinePattern';

export default ({
    viewBox,
    showSubLines,
}: {
    viewBox: ViewBox;
    showSubLines: boolean;
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
            {showSubLines && <SubLinePattern points={points} />}
            <LinePattern points={points} />
        </>
    );
};
