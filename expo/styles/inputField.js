import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const input = {
    width: '100%',
    height: vh(5),
    paddingVertical: 5,
};

const inputText = {
    fontSize: 12,
};

const inputUnderline = {
    borderBottomWidth: 1,
    borderColor: 'white',
};

const inputLabel = {
    fontSize: vw(3.2),
    fontWeight: 'normal',
    marginVertical: vh(0),
    padding: 0,
    marginTop: 20,
};

export { inputText, inputUnderline, inputLabel, input };
