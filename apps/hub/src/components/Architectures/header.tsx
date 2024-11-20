export const ArchitectureHeader = () => {
    const data = [
        {
            title: 'Architecture',
        },
        {
            title: 'AUTHOR',
        },
        {
            title: 'DATE',
        },
        {
            title: 'STARS',
        },
        {
            title: 'COST',
        },
        {
            title: 'IMPORTS',
        },
    ];

    // const handleSort = () => {
    //     // Sorting logic here
    // };

    return (
        <div className="bg-gray-50 flex border-b p-3 font-semibold">
            <div className="w-full">Architecture</div>
            <div className="flex items-center">
                <div className="w-24">Costs</div>
                <div className="w-24">Imports</div>
                <div className="w-24">Stars</div>
            </div>
            {/* {data.map((item) => (
                <div
                    key={item.title}
                    className="p-4 border-b cursor-pointer hover:bg-gray-100 text-left"
                >
                    {item.title}
                </div>
            ))} */}
        </div>
    );
};
