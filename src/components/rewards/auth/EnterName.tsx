import {TextInput} from 'react-native-paper';
import {
  Text,
  View,
  TextInput as TextInputType,
  KeyboardAvoidingView,
} from 'react-native';
import {useRef} from 'react';

import baseStyles from '../../styles/baseStyles';
import authStyles from './authStyles';

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
  const lastNameRef = useRef<TextInputType>(null);

  return (
    <KeyboardAvoidingView style={baseStyles.screenSection}>
      <Text style={baseStyles.textSm}>
        Please enter your name for our records (in the future you'll only need
        to enter your email):
      </Text>
      <View style={baseStyles.screenSection}>
        <Text style={baseStyles.inputLabel}>First Name:</Text>
        <TextInput
          autoFocus
          value={firstName}
          onChangeText={setFirstName}
          onSubmitEditing={() => lastNameRef.current?.focus()}
          blurOnSubmit
          style={authStyles.input}
          autoCorrect={false}
          autoCapitalize="words"
        />
      </View>
      <View style={baseStyles.screenSection}>
        <Text style={baseStyles.inputLabel}>Last Name:</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          onSubmitEditing={next}
          returnKeyType="next"
          style={authStyles.input}
          ref={lastNameRef}
          blurOnSubmit
          autoCorrect={false}
          autoCapitalize="words"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EnterName;
