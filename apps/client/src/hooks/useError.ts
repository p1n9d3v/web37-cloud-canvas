import { useState } from 'react';

export default () => {
    const [error, setError] = useState<Error | null>(null);

    if (error) {
        throw error; // 렌더링 흐름에서 Error Boundary로 전달
    }

    const handleError = (callback: () => void) => {
        try {
            callback();
        } catch (err) {
            setError(err as Error);
        }
    };

    return { handleError };
};
