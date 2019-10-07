import React, { useState } from 'react';
// @ts-ignore
import { vw } from 'react-native-expo-viewport-units';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { Colors, Container, InputField } from '../styles';
import {
    AutoCompleteDispatchContext,
    AutoCompleteContext,
} from '../components/CapaAutoCompleteProvider';

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
        borderBottomColor: '#000',
    },
    listItemContainer: {
        width: vw(100),
        backgroundColor: '#000',
        marginLeft: 0,
        paddingLeft: 0,
    },
    listItemTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
    listItemSubtitle: {
        color: '#fff',
    },
});

interface AutoCompleteProps {
    suggestions: Item[];
}

interface Item {
    id: string;
    name: string;
    avatar?: string;
}

const CapaAutoComplete: React.FunctionComponent<AutoCompleteProps> = (props: AutoCompleteProps) => {
    const [input, setInput] = useState('');
    const dispatch = React.useContext(AutoCompleteDispatchContext);
    const suggestionsContext = React.useContext(AutoCompleteContext);
    const filtered = suggestionsContext.suggestions.filter((item: Item) => {
        return item.name.indexOf(input) !== -1;
    });
    function Item({ item }: { item: Item }) {
        return (
            <TouchableOpacity
                onPress={() => {
                    setInput(item.name);
                }}
            >
                <ListItem
                    leftAvatar={
                        item.avatar
                            ? {
                                  size: 'medium',
                                  title: item.name,
                                  source: { uri: item.avatar },
                                  showEditButton: false,
                              }
                            : undefined
                    }
                    title={item.name}
                    subtitle="120"
                    titleStyle={styles.listItemTitle}
                    subtitleStyle={styles.listItemSubtitle}
                    containerStyle={styles.listItemContainer}
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
                onChangeText={e => {
                    setInput(e);
                    dispatch.fetchSuggestions();
                }}
            />
            {filtered.length > 0 && filtered[0].name !== input && (
                <FlatList<Item>
                    data={filtered}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );
};

export default CapaAutoComplete;
