import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { Colors, Container, InputField } from '../styles';
import { string } from 'prop-types';

interface AutoCompleteProps {
    suggestions: any;
}
function Item({ film }) {
    return (
        <View>
            <Text style={{ color: 'white' }}>{film.name}</Text>
        </View>
    );
}

const CapaAutoComplete: React.FunctionComponent<AutoCompleteProps> = (props: AutoCompleteProps) => {
    const { suggestions } = props;
    const [input, setInput] = useState('');
    return (
        <View>
            <Input
                placeholderTextColor="white"
                inputContainerStyle={[InputField.input, InputField.inputUnderline]}
                containerStyle={[InputField.inputContainer]}
                inputStyle={[Colors.whiteText, InputField.inputText]}
                value={input}
                onChange={event => setInput(event.target.value)}
            />
            <FlatList
                data={suggestions.filter(d => input === '' || d.includes(input))}
                renderItem={({ item }) => <Item film={item} />}
                keyExtractor={item => item.id}
            />
            {suggestions &&
                Object.keys(suggestions).map(function(key) {
                    return <Text key={key} style={{ color: 'white' }}> {suggestions[key].name} </Text>;
                })}
            <Text style={{ color: 'white' }}>Hello: {suggestions.length}</Text>
        </View>
    );
};

export default CapaAutoComplete;
