import React, { useState } from 'react';
// @ts-ignore
import { vw } from 'react-native-expo-viewport-units';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { Colors, Container, InputField } from '../styles';

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
    loggedInDesc: {
        ...Colors.whiteText,
    },
    itemView: {
        paddingBottom: 10,
        paddingTop: 10,
        width: vw(100),
        borderBottomColor: 'white',
    },
});

interface AutoCompleteProps {
    suggestions: Film[];
}

interface Film {
    id: string;
    name: string;
    avatar: string;
}

const CapaAutoComplete: React.FunctionComponent<AutoCompleteProps> = (props: AutoCompleteProps) => {
    const { suggestions } = props;
    const [input, setInput] = useState('');
    const filtered = suggestions.filter((item: Film) => {
        return item.name.indexOf(input) !== -1;
    });
    function Item({ item }: { item: Film }) {
        return (
            <TouchableOpacity
                onPress={() => {
                    setInput(item.name);
                }}
            >
                <ListItem
                    leftAvatar={{
                        size: 'medium',
                        title: item.name,
                        source: { uri: item.avatar },
                        showEditButton: false,
                    }}
                    title={item.name}
                    subtitle="120"
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    subtitleStyle={{ color: 'white' }}
                    containerStyle={{ width: vw(100), backgroundColor: 'black' }}
                />
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            <Input
                placeholderTextColor="white"
                placeholder="Search"
                inputContainerStyle={[InputField.inputUnderline]}
                containerStyle={[InputField.inputContainer]}
                inputStyle={[Colors.whiteText, InputField.inputText]}
                value={input}
                onChangeText={text => {
                    setInput(text);
                }}
            />
            {filtered.length > 0 && filtered[0].name !== input && (
                <FlatList<Film>
                    data={filtered}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );
};

export default CapaAutoComplete;