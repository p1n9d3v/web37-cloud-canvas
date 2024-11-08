import SvgCanvas from '@cloudflow/components/SvgCanvas';
import ZoomPan from '@cloudflow/components/ZoomPan';

export default () => {
    return (
        <ZoomPan>
            {({ viewBox }) => (
                <SvgCanvas viewBox={viewBox}>
                    <line x1="0" y1="0" x2="200" y2="200" stroke="white" />
                </SvgCanvas>
            )}
        </ZoomPan>
    );
};
