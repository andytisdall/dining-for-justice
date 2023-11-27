import {TextInput} from 'react-native-paper';
import {View, Text} from 'react-native';
import baseStyles from '../../styles/baseStyles';

const EnterEmail = ({
  email,
  setEmail,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <View>
      <Text style={baseStyles.text}>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
    </View>
  );
};

export default EnterEmail;
