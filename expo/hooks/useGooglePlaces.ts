import React from 'react';
import uuid4 from 'uuid';

interface State {
    results?: object[] | [];
    isLoading: boolean;
    error: null | string;
}

interface ReducerAction {
    type: string;
    payload?: { data: object[] };
    results?: object[];
    isLoading?: boolean;
    error?: null;
}

interface Options {
    query: string;
    types: string;
    language: string;
    location: string;
    radius: string;
    strictbounds: string;
    offset: string;
}
interface Props {
    apiKey: string;
    query: string;
    type: string;
    options: Options;
}

function debounce(func: () => void, wait: number, immediate?: boolean) {
    let timeout: NodeJS.Timeout | null;

    const executedFunction = function(this: object) {
        const context = this;
        // eslint-disable-next-line
        const args: any = arguments;

        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };

    executedFunction.clear = function() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = null;
    };

    return executedFunction;
}

const initialState: State = {
    results: [],
    isLoading: false,
    error: null,
};

const reducer = (state: State, action: ReducerAction) => {
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
                results: action.payload && action.payload.data,
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

export default function useGoogleAutocomplete({ apiKey, query, type = 'places', options }: Props) {
    const [state, dispatch] = React.useReducer<React.Reducer<State, ReducerAction>>(
        reducer,
        initialState
    );
    const sessionToken = React.useRef<string>(uuid4());
    const sessionTokenTimeout = React.useRef<NodeJS.Timeout>();

    const resetSessionToken = () => {
        sessionToken.current = uuid4();
    };

    React.useEffect(() => {
        // Setup a timer to reset our session_token every 3 minutes.
        sessionTokenTimeout.current = global.setInterval(resetSessionToken, 180000);
        // Cleanup clearInterval and abort any http calls on unmount.
        return () => {
            if (sessionTokenTimeout.current) {
                global.clearInterval(sessionTokenTimeout.current);
            }
        };
    }, []);

    const initialRender = React.useRef<boolean>(false);
    // Debounce our search to only trigger an API call when user stops typing after (n)ms.
    const debouncedFn = React.useRef<() => void>();

    // Effect triggers on every query change.
    React.useEffect(() => {
        if (initialRender.current === false) {
            initialRender.current = true;
            return;
        }
        // Cancel previous debounced call.
        if (debouncedFn.current) {
            // @ts-ignore
            debouncedFn.current.clear();
        }

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
            fetch(url)
                .then(data => data.json())
                .then(data => {
                    dispatch({
                        type: data.status,
                        payload: {
                            data,
                        },
                    });
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
        state.isLoading,
    ]);
    const getPlaceDetails = (
        placeId: string,
        placeDetailOptions: {
            fields?: string[];
            region?: string;
            language?: string;
        } = {}
    ) => {
        const fields = placeDetailOptions.fields
            ? `&fields=${placeDetailOptions.fields.join(',')}`
            : '';
        const region = placeDetailOptions.region ? `&region=${placeDetailOptions.region}` : '';
        // If no options are passed, we'll default to closured language option.
        const language = placeDetailOptions.language
            ? `&language=${placeDetailOptions.language}`
            : options.language
            ? `&language=${options.language}}`
            : '';
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}${fields}${region}${language}&key=${apiKey}&sessiontoken=${sessionToken.current}`;
        return fetch(url)
            .then(data => data.json())
            .then(data => {
                // Reset session token after we make a Place Details query.
                resetSessionToken();
                return data;
            })
            .catch(() => {
                // Component unmounted and API call cancelled.
            });
    };

    return {
        results: state.results,
        isLoading: state.isLoading,
        error: state.error,
        getPlaceDetails,
    };
}
