import React from 'react';

const useOutsideRef = (ref: any, callback?: () => any) => {
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref && !ref.contains(event.target)) {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
};

export default useOutsideRef;
