import React, { useEffect } from 'react';

function useDetectClickOutside(ref: React.RefObject<any>, onClickOutside: () => void) {
    useEffect(() => {
        if (ref) {
            const handleClickOutside = (event: any) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    onClickOutside();
                }
            };

            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [ref, onClickOutside]);
}

export default useDetectClickOutside;
