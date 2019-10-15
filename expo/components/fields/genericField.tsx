import React from 'react';
import { Field } from 'formik';
import { Input } from 'react-native-elements';
import { Colors, InputField } from '../../styles';

interface FieldProps {
    inputContainerStyle: object;
    onChangeText: (e: string) => void;
    placeholder: string;
    label: string;
    name: string;
    value: string;
}
const renderField = ({
    field, // { name, value, onChange, onBlur }
    ...props
}: {
    field: object;
}) => {
    return (
        <Input
            placeholderTextColor="white"
            containerStyle={[InputField.inputContainerSmall]}
            inputStyle={[Colors.whiteText, InputField.inputText]}
            {...field}
            {...props}
        />
    );
};

const GenericField = (props: FieldProps) => {
    return (
        <Field
            labelStyle={[InputField.inputLabel, Colors.whiteText]}
            component={renderField}
            {...props}
        />
    );
};

export default GenericField;
