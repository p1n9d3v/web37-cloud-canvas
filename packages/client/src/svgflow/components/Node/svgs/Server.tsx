import { Dimension } from '@svgflow/types';
import { ComponentProps } from 'react';

const Node3D = (props: ComponentProps<'svg'>) => {
    return (
        <svg {...props}>
            <path
                fill="#79aae4"
                d="M64 74v37l64-37V37L64 74Z"
                fillRule="evenodd"
            ></path>
            <path
                fill="#a4c5ec"
                d="M0 37v37l64 37V74L0 37Z"
                fillRule="evenodd"
            ></path>
            <path
                fill="#cee0f5"
                d="M0 37 64 0l64 37-64 37L0 37Z"
                fillRule="evenodd"
            ></path>
            <path
                fill="#2a75cd"
                d="m64 73.407 62.111-35.86.514.889-62.487 36.078h-.276L.743 38.072l.514-.89L64 73.407Z"
                fillRule="evenodd"
            ></path>
            <path fill="#2a75cd" d="M63.486 74h1.027v36h-1.027z"></path>
            <path
                fill="#000000"
                d="M128 37v37l-64 37L0 74V37L64 0l64 37ZM2.054 38.185v34.63L64 108.627l61.946-35.812v-34.63L64 2.373 2.054 38.185Z"
                fillRule="evenodd"
            ></path>
            <path
                fill="#0078d4"
                d="m76.36 51.73-.111-14.286 24.252.024c.684.001 1.234-.319 1.232-.711l-.017-2.233h-.002c-.002-.396-.56-.716-1.239-.717l-28.091-.029c-1.038 0-1.92.369-2.283.891a.941.941 0 0 0-.209.572l.128 16.482c.002.395.56.714 1.239.716l3.868.004c.684.001 1.234-.319 1.232-.711l.002-.004ZM58.589 39.632l-.047-16.22c-.002-.395-.555-.714-1.239-.716l-3.868-.01c-.684-.001-1.234.316-1.232.711l.04 14-24.743-.064c-.684-.001-1.234.316-1.232.711l.007 2.236c.002.395.555.714 1.239.716l28.548.074c.356 0 .686-.045.994-.122.902-.211 1.54-.719 1.537-1.317h-.005Z"
            ></path>
        </svg>
    );
};

const Node2D = (props: ComponentProps<'svg'>) => (
    <svg viewBox="0 0 24 24" {...props}>
        <rect x="2" y="4" width="20" height="7" fill="#aecbfa" />
        <rect x="20" y="4" width="2" height="7" fill="#669df6" />
        <polygon points="22 4 20 4 20 11 22 4" fill="#4285f4" />
        <rect x="2" y="4" width="2" height="7" fill="#669df6" />
        <rect x="6" y="7" width="6" height="1" fill="#ffffff" />
        <rect x="15" y="6" width="3" height="3" rx="1.5" fill="#ffffff" />
        <rect x="2" y="13" width="20" height="7" fill="#aecbfa" />
        <rect x="20" y="13" width="2" height="7" fill="#669df6" />
        <polygon points="22 13 20 13 20 20 22 13" fill="#4285f4" />
        <rect x="2" y="13" width="2" height="7" fill="#669df6" />
        <rect x="6" y="16" width="6" height="1" fill="#ffffff" />
        <rect x="15" y="15" width="3" height="3" rx="1.5" fill="#ffffff" />
    </svg>
);
export default ({
    dimension,
    ...props
}: ComponentProps<'svg'> & { dimension: Dimension }) =>
    dimension === '2d' ? <Node2D {...props} /> : <Node3D {...props} />;
