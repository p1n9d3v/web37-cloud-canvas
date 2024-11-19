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
            <div className="basis-7/12">Architecture</div>
            <div className="flex flex-grow justify-end items-center text-right">
                <div>Costs</div>
                <div className="w-32">Stars</div>
                <div className="w-32">Imports</div>
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
