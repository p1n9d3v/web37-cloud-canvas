import {
    GRID_2D_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
} from '@constants';
import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import { Bounds } from '@types';

type Props = {
    bounds: Bounds;
};

const Region3D = ({ bounds }: Props) => {
    const width = bounds.width * (GRID_3D_WIDTH_SIZE / GRID_2D_SIZE);
    const height = bounds.height * (GRID_3D_HEIGHT_SIZE / GRID_2D_SIZE);

    const points = `${width / 2} 0, ${width} ${height / 2}, ${width / 2} ${height}, 0 ${height / 2}`;
    return (
        <polygon
            points={points}
            stroke="#e64a19"
            strokeWidth="8"
            fill="none"
        ></polygon>
    );
};

const Region2D = ({ bounds }: Props) => {
    const points = `0 0, 0 ${bounds.height}, ${bounds.width} ${bounds.height}, ${bounds.width} 0`;
    return (
        <polygon
            points={points}
            stroke="#ffa000"
            strokeWidth="8"
            fill="none"
        ></polygon>
    );
};

export default ({ bounds }: Props) => {
    const { dimension } = useCanvasDimensionContext();
    return dimension === '2d' ? (
        <Region2D bounds={bounds} />
    ) : (
        <Region3D bounds={bounds} />
    );
};
