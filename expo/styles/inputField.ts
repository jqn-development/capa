// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';

const input = {
    width: '100%',
    height: vh(5),
    marginBottom: 15,
    marginLeft: 0,
    paddingLeft: 0,
};

const inputContainerSmall = {
    margin: 0,
    padding: 0,
};

const inputContainer = {
    marginTop: 10,
    marginBottom: 15,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    borderColor: 'white',
    borderBottomWidth: 0,
};

const inputText = {
    fontSize: vw(4.2),
    width: vw(100),
};
const inputNoUnderline = {
    borderBottomWidth: 0,
};
const inputUnderline = {
    borderBottomWidth: 1,
    borderColor: 'white',
};

const inputLabel = {
    fontSize: vw(3.8),
    fontWeight: 'normal',
    marginVertical: vh(0),
};

export {
    inputText,
    inputUnderline,
    inputNoUnderline,
    inputLabel,
    input,
    inputContainer,
    inputContainerSmall,
};
