import React from 'react';
import { Field } from 'formik';
import { Input } from 'react-native-elements';
import { Colors, InputField } from '../../styles';

const renderField = ({
    field, // { name, value, onChange, onBlur }
    ...props
}: {
    field: object;
}) => {
    return (
        <Input
            placeholderTextColor="white"
            inputContainerStyle={[InputField.input, InputField.inputUnderline]}
            containerStyle={[InputField.inputContainer]}
            inputStyle={[Colors.whiteText]}
            {...field}
            {...props}
        />
    );
};

const EmailField = props => {
    return <Field component={renderField} {...props} />;
};

export default EmailField;
