import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

interface Props {
    children?: React.ReactNode;
}

export const AutoCompleteContext = createContext([]);
export const AutoCompleteDispatchContext = createContext([]);

function useAutoCompleteDispatch() {
    const context = React.useContext(AutoCompleteDispatchContext);
    if (context === undefined) {
        throw new Error('Must be used within a Provider');
    }
    return context;
}
export const CapaAutoCompleteProvider: React.FunctionComponent<Props> = props => {
    const [suggestions, setSuggestions] = useState([]);
    const [input, setInput] = useState(props.input);
    const [form, setForm] = useState({});
    const [editMode, setEditMode] = useState(false);
    const { children } = props;
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
        <AutoCompleteContext.Provider value={{ suggestions, input, setInput, editMode, setEditMode, form, setForm }}>
            <AutoCompleteDispatchContext.Provider value={{ fetchSuggestions }}>
                {children}
            </AutoCompleteDispatchContext.Provider>
        </AutoCompleteContext.Provider>
    );
};

CapaAutoCompleteProvider.propTypes = { children: PropTypes.node.isRequired };
export { useAutoCompleteDispatch };
