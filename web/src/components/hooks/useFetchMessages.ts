import { useEffect } from 'react';
import { getMessages, cleanMessages } from '../../store/message/actions';

let interval: NodeJS.Timeout;

const MESSAGE_REFRESH_DELAY = 5000;

export const useFetchMessages = (dispatch: any) => {
    useEffect(() => {
        interval = setInterval(() => {
            dispatch(getMessages());
        }, MESSAGE_REFRESH_DELAY);
        return () => {
            if (interval)
                clearInterval(interval);
            dispatch(cleanMessages());
        };
    }, [getMessages, cleanMessages]);
};
