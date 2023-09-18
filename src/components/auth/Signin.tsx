// import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState, useRef} from 'react';
import {
  View,
  Text,
  // Pressable,
  TextInput as NativeTextInput,
  // Image,
  // ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
// import {
//   AppleButton,
//   appleAuth,
//   AppleRequestResponse,
// } from '@invertase/react-native-apple-authentication';

import ErrorMessage from '../reusable/Error';
import Btn from '../reusable/Btn';
// import reusableStyles from '../reusable/styles';
// import {RootStackParamList, RootTabParamsList} from '../../../App';
import styles from './styles';
// import baseStyles from '../styles/baseStyles';
// import {
//   signIn as signInAction,
//   getUser as getUserAction,
//   googleSignIn as googleSignInAction,
//   appleSignIn as appleSignInAction,
//   setError as setErrorAction,
// } from '../../actions';
// import useLoading from '../../hooks/useLoading';
// import Loading from '../reusable/Loading';
// import type {RootStackParamsList} from '../../../App';
import {useSignInMutation} from '../../state/apis/authApi';
import Loading from '../reusable/Loading';

// interface SignInProps {
//   signIn: (username: string, password: string) => Promise<void>;
// googleSignIn: (userInfo: User) => () => Promise<void>;
// appleSignIn: (user: AppleRequestResponse) => (dispatch: any) => Promise<void>;
// }

// type ScreenProps = NativeStackScreenProps<RootStackParamsList, 'SignIn'>;

// function assert(condition: any, msg = 'Generic Assertion'): asserts condition {
//   if (!condition) {
//     throw Error(`Assertion failed: ${msg}`);
//   }
// }

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const passwordFieldRef = useRef<NativeTextInput | null>(null);

  const [signIn, signInResult] = useSignInMutation();

  const handleSubmit = () => {
    signIn({username, password});
  };

  // assert(authApi.endpoints.getUser?.useQuery, 'Endpoint `getUser` not loaded!');

  // const submitGoogleSignIn = async () => {
  //   setLoading(true);
  //   try {
  //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  //     const userInfo = await GoogleSignin.signIn();
  //     googleSignIn(userInfo);
  //   } catch (err) {
  //     setError('Google Sign In Failed');
  //   }
  // };

  // const onAppleButtonPress = async () => {
  //   setLoading(true);
  //   try {
  //     // performs login request
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       // Note: it appears putting FULL_NAME first is important, see issue #293
  //       requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  //     });

  //     // get current authentication state for user
  //     // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  //     const credentialState = await appleAuth.getCredentialStateForUser(
  //       appleAuthRequestResponse.user,
  //     );

  //     // use credentialState response to ensure the user is authenticated
  //     if (credentialState === appleAuth.State.AUTHORIZED) {
  //       // user is authenticated
  //       appleSignIn(appleAuthRequestResponse);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setError('Apple Login Failed');
  //   }
  // };
  return (
    // <ScrollView contentContainerStyle={baseStyles.scrollView}>
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
      {signInResult.error && <ErrorMessage error={signInResult.error} />}
      {signInResult.isLoading && <Loading />}
      {/* <Text style={styles.signinText}>Or</Text> */}
      {/* <View style={styles.googleSignIn}>
          <Pressable onPress={submitGoogleSignIn}>
            {({pressed}) => {
              const googleImg = pressed
                ? require('../../assets/google-pressed.png')
                : require('../../assets/google.png');
              return (
                <Image
                  source={googleImg}
                  alt="Google Sign In"
                  style={styles.googleSignInBtn}
                />
              );
            }}
          </Pressable>
        </View> */}
      {/* {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleSignIn}
            onPress={onAppleButtonPress}
          />
        )} */}
    </View>
    // </ScrollView>
  );
};

export default SignIn;
