export default ({ points }: { points: string }) => {
    return (
        <g>
            <pattern
                id="gridPatternMajor"
                x="0"
                y="0"
                width="90"
                height="90"
                patternUnits="userSpaceOnUse"
            >
                <path
                    d="M 0 0 L 90 0 90 90 0 90 z"
                    stroke="#54626f"
                    strokeWidth="1"
                    fill="none"
                ></path>
            </pattern>
            <polygon points={points} fill="url(#gridPatternMajor)"></polygon>
        </g>
    );
};
