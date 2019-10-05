import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import CapaHeader from '../components/header';
import { Colors, Container } from '../styles';
import CapaAutoComplete from '../components/CapaAutoComplete';
import { AppState } from '../store/rootReducer';

const styles = StyleSheet.create({
    container: {
        ...Container.flexVerticalTop,
        ...Colors.background,
    },
    loggedInDesc: {
        ...Colors.whiteText,
    },
});

interface Props {

}

const data = {
    film: [
        {
            id: 'test',
            name: 'ILFORD DELTA 100',
        },
        {
            id: 'ilf12',
            name: 'ILFORD HP5',
        },
        {
            id: 'kodak232',
            name: 'KODAK PORTRA 100',
        },
    ],
};

class AutoCompleteScreen extends React.Component<Props> {
    static navigationOptions = {
        header: null,
        headerStyle: {
            backgroundColor: '#000',
        },
    };

    render() {
        const {} = this.props;
        return (
            <View style={styles.container}>
                <CapaHeader add search />
                <CapaAutoComplete suggestions={data.film} />
                <Text>Auto Complete Screen</Text>
            </View>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
    };
}

export default connect(mapStateToProps)(AutoCompleteScreen);
