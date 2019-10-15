// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';

const input = {
    width: '100%',
    height: vh(6),
};

const inputContainerSmall = {
    paddingLeft: 0,
    paddingRight: 0,
    borderColor: 'white',
};

const inputContainer = {
    marginTop: 10,
    marginBottom: 15,
    paddingLeft: 0,
    paddingRight: 0,
    borderColor: 'white',
    borderBottomWidth: 0,
};

const inputText = {
    fontSize: vw(3.8),
    width: vw(100),
};

const inputUnderline = {
    borderBottomWidth: 1,
    borderColor: 'white',
};

const inputNoUnderline = {
    borderBottomWidth: 0,
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
