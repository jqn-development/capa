import React from 'react';
import { Input } from 'react-native-elements';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import { Colors, InputField } from '../../styles';

interface Props {
    input: object;
}

const renderPassword = ({ input }: Props) => {
    return (
        <Input
            testID="password"
            placeholder=""
            placeholderTextColor="white"
            inputStyle={[Colors.whiteText, InputField.inputText]}
            {...input}
        />
    );
};

renderPassword.propTypes = {
    input: PropTypes.shape({}).isRequired,
};

interface FieldProps {
    inputContainerStyle: object;
    placeholder: string;
    label: string;
}

export default function passwordField(props: FieldProps) {
    const { inputContainerStyle, placeholder, label } = props;

    return (
        <Field
            name="password"
            placeholder={placeholder}
            secureTextEntry
            label={label}
            labelStyle={InputField.inputLabel}
            inputContainerStyle={inputContainerStyle}
            component={renderPassword}
        />
    );
}

passwordField.propTypes = {
    inputContainerStyle: PropTypes.shape({}).isRequired,
    placeholder: PropTypes.string,
};

passwordField.defaultProps = {
    placeholder: '',
};
