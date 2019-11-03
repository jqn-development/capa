import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors, Container, InputField } from '../styles';
import { useAutoCompleteContext } from '../components/CapaAutoCompleteProvider';
import useGoogleAutocomplete from '../hooks/useGooglePlaces';

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

function PlacesItem({ item, onSelected }: { item: any; onSelected: () => void }) {
    const suggestionsContext = useAutoCompleteContext();
    return (
        <TouchableOpacity
            onPress={() => {
                const formState = {
                    ...suggestionsContext.form,
                    [suggestionsContext.active as string]: item.description,
                };
                onSelected();
                suggestionsContext.setForm(formState);
            }}
        >
            <ListItem
                leftIcon={{ name: 'map-marker', type: 'font-awesome', color: '#fff' }}
                title={item.description}
                titleStyle={styles.listItemTitle}
                containerStyle={styles.listItemContainer}
            />
        </TouchableOpacity>
    );
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
    const [showList, setShowList] = useState(true)
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
    const debounceLoadData = useCallback(debounce(fetchSuggestions, 300), []);
    let { results, isLoading, error } = useGoogleAutocomplete({
        apiKey: 'AIzaSyCa-nlF1oV_1THrXZxbt6LyJbcebz84qJ4',
        query: suggestionsContext.form[suggestionsContext.active],
        type: 'geocode',
        options: {
            types: '(cities)',
        },
    });
    const handleMapInput = (e: string) => {
        suggestionsContext.setForm({
            ...suggestionsContext.form,
            [active]: e,
        });
        setShowList(true);
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
                            //debounceLoadPlacesData();
                        }}
                    />
                    {showList && (
                        <FlatList
                            data={results.predictions}
                            renderItem={({ item }: { item: Item }) => (
                                <PlacesItem
                                    onSelected={() => {
                                        setShowList(false);
                                    }}
                                    item={item}
                                />
                            )}
                            keyExtractor={(item: Item) => item.id}
                        />
                    )}
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
