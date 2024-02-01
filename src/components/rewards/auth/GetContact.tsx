import {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {setError} from '../../../state/apis/slices/errorSlice';
import {RewardsStackParams} from '../RewardsNavigator';
import Loading from '../../reusable/Loading';
import EnterEmail from './EnterEmail';
import EnterName from './EnterName';
import {
  useSignInMutation,
  useCreateContactMutation,
} from '../../../state/apis/contact/contactApi';
import Btn from '../../reusable/Btn';
import baseStyles from '../../styles/baseStyles';
import ThumbsUp from '../../reusable/ThumbsUp';
import AnimatedLoading from '../../reusable/AnimatedLoading';
import authStyles from './authStyles';
import ScreenBackground from '../../reusable/ScreenBackground';
import Notifications from '../../../notifications/NotificationsService';

type GetContactScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'GetContact'
>;

const validateEmail = (input: string) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return input.match(validRegex);
};

const GetContact = ({navigation}: GetContactScreenProps) => {
  const [email, setEmail] = useState('');
  const [showNameFields, setShowNameFields] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [signIn, signInResult] = useSignInMutation();
  const [createContact, createContactResult] = useCreateContactMutation();

  const redirectScreen = 'RewardsHome';

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!showNameFields) {
      if (!validateEmail(email)) {
        return dispatch(setError('Please enter a valid email address'));
      }
      signIn(email)
        .unwrap()
        .then(user => {
          if (!user) {
            setShowNameFields(true);
          } else {
            navigation.navigate(redirectScreen);
          }
        });
    } else {
      Notifications.init(({token}: {token: string}) => {
        createContact({email, firstName, lastName, token})
          .unwrap()
          .then(user =>
            signIn(user.email)
              .unwrap()
              .then(() => {
                navigation.navigate(redirectScreen);
              }),
          );
      });
    }
  };

  const displayEmail = () => {
    return (
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        <View style={authStyles.user}>
          <Text style={baseStyles.inputLabel}>Email:</Text>
          <Text style={baseStyles.textSm}>{email}</Text>
        </View>
        <Btn onPress={() => setShowNameFields(false)}>
          <Text style={baseStyles.btnText}>Use a different email address</Text>
        </Btn>
      </View>
    );
  };

  const renderContent = () => {
    if (createContactResult.isSuccess) {
      return <ThumbsUp />;
    }

    if (signInResult.isLoading) {
      return <Loading />;
    }

    if (createContactResult.isLoading) {
      return <AnimatedLoading />;
    }
    return (
      <>
        <View style={[baseStyles.screenSection, authStyles.authHeader]}>
          <Text style={[baseStyles.text]}>
            Enter your email to claim your rewards
          </Text>
        </View>
        <View style={baseStyles.screenSection}>
          {showNameFields ? (
            <>
              {displayEmail()}
              <EnterName
                firstName={firstName}
                lastName={lastName}
                setFirstName={setFirstName}
                setLastName={setLastName}
                next={handleSubmit}
              />
            </>
          ) : (
            <EnterEmail email={email} setEmail={setEmail} next={handleSubmit} />
          )}
          <View style={baseStyles.centerSection}>
            <Btn onPress={handleSubmit}>
              <Text style={baseStyles.btnText}>Submit</Text>
            </Btn>
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={baseStyles.scrollView}>
      <ScreenBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {renderContent()}
        </KeyboardAvoidingView>
      </ScreenBackground>
    </ScrollView>
  );
};

export default GetContact;
