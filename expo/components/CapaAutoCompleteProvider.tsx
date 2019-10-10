import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

interface Props {
    children?: React.ReactNode;
}

// https://rjzaworski.com/2018/05/react-context-with-typescript
interface AutoCompleteContext {
    editMode: boolean;
    setEditMode(delta: boolean): void;
    form: FormValues;
    setForm(delta: object): void;
    active: string | null;
    setActive(delta: string): void;
    activeUrl: string | null;
    setActiveUrl(delta: string): void;
}
interface Item {
    id: string;
    name: string;
    avatar?: string;
}
interface FormValues {
    [key: string]: string;
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
    const [form, setForm] = useState<FormValues>({});
    const [editMode, setEditMode] = useState(false);
    const [active, setActive] = useState('');
    const [activeUrl, setActiveUrl] = useState('');
    const { children } = props;

    return (
        <AutoCompleteContext.Provider
            value={{
                editMode,
                setEditMode,
                active,
                setActive,
                activeUrl,
                setActiveUrl,
                form,
                setForm,
            }}
        >
            {children}
        </AutoCompleteContext.Provider>
    );
};

CapaAutoCompleteProvider.propTypes = { children: PropTypes.node.isRequired };
