export default ({ points }: { points: string }) => {
    return (
        <g>
            <pattern
                id="gridPatternMinor"
                x="0"
                y="0"
                width="90"
                height="90"
                patternUnits="userSpaceOnUse"
            >
                <path d="M 0 45 L 90 45" stroke="#eee" strokeWidth="1"></path>
                <path
                    d="M 45 0 L 45 90"
                    stroke="#eeeeee"
                    strokeWidth="1"
                ></path>
            </pattern>
            <polygon points={points} fill="url(#gridPatternMinor)"></polygon>
        </g>
    );
};
