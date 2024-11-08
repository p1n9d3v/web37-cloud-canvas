import Background from '@cloudflow/components/Background';
import SvgCanvas from '@cloudflow/components/SvgCanvas';
import ZoomPan from '@cloudflow/components/ZoomPan';

export default () => {
    return (
        <ZoomPan>
            {({ viewBox }) => (
                <SvgCanvas viewBox={viewBox}>
                    <Background viewBox={viewBox} dimension="3d" showSubLines />
                </SvgCanvas>
            )}
        </ZoomPan>
    );
};
