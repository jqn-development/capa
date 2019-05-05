import React from 'react';
import { Input } from 'react-native-elements';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Colors, InputField } from '../../styles';

const renderField = ({ input: { onChange }, ...restInput }) => {
    return (
        <Input
            placeholderTextColor="white"
            inputStyle={[Colors.whiteText, InputField.inputText]}
            onChangeText={onChange}
            {...restInput}
        />
    );
};

renderField.propTypes = {
    input: PropTypes.shape({}).isRequired,
};

export default function genericField(props) {
    const { inputContainerStyle, name, label } = props;

    return (
        <Field
            label={label}
            inputContainerStyle={inputContainerStyle}
            labelStyle={InputField.inputLabel}
            name={name}
            component={renderField}
        />
    );
}

genericField.propTypes = {
    inputContainerStyle: PropTypes.shape({}).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};
