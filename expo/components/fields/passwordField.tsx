import React from 'react';
import { Input } from 'react-native-elements';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Colors, InputField } from '../../styles';

interface IProps {
    input: { onChange: (text: string) => void; };
}

const renderPassword = ({ input: { onChange }, ...restInput }: IProps) => {
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

interface IFieldProps {
    inputContainerStyle: object
    placeholder: string,
    label: string,
}

export default function passwordField(props: IFieldProps) {
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
