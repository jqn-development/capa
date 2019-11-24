import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { Item } from '../components/CapaAutoComplete';

interface Props {
    children?: React.ReactNode;
}

interface AutoCompleteContext {
    editMode: boolean;
    setEditMode(delta: boolean): void;
    mapMode: boolean;
    setMapMode(delta: boolean): void;
    form: FormValues;
    setForm(delta: object): void;
    active: string;
    setActive(delta: string): void;
    activeUrl: string;
    setActiveUrl(delta: string): void;
}

interface FormValues {
    [key: string]: Item;
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
    const [form, setForm] = useState<FormValues>({
        film: { name: '' },
        gear: { name: '' },
        location: { name: '' },
    });
    const [editMode, setEditMode] = useState(false);
    const [mapMode, setMapMode] = useState(false);
    const [active, setActive] = useState('');
    const [activeUrl, setActiveUrl] = useState('');
    const { children } = props;

    return (
        <AutoCompleteContext.Provider
            value={{
                editMode,
                setEditMode,
                mapMode,
                setMapMode,
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
