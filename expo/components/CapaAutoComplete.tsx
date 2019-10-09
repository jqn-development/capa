import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
// @ts-ignore
import { vw } from 'react-native-expo-viewport-units';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { Colors, Container, InputField } from '../styles';
import { useAutoCompleteContext } from '../components/CapaAutoCompleteProvider';

const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        paddingRight: 5,
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

interface Item {
    id: string;
    name: string;
    avatar?: string;
}
const CapaAutoComplete: React.FunctionComponent = () => {
    const [suggestions, setSuggestions] = useState<Item[]>([]);
    const suggestionsContext = useAutoCompleteContext();
    const editType = String(suggestionsContext.editType);
    const filtered = suggestions.filter((item: Item) => {
        return item.name.indexOf(suggestionsContext.form[editType]) !== -1;
    });
    const fetchSuggestions = (apiUrl: string) => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setSuggestions(data.suggestions);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const debounceLoadData = useCallback(debounce(fetchSuggestions, 300), []);
    const handleInput = (e: string) => {
        suggestionsContext.setForm({
            ...suggestionsContext.form,
            [suggestionsContext.editType as string]: e,
        });
        debounceLoadData(String(suggestionsContext.editTypeUrl));
    };

    function Item({ item }: { item: Item }) {
        return (
            <TouchableOpacity
                onPress={() => {
                    const formState = {
                        ...suggestionsContext.form,
                        [suggestionsContext.editType as string]: item.name,
                    };
                    suggestionsContext.setForm(formState);
                    suggestionsContext.setEditMode(false);
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
            {suggestionsContext.editMode ? (
                <View style={styles.container}>
                    <Input
                        autoFocus
                        placeholderTextColor="white"
                        placeholder="Search"
                        inputContainerStyle={[InputField.inputUnderline]}
                        containerStyle={[InputField.inputContainer]}
                        inputStyle={[Colors.whiteText, InputField.inputText]}
                        value={suggestionsContext.form[String(suggestionsContext.editType)]}
                        onChangeText={handleInput}
                    />
                    <FlatList
                        data={filtered}
                        renderItem={({ item }: { item: Item }) => <Item item={item} />}
                        keyExtractor={(item: Item) => item.id}
                    />
                </View>
            ) : null}
        </View>
    );
};

export default CapaAutoComplete;
