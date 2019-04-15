import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Input, Button } from 'react-native-elements';
import { login, checkAuthTest } from '../modules/auth/auth.service';
import { MonoText } from '../components/StyledText';

const BG_IMAGE = require('../assets/images/splash.jpg');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { handleSubmit } = this.props;
    const submitForm = e => {
        this.props.login(e.email, e.password);
    };
    return (
        <View style={styles.container}>
            <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                <Field name="email" component={renderEmail} />
                <Field name="password" component={renderPassword} />

                <View style={styles.errorMessage}>
                    <Text>{this.props.errorMessage}</Text>
                </View>

                <View style={styles.authBtnWrap}>
                    <Button
                        testID="login"
                        onPress={handleSubmit(submitForm)}
                        //buttonStyle={[globalStyle.btn, styles.authBtn]}
                        //titleStyle={globalStyle.btnText}
                        title="Login"
                    />
                </View>

                {this.props.loggedIn ? (
                    <Text style={styles.loggedInDesc}>
                        You are logged in with token: {this.props.authToken}
                    </Text>
                ) : null}
            </ImageBackground >
        </View>
    );
  }
}

const renderEmail = ({ input: { onChange, ...restInput } }) => {
	return (
		<Input
            testID="email"
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
            testID="password"
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
function mapDispatchToProps(dispatch, ownProps) {
	return {
		login: (email, password) => {
			dispatch(login(email, password)).then(res => {
                ownProps.navigation.navigate('App');
            });
		},
		checkAuthTest: () => {
			dispatch(checkAuthTest());
		}
	};
}

let LoginConnect = connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

export default reduxForm({
	form: 'loginForm'
})(LoginConnect);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	input: {
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
    //paddingTop: 200,
    flex: 1,
    //backgroundColor: '#000',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(1,1,1,0.4)',
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
