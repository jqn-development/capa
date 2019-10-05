import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { vw } from 'react-native-expo-viewport-units';
import CapaHeader from '../components/header';
import { Colors, Container } from '../styles';
import CapaAutoComplete from '../components/CapaAutoComplete';
import { AppState } from '../store/rootReducer';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
        paddingLeft: vw(5),
        paddingRight: vw(5),
        paddingTop: 20,
    },
    loggedInDesc: {
        ...Colors.whiteText,
    },
});

interface Props {
    film: any,
    gear: any,
}

const data = {
    film: [
        {
            id: 'test',
            name: 'ILFORD DELTA 100',
            avatar: 'http://i.imgur.com/9Ttuw8c.jpg',
        },
        {
            id: 'ilf12',
            name: 'ILFORD HP5',
            avatar: 'http://i.imgur.com/9Ttuw8c.jpg',
        },
        {
            id: 'kodak232',
            name: 'KODAK PORTRA 100',
            avatar: 'http://i.imgur.com/9Ttuw8c.jpg',
        },
    ],
};

class AutoCompleteScreen extends React.Component<Props> {
    static navigationOptions = {
        header: null,
        headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
        },
    };

    render() {
        const { film, gear } = this.props;
        return (
            <View style={styles.container}>
                <CapaHeader />
                <CapaAutoComplete suggestions={data.film} />
            </View>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
    };
}

export default connect(mapStateToProps)(AutoCompleteScreen);
