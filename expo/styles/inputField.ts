// @ts-ignore
import { vw, vh } from 'react-native-expo-viewport-units';

const input = {
    width: '100%',
    height: vh(6),
};

const inputContainer = {
    marginTop: 10,
    marginBottom: 15,
    paddingLeft: 0,
    paddingRight: 0,
    borderColor: 'white',
};

const inputText = {
    fontSize: 18,
    width: vw(100),
    borderColor: 'white',
};

const inputUnderline = {
    borderBottomWidth: 1,
    borderColor: 'white',
};

const inputLabel = {
    fontSize: vw(3.2),
    fontWeight: 'normal',
    marginVertical: vh(0),
};

export { inputText, inputUnderline, inputLabel, input, inputContainer };
