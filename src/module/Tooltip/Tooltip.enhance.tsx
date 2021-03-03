import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { useDispatch } from 'react-redux';
import useOutsideRef from 'src/hooks/useDetectClickOutside';
import { ITooltipProps } from './Tooltip.interface';
import { actionRemoveTooltip } from './Tooltip.actions';

/**
 * Get first scrollable parent
 * Thank to twxia (https://gist.github.com/twxia/bb20843c495a49644be6ea3804c0d775)
 * @param node
 */
function getScrollParent(node: any): HTMLElement | null | any {
    const isElement = node instanceof HTMLElement;
    const overflowY = isElement && window.getComputedStyle(node).overflowY;
    const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

    if (!node) {
        return null;
    }
    if (isScrollable && node.scrollHeight >= node.clientHeight) {
        return node;
    }

    if (node.parentNode) {
        return getScrollParent(node.parentNode);
    }

    return document.body;
}

const enhance = (WrappedComponent: React.FunctionComponent<ITooltipProps>) => (props: ITooltipProps) => {
    const [tooltipPosition, setTooltipPosition] = useState<any>({});
    const { data } = props;
    const { id, text, timeout, ref, width, height, margin } = data;
    const dispatch = useDispatch();

    const handleClickOutsideRef = () => {
        dispatch(actionRemoveTooltip(id));
    };

    useOutsideRef(ref, handleClickOutsideRef);

    useEffect(() => {
        if (timeout && timeout > 0) {
            const parentScrollView = getScrollParent(ref.offsetParent);
            const timeoutTimer = setTimeout(() => {
                dispatch(actionRemoveTooltip(id));
            }, timeout * 1000);

            const handleRemoveTooltipOnScroll = () => {
                dispatch(actionRemoveTooltip(id));
                clearTimeout(timeoutTimer);
                parentScrollView.removeEventListener('scroll', handleRemoveTooltipOnScroll);
            };

            parentScrollView.addEventListener('scroll', handleRemoveTooltipOnScroll);

            return () => {
                parentScrollView.removeEventListener('scroll', handleRemoveTooltipOnScroll);
                clearTimeout(timeoutTimer);
            };
        }
    }, [id]);

    useEffect(() => {
        if (text && ref && width && height) {
            const refRect = ref.getBoundingClientRect();
            const { bottom, left, right } = refRect;
            const middle = (left + right) / 2;
            setTooltipPosition({
                width,
                top: bottom + margin,
                bottom: bottom + height,
                left: middle - width / 2,
                right: middle + width / 2,
            });
        }
    }, [text, ref, width, height]);

    return <WrappedComponent {...props} tooltipPosition={tooltipPosition} />;
};

export default compose<ITooltipProps, any>(enhance);
