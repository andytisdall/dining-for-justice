import {TextInput} from 'react-native-paper';
import {Text, View} from 'react-native';
import baseStyles from '../../styles/baseStyles';
import rewardsStyles from '../rewardsStyles';

const EnterName = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  next,
}: {
  firstName: string;
  lastName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  next: () => void;
}) => {
  return (
    <View style={baseStyles.screenSection}>
      <Text style={baseStyles.text}>
        Please enter your name for our records (in the future you'll only need
        to enter your email):
      </Text>
      <View style={baseStyles.screenSection}>
        <Text style={baseStyles.text}>First Name:</Text>
        <TextInput autoFocus value={firstName} onChangeText={setFirstName} />
      </View>
      <View style={baseStyles.screenSection}>
        <Text style={baseStyles.text}>Last Name:</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          onSubmitEditing={next}
          returnKeyType="next"
          style={rewardsStyles.textInput}
        />
      </View>
    </View>
  );
};

export default EnterName;
