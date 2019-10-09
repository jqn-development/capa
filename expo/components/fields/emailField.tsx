import React from 'react';
import { Input } from 'react-native-elements';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Colors, InputField } from '../../styles';

interface Props {
    input: { onChange: (text: string) => void };
}

const renderEmail = ({ input: { onChange }, ...restInput }: Props) => {
    return (
        <Input
            testID="email"
            placeholderTextColor="white"
            inputStyle={[Colors.whiteText, InputField.inputText]}
            onChangeText={onChange}
            {...restInput}
        />
    );
};

renderEmail.propTypes = {
    input: PropTypes.shape({}).isRequired,
};

interface FieldProps {
    inputContainerStyle: object;
    placeholder: string;
    label: string;
}

export default function emailField(props: FieldProps) {
    const { inputContainerStyle, placeholder, label } = props;

    return (
        <Field
            inputContainerStyle={inputContainerStyle}
            label={label}
            placeholder={placeholder}
            labelStyle={InputField.inputLabel}
            name="email"
            component={renderEmail}
        />
    );
}

emailField.propTypes = {
    inputContainerStyle: PropTypes.shape({}).isRequired,
    placeholder: PropTypes.string,
};

emailField.defaultProps = {
    placeholder: '',
};
