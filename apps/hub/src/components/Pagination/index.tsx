import { LeftArrowIcon } from './LeftArrowIcon';
import { RightArrowIcon } from './RightArrowIcon';

export const Pagination = () => {
    const data = [1, 2, 3];
    return (
        <div className="flex w-fit mx-auto justify-center items-center">
            <button className="px-3 h-9">
                <LeftArrowIcon />
            </button>
            {data.map((item) => (
                <button key={item} className="px-3 h-9">
                    {item}
                </button>
            ))}
            <button className="h-9 px-3">
                <RightArrowIcon />
            </button>
        </div>
    );
};
