type Props = {
    selected: boolean;
};
export default ({ selected }: Props) => {
    if (!selected) return;

    return (
        <svg width="90" height="90">
            <rect
                height="90"
                width="90"
                style={{
                    strokeWidth: 4,
                    stroke: 'rgb(66, 134, 197)',
                    fill: 'none',
                }}
            ></rect>
        </svg>
    );
};
