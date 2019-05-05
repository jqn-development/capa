import React from 'react';
import { Input } from 'react-native-elements';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Colors, InputField } from '../../styles';

const renderEmail = ({ input: { onChange }, ...restInput }) => {
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
    const { inputContainerStyle, placeholder } = props;

    return (
        <Field
            inputContainerStyle={inputContainerStyle}
            label="EMAIL"
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
