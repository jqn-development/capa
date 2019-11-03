import React from 'react';
import uuid4 from 'uuid';

function debounce(func: () => any, wait: number, immediate?: boolean) {
    let timeout: any;

    const executedFunction = function(this: any) {
        const context = this;
        const args: any = arguments;

        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args)
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };

    executedFunction.clear = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return executedFunction;
}

const initialState = {
    results: [],
    isLoading: false,
    error: null,
};

const reducer = (
    state: any,
    action: {
        type: string;
        payload?: any;
    }
) => {
    // All cases, beside 'LOADING', are status codes provided from Google Autocomplete API's response.
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'OK':
            return {
                ...state,
                results: action.payload.data,
                isLoading: false,
                error: null,
            };
        case 'ZERO_RESULTS':
            return {
                ...state,
                results: [],
                isLoading: false,
                error: null,
            };
        case 'INVALID_REQUEST':
            return {
                ...state,
                isLoading: false,
                error: null,
            };
        case 'REQUEST_DENIED':
            return {
                ...state,
                isLoading: false,
                error: `Invalid 'key' parameter`,
            };
        case 'UNKNOWN_ERROR':
            return {
                ...state,
                isLoading: false,
                error: `Unknown error, refresh and try again.`,
            };
        default:
            return state;
    }
};
interface Props {
    apiKey: string;
    query: string;
    type: string;
    options: any;
}
export default function useGoogleAutocomplete({
    apiKey,
    query,
    type = 'places',
    options = {},
}: Props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const sessionToken = React.useRef<string>(uuid4());
    const sessionTokenTimeout = React.useRef<any>();

    // AbortController to cancel window.fetch requests if component unmounts.
    const abortController = React.useRef<any>();
    const abortSignal = React.useRef<any>();

    const resetSessionToken = () => {
        sessionToken.current = uuid4();
    };

    React.useEffect(() => {
        // Setup a timer to reset our session_token every 3 minutes.
        sessionTokenTimeout.current = setInterval(resetSessionToken, 180000);
        // Setup an AbortController to cancel all http requests on unmount.
        //abortController.current = new AbortController();
        //abortSignal.current = abortController.current.signal;

        // Cleanup clearInterval and abort any http calls on unmount.
        return () => {
            clearInterval(sessionTokenTimeout.current);
            //abortController.current.abort();
        };
    }, []);

    const initialRender = React.useRef<boolean>(false);
    // Debounce our search to only trigger an API call when user stops typing after (n)ms.
    const debouncedFn = React.useRef<any>();

    // Effect triggers on every query change.
    React.useEffect(() => {
        if (initialRender.current === false) {
            initialRender.current = true;
            return;
        }
        // Cancel previous debounced call.
        //if (debouncedFn.current) debouncedFn.current.clear();

        if (!state.isLoading) {
            dispatch({
                type: 'LOADING',
            });
        }
        debouncedFn.current = debounce(() => {
            const types = options.types && type === 'places' ? `&types=${options.types}` : '';
            const strictbounds = options.strictbounds && types === 'places' ? `&strictbounds` : '';
            const offset = options.offset && type === 'query' ? `&offset=${options.offset}` : '';
            const language = options.language ? `&language=${options.language}` : '';
            const location = options.location ? `&location=${options.location}` : '';
            const radius = options.radius ? `&radius=${options.radius}` : '';

            const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}${types}${language}${location}${radius}${strictbounds}${offset}&key=${apiKey}&sessiontoken=${sessionToken.current}`;
            fetch(url, { signal: abortSignal.current })
                .then(data => data.json())
                .then(data => {
                    dispatch({
                        type: data.status,
                        payload: {
                            data,
                        },
                    });
                })
                .catch(() => {
                    // Our AbortController was cancelled on unmount and API call was cancelled.
                });
        }, 400);

        debouncedFn.current();
    }, [
        query,
        apiKey,
        options.types,
        options.language,
        options.location,
        options.radius,
        options.strictbounds,
        options.offset,
        type,
    ]);
    return {
        results: state.results,
        isLoading: state.isLoading,
        error: state.error,
    };
}
