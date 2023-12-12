import {TextInput} from 'react-native-paper';
import {View, Text} from 'react-native';
import baseStyles from '../../styles/baseStyles';
import authStyles from './authStyles';

const EnterEmail = ({
  email,
  setEmail,
  next,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  next: () => void;
}) => {
  return (
    <View>
      <Text style={[baseStyles.textSm, authStyles.authFieldLabel]}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        textContentType="emailAddress"
        onSubmitEditing={next}
        blurOnSubmit
      />
    </View>
  );
};

export default EnterEmail;
