import { useTheme } from '@mui/material';

type LoadingSpinnerNodeProps = {
    width: number;
    height: number;
};

export default ({ width, height }: LoadingSpinnerNodeProps) => {
    const theme = useTheme();
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke={theme.palette.primary.main}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="31.415, 31.415"
                transform="rotate(-90 25 25)"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
};
