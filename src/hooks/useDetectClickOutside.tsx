import React from 'react';

const useOutsideRef = (ref: any, callback?: () => any) => {
    const listener = (event: MouseEvent) => {
        if (!ref || !ref?.current || typeof ref.current.getBoundingClientRect === 'undefined') {
            return;
        }
        const targetEl = ref.current;
        if (targetEl) {
            const clickedX = event.clientX;
            const clickedY = event.clientY;
            const rect = targetEl.getBoundingClientRect();
            const targetElTop = rect.top;
            const targetElBottom = rect.top + rect.height;
            const targetElLeft = rect.left;
            const targetElRight = rect.left + rect.width;
            if (
                // check X Coordinate
                targetElLeft < clickedX &&
                clickedX < targetElRight &&
                // check Y Coordinate
                targetElTop < clickedY &&
                clickedY < targetElBottom
            ) {
                return;
            }
            // trigger event when the clickedX,Y is outside of the targetEl
            if (typeof callback === 'function') {
                callback();
            }
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, callback]);
};

export default useOutsideRef;
