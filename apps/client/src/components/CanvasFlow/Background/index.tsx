import LinePattern from './LinePattern';
import SubLinePattern from './SubLinePattern';

export default ({
    points,
    showSubLines,
}: {
    points: string;
    showSubLines: boolean;
}) => {
    return (
        <>
            {showSubLines && <SubLinePattern points={points} />}
            <LinePattern points={points} />
        </>
    );
};
