import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Input, Button } from 'react-native-elements';
import { WebBrowser } from 'expo';
import { login, checkAuthTest } from '../modules/auth/auth.service';
import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {
    static navigationOptions = {
      title: "capa",
      headerTitleStyle: {
          textAlign: 'left',
          flexGrow:1,
          alignSelf:'left',
      },
      headerStyle: {
          backgroundColor: '#000',
          fontFamily: 'space-mono'
      },
      headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff',
      },
    };

  render() {
    const { handleSubmit } = this.props;
    const submitForm = e => {
        this.props.login(e.email, e.password);
    };
    return (
        <View>

            <View style={styles.errorMessage}>
                <Text>{this.props.errorMessage}</Text>
            </View>

            {this.props.loggedIn ? (
                <Text style={styles.loggedInDesc}>
                    You are logged in with token: {this.props.authToken}
                </Text>
            ) : null}
            <Button
                onPress={this.props.checkAuthTest}
                //buttonStyle={[globalStyle.btn, styles.accessBtn]}
                //titleStyle={globalStyle.btnText}
                title={'Check restricted access'}
            />
        </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const renderEmail = ({ input: { onChange, ...restInput } }) => {
	return (
		<Input
			placeholder="Email"
			inputContainerStyle={styles.input}
			inputStyle={styles.placeholder}
			onChangeText={onChange}
			{...restInput}
		/>
	);
};
const renderPassword = ({ input: { onChange, ...restInput } }) => {
	return (
		<Input
			placeholder="Password"
			name="password"
			inputContainerStyle={styles.input}
			inputStyle={styles.placeholder}
			onChangeText={onChange}
			secureTextEntry={true}
			{...restInput}
		/>
	);
};

function mapStateToProps(store, ownProps) {
	return {
		errorMessage: store.auth.loginError,
		loggedIn: store.auth.loggedIn,
		authToken: store.auth.authToken
	};
}
function mapDispatchToProps(dispatch) {
	return {
		login: (email, password) => {
			dispatch(login(email, password));
		},
		checkAuthTest: () => {
			dispatch(checkAuthTest());
		}
	};
}

let LoginConnect = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export default reduxForm({
	form: 'loginForm'
})(LoginConnect);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	input: {
		backgroundColor: '#ffffff',
		borderBottomWidth: 0,
		marginBottom: 10,
		borderRadius: 2,
		paddingVertical: 5,
		width: '100%'
	},
	placeholder: {
		fontSize: 12
	},
	errorMessage: {
		marginTop: 40
	},
	loggedInDesc: {
		marginTop: 40
	},
	authBtnWrap: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		paddingHorizontal: 15
	},
	authBtn: {
		marginHorizontal: 0,
		marginVertical: 18,
		width: '80%',
		alignSelf: 'center'
	},
	accessBtn: {
		marginHorizontal: 0,
		marginVertical: 30,
		width: '100%',
		alignSelf: 'center'
	},

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
