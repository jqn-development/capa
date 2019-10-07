import React, { useState, createContext, useCallback } from 'react';
export const AutoCompleteContext = createContext([]);
export const AutoCompleteDispatchContext = createContext([]);

function useAutoCompleteDispatch() {
    const context = React.useContext(AutoCompleteDispatchContext);
    if (context === undefined) {
        throw new Error('Must be used within a Provider');
    }
    return context;
}

export const CapaAutoCompleteProvider = ({ children }) => {
    const [suggestions, setSuggestions] = useState([]);
    const fetchSuggestions = async () => {
        Promise.resolve({
            suggestions: [
                {
                    id: 'test',
                    name: 'ILFORD DELTA 100',
                    avatar: 'http://i.imgur.com/9Ttuw8c.jpg',
                },
                {
                    id: 'ilf12',
                    name: 'ILFORD HP5',
                    avatar: 'http://i.imgur.com/9Ttuw8c.jpg',
                },
                {
                    id: 'kodak232',
                    name: 'KODAK PORTRA 100',
                    avatar: 'http://i.imgur.com/9Ttuw8c.jpg',
                },
            ],
        }).then(data => {
            setSuggestions(data.suggestions);
        });
    };

    return (
        <AutoCompleteContext.Provider value={{ suggestions }}>
            <AutoCompleteDispatchContext.Provider value={{fetchSuggestions}}>
                {children}
            </AutoCompleteDispatchContext.Provider>
        </AutoCompleteContext.Provider>
    );
};

export { useAutoCompleteDispatch };
