import {useState, useRef} from 'react';
import {View, Text, TextInput as NativeTextInput} from 'react-native';
import {TextInput} from 'react-native-paper';

import Btn from '../reusable/Btn';

import styles from './styles';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const passwordFieldRef = useRef<NativeTextInput | null>(null);

  const handleSubmit = () => {};

  return (
    <View style={styles.signin}>
      <View style={styles.CKSignin}>
        <Text style={styles.signinText}>Sign in with your CK username</Text>
      </View>
      <View style={styles.signinFields}>
        <TextInput
          style={styles.authInput}
          value={username}
          onChangeText={setUsername}
          textColor="black"
          placeholder="Username"
          blurOnSubmit
          returnKeyType="next"
          placeholderTextColor="grey"
          onSubmitEditing={() => {
            if (passwordFieldRef.current) {
              passwordFieldRef.current.focus();
            }
          }}
        />
        <TextInput
          style={styles.authInput}
          value={password}
          onChangeText={setPassword}
          textColor="black"
          placeholder="Password"
          blurOnSubmit
          returnKeyType="next"
          ref={passwordFieldRef}
          onSubmitEditing={handleSubmit}
          secureTextEntry
          placeholderTextColor="grey"
        />
        <Btn style={styles.signinBtn} onPress={handleSubmit}>
          <Text style={styles.signinBtnText}>Sign In</Text>
        </Btn>
      </View>
    </View>
  );
};

export default SignIn;
