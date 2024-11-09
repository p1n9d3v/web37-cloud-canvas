import { ComponentProps } from 'react';

export default (props: ComponentProps<'svg'>) => (
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
