import React, { useCallback, useState, useRef } from 'react';
import { debounce } from 'lodash';
// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors, Container, InputField, MapStyles } from '../styles';
import { useAutoCompleteContext } from '../components/CapaAutoCompleteProvider';
import useGoogleAutocomplete from '../hooks/useGooglePlaces';

const styles = StyleSheet.create({
    inputContainer: {
        margin: 0,
        padding: 0,
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
    const [showList, setShowList] = useState(true);
    const [marker, setMarker] = useState(false);
    const suggestionsContext = useAutoCompleteContext();
    const active = String(suggestionsContext.active);
    const mapView = useRef();
    const animate = (lat,lng) => {
        const r = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 7.5,
            longitudeDelta: 7.5,
        };
        if (mapView.current) {
            mapView.current.animateToRegion(r, 2000);
        }
    };
    const filtered = suggestions.filter(
        (item: Item) =>
            item.name.toLowerCase().indexOf(suggestionsContext.form[active].toLowerCase()) !== -1
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
        apiKey: 'AIzaSyB7KeUed2q1siPzTv7zxLT0jaaKcMEYmec',
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
        if (e.length === 0) {
            setShowList(false);
        } else {
            setShowList(true);
        }
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
            <View>
                <MapView
                    ref={mapView}
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
                <View style={[styles.container, Container.absolute]}>
                    <View style={{flex: 1,flexDirection: 'row'}}>
                        
                        <Input
                            autoFocus
                            placeholderTextColor="white"
                            placeholder="Search"
                            inputContainerStyle={[InputField.inputNoUnderline, styles.inputContainer]}
                            containerStyle={[InputField.inputContainer, styles.inputContainer]}
                            inputStyle={[Colors.whiteText, InputField.inputText]}
                            value={suggestionsContext.form[suggestionsContext.active]}
                            //leftIcon={{ type: 'font-awesome', name: 'chevron-left', color: '#fff'}}
                            //leftIconContainerStyle={{ margin: 0, paddingRight: 10 }}
                            onChangeText={handleMapInput}
                            onFocus={() => {
                                setSuggestions([]);
                                // debounceLoadPlacesData();
                            }}
                        />
                    </View>
                    {showList && (
                        <FlatList
                            data={results.predictions}
                            renderItem={({ item }: { item: Item }) => (
                                <PlacesItem
                                    onSelected={() => {
                                        getPlaceDetails(item.place_id, {
                                            fields: ['name', 'geometry'],
                                        }).then(data => {
                                            setMarker({ lat: data.result.geometry.location.lat, lng: data.result.geometry.location.lng});
                                            animate(
                                                data.result.geometry.location.lat,
                                                data.result.geometry.location.lng
                                            );
                                        });
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
