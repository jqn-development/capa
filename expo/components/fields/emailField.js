import React from 'react';
import { Input } from 'react-native-elements';
import { Text } from 'react-native';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Colors, InputField } from '../../styles';

const renderEmail = ({ input: { onChange }, meta: { touched, error, warning }, ...restInput }) => {
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

export default function emailField(props) {
    const { inputContainerStyle, placeholder, email } = props;

    return (
        <Field
            inputContainerStyle={inputContainerStyle}
            label="EMAIL"
            placeholder={placeholder}
            labelStyle={InputField.inputLabel}
            name="email"
            validate={email}
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
