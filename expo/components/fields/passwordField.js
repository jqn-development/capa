import React from 'react';
import { Input } from 'react-native-elements';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Colors, InputField } from '../../styles';

const renderPassword = ({ input: { onChange }, ...restInput }) => {
    return (
        <Input
            testID="password"
            placeholder=""
            placeholderTextColor="white"
            inputStyle={[Colors.whiteText, InputField.inputText]}
            onChangeText={onChange}
            {...restInput}
        />
    );
};

renderPassword.propTypes = {
    input: PropTypes.shape({}).isRequired,
};

export default function passwordField(props) {
    const { inputContainerStyle, placeholder } = props;

    return (
        <Field
            name="password"
            placeholder={placeholder}
            secureTextEntry
            label="PASSWORD"
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
