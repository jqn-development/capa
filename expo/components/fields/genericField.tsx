import React from 'react';
import { Input } from 'react-native-elements';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Colors, InputField } from '../../styles';

interface Props {
    input: { onChange: (text: string) => void; };
}

const renderField = ({ input: { onChange }, ...restInput }: Props) => {
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

interface FieldProps {
    inputContainerStyle: object;
    name: string;
    label: string;
}
export default function genericField(props: FieldProps) {
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
