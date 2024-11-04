import LinePattern from '@components/Background/LinePattern';
import SubLinePattern from '@components/Background/SubLinePattern';

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
