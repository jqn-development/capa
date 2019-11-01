import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors, Container, InputField } from '../styles';
import { useAutoCompleteContext } from '../components/CapaAutoCompleteProvider';

const styles = StyleSheet.create({
    container: {
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
    mapStyle: {
        width: vw(100),
        height: vh(100),
    },
});

interface Item {
    id: string;
    name: string;
    details: string;
    avatar?: string;
}

function Item({ item }: { item: Item }) {
    const suggestionsContext = useAutoCompleteContext();
    return (
        <TouchableOpacity
            onPress={() => {
                const formState = {
                    ...suggestionsContext.form,
                    [suggestionsContext.active as string]: item.name,
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
                subtitle={item.details}
                titleStyle={styles.listItemTitle}
                subtitleStyle={styles.listItemSubtitle}
                containerStyle={styles.listItemContainer}
            />
        </TouchableOpacity>
    );
}
const CapaAutoComplete: React.FunctionComponent = () => {
    const [suggestions, setSuggestions] = useState<Item[]>([]);
    const suggestionsContext = useAutoCompleteContext();
    const active = String(suggestionsContext.active);
    const filtered = suggestions.filter(
        (item: Item) =>
            item.name.toLowerCase().indexOf(suggestionsContext.form[active].toLowerCase()) !== -1
    );
    const mapStyle = [
        {
            elementType: 'geometry',
            stylers: [
                {
                    color: '#212121',
                },
            ],
        },
        {
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
    ];
    const fetchMapSuggestions = () => {
        fetch(
            'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=geocode&language=fr&key=AIzaSyCa-nlF1oV_1THrXZxbt6LyJbcebz84qJ4'
        )
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                setSuggestions(data);
            })
            .catch(err => console.error(err));
    };
    const fetchSuggestions = (apiUrl: string) => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setSuggestions(data.suggestions);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const debounceLoadPlacesData = useCallback(debounce(fetchMapSuggestions, 300), []);
    const debounceLoadData = useCallback(debounce(fetchSuggestions, 300), []);
    const handleMapInput = (e: string) => {
        suggestionsContext.setForm({
            ...suggestionsContext.form,
            [active]: e,
        });
        debounceLoadPlacesData();
    };
    const handleInput = (e: string) => {
        suggestionsContext.setForm({
            ...suggestionsContext.form,
            [active]: e,
        });
        debounceLoadData(String(suggestionsContext.activeUrl));
    };
    if (suggestionsContext.mapMode) {
        return suggestionsContext.editMode ? (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={mapStyle}
                    style={styles.mapStyle}
                />
                <View style={[styles.container, Container.absolute]}>
                    <Input
                        autoFocus
                        placeholderTextColor="white"
                        placeholder="Search"
                        inputContainerStyle={[InputField.inputUnderline]}
                        containerStyle={[InputField.inputContainer]}
                        inputStyle={[Colors.whiteText, InputField.inputText]}
                        value={suggestionsContext.form[suggestionsContext.active]}
                        onChangeText={handleMapInput}
                        onFocus={() => {
                            setSuggestions([]);
                            debounceLoadPlacesData();
                        }}
                    />
                    <FlatList
                        data={filtered}
                        renderItem={({ item }: { item: Item }) => <Item item={item} />}
                        keyExtractor={(item: Item) => item.id}
                    />
                </View>
            </View>
        ) : (
            <View />
        );
    }
    return suggestionsContext.editMode ? (
        <View style={styles.container}>
            <Input
                autoFocus
                placeholderTextColor="white"
                placeholder="Search"
                inputContainerStyle={[InputField.inputUnderline]}
                containerStyle={[InputField.inputContainer]}
                inputStyle={[Colors.whiteText, InputField.inputText]}
                value={suggestionsContext.form[suggestionsContext.active]}
                onChangeText={handleInput}
                onFocus={() => {
                    setSuggestions([]);
                    debounceLoadData(suggestionsContext.activeUrl);
                }}
            />
            <FlatList
                data={filtered}
                renderItem={({ item }: { item: Item }) => <Item item={item} />}
                keyExtractor={(item: Item) => item.id}
            />
        </View>
    ) : (
        <View />
    );
};

export default CapaAutoComplete;
