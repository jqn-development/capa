import React, { useCallback, useState, useRef } from 'react';
import { debounce } from 'lodash';
// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Input, ListItem, Icon } from 'react-native-elements';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors, Container, InputField, MapStyles } from '../styles';
import { useAutoCompleteContext } from '../components/CapaAutoCompleteProvider';
import useGoogleAutocomplete from '../hooks/useGooglePlaces';
import config from '../config';

const styles = StyleSheet.create({
    mapInputContainer: {
        margin: 0,
        padding: 0,
        width: vw(80),
    },
    inputContainer: {
        paddingLeft: vw(0),
        padding: 0,
        width: vw(80),
    },
    inputContainerGeneric: {
        paddingLeft: vw(5),
        padding: 0,
        width: vw(90),
    },
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
        paddingLeft: vw(5),
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
interface Coordinate {
    lat: number;
    lng: number;
}
interface Item {
    id: string;
    name: string;
    details: string;
    avatar?: string;
    // eslint-disable-next-line
    place_id?: string;
    description?: string;
    coord: Coordinate;
}

function PlacesItem({ item, onPress }: { item: Item; onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <ListItem
                leftIcon={{ name: 'map-marker', type: 'font-awesome', color: '#fff' }}
                title={item.description}
                titleStyle={styles.listItemTitle}
                containerStyle={styles.listItemContainer}
            />
        </TouchableOpacity>
    );
}

function Item({ item, onPress }: { item: Item; onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress}>
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
    const [showList, setShowList] = useState(true);
    const [marker, setMarker] = useState<Coordinate | null>(null);
    const suggestionsContext = useAutoCompleteContext();
    const active = String(suggestionsContext.active);
    const mapView = useRef<MapView | null>(null);
    const placeSelected = useRef(false);
    const filtered = suggestions.filter(
        (item: Item) =>
            item.name.toLowerCase().indexOf(suggestionsContext.form[active].name.toLowerCase()) !==
            -1
    );

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
    const { results, getPlaceDetails } = useGoogleAutocomplete({
        apiKey: config.googleApi,
        query: suggestionsContext.form.location.name,
        type: 'geocode',
        options: {
            types: '(cities)',
        },
    });
    const onSelectItem = (item: Item) => {
        let formState;
        if (item.place_id) {
            getPlaceDetails(item.place_id, {
                fields: ['name', 'geometry'],
            }).then(data => {
                setMarker({
                    lat: data.result.geometry.location.lat,
                    lng: data.result.geometry.location.lng,
                });
                const location = {
                    ...item,
                    coord: {
                        lat: data.result.geometry.location.lat,
                        lng: data.result.geometry.location.lng,
                    },
                    name: item.description,
                };
                formState = {
                    ...suggestionsContext.form,
                    location: location,
                };
                suggestionsContext.setForm(formState);
            });
            placeSelected.current = true;
            setShowList(false);
        } else {
            formState = {
                ...suggestionsContext.form,
                [suggestionsContext.active]: item,
            };
            suggestionsContext.setEditMode(false);
            suggestionsContext.setForm(formState);
        }
    };
    const handleMapInput = (e: string) => {
        suggestionsContext.setForm({
            ...suggestionsContext.form,
            location: { name: e },
        });
        if (e.length === 0) {
            setShowList(false);
        } else {
            setShowList(true);
        }
        placeSelected.current = false;
    };
    const handleInput = (e: string) => {
        suggestionsContext.setForm({
            ...suggestionsContext.form,
            [active]: { name: e },
        });
        debounceLoadData(String(suggestionsContext.activeUrl));
    };
    if (suggestionsContext.mapMode) {
        return suggestionsContext.editMode ? (
            <View>
                {suggestionsContext.form.location.coord && (
                    <MapView
                        ref={mapView}
                        loadingBackgroundColor="black"
                        loadingIndicatorColor="black"
                        region={{
                            latitude: suggestionsContext.form.location.coord.lat,
                            longitude: suggestionsContext.form.location.coord.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={MapStyles}
                        style={styles.mapStyle}
                    >
                        {marker && (
                            <Marker
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.lng,
                                }}
                            ></Marker>
                        )}
                    </MapView>
                )}
                <View style={[styles.container, Container.absolute]}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => {
                                suggestionsContext.setEditMode(false);
                            }}
                        >
                            {placeSelected.current ? (
                                <View style={{ marginLeft: vw(5), marginRight: 10, marginTop: 18 }}>
                                    <Icon type="font-awesome" name="chevron-left" color="#fff" />
                                </View>
                            ) : (
                                <View style={{ marginLeft: vw(5), marginRight: 10, marginTop: 18 }}>
                                    <Icon type="font-awesome" name="search" color="#fff" />
                                </View>
                            )}
                        </TouchableOpacity>
                        <View>
                            <Input
                                autoFocus
                                keyboardAppearance="dark"
                                placeholderTextColor="white"
                                placeholder="Search"
                                inputContainerStyle={[
                                    InputField.inputNoUnderline,
                                    styles.mapInputContainer,
                                ]}
                                containerStyle={[InputField.inputContainer, styles.inputContainer]}
                                inputStyle={[Colors.whiteText, InputField.inputText]}
                                value={suggestionsContext.form[suggestionsContext.active].name}
                                onChangeText={handleMapInput}
                                onFocus={() => {
                                    setSuggestions([]);
                                    // debounceLoadPlacesData();
                                }}
                            />
                        </View>
                    </View>
                    {showList && (
                        <FlatList
                            data={results.predictions}
                            renderItem={({ item }: { item: Item }) => (
                                <PlacesItem onPress={() => onSelectItem(item)} item={item} />
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
                keyboardAppearance="dark"
                placeholderTextColor="white"
                placeholder="Search"
                leftIcon={<Icon name="search" color="#fff" />}
                leftIconContainerStyle={{
                    marginLeft: 0,
                    paddingRight: 5,
                }}
                inputContainerStyle={[InputField.inputUnderline]}
                containerStyle={[InputField.inputContainer, styles.inputContainerGeneric]}
                inputStyle={[Colors.whiteText, InputField.inputText]}
                value={suggestionsContext.form[suggestionsContext.active].name}
                onChangeText={handleInput}
                onFocus={() => {
                    setSuggestions([]);
                    debounceLoadData(suggestionsContext.activeUrl);
                }}
            />
            <FlatList
                data={filtered}
                renderItem={({ item }: { item: Item }) => {
                    return <Item onPress={() => onSelectItem(item)} item={item} />;
                }}
                keyExtractor={(item: Item) => item.id}
            />
        </View>
    ) : (
        <View />
    );
};

export default CapaAutoComplete;
