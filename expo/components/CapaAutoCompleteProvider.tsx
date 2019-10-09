import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

interface Props {
    children?: React.ReactNode;
}

// https://rjzaworski.com/2018/05/react-context-with-typescript
interface AutoCompleteContext {
    suggestions: Item[];
    setSuggestions(delta: Item[]): void;
    fetchSuggestions(): Promise<void>;
    input: string;
    setInput(delta: string): void;
    editMode: boolean;
    setEditMode(delta: boolean): void;
    form: object;
    setForm(delta: object): void;
    editType: string | null;
    setEditType(delta: string): void;
}
interface Item {
    id: string;
    name: string;
    avatar?: string;
}

export const AutoCompleteContext = createContext<AutoCompleteContext | null>(null);

export const useAutoCompleteContext = (): AutoCompleteContext => {
    const context = React.useContext(AutoCompleteContext) || null;
    if (context === null) {
        throw new Error('Must be used within a Provider');
    }
    return context;
};

export const CapaAutoCompleteProvider: React.FunctionComponent<Props> = props => {
    const [suggestions, setSuggestions] = useState<Item[]>([]);
    const [input, setInput] = useState('');
    const [form, setForm] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editType, setEditType] = useState('');
    const { children } = props;
    const fetchSuggestions = async () => {
        return Promise.resolve({
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
        <AutoCompleteContext.Provider
            value={{
                suggestions,
                fetchSuggestions,
                setSuggestions,
                input,
                setInput,
                editMode,
                setEditMode,
                editType,
                setEditType,
                form,
                setForm,
            }}
        >
            {children}
        </AutoCompleteContext.Provider>
    );
};

CapaAutoCompleteProvider.propTypes = { children: PropTypes.node.isRequired };
