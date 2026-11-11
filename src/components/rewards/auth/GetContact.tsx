import { useState, useRef } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import { setError } from '../../../state/apis/slices/errorSlice';
import { GetContactScreenProps } from '../../../navigation/types';
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
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const validateEmail = (input: string) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return input.match(validRegex);
};

const GetContact = ({ route, navigation }: GetContactScreenProps) => {
  const [email, setEmail] = useState('');
  const [showNameFields, setShowNameFields] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [subscribe, setSubscribe] = useState(true);

  const [signIn, signInResult] = useSignInMutation();
  const [createContact, createContactResult] = useCreateContactMutation();

  const dispatch = useDispatch();

  const listRef = useRef<FlatList>(null);

  const navigateAfterSignIn = () => {
    // @ts-ignore
    navigation.navigate('RewardsHome', {
      redirect: route.params?.redirect,
    });
  };

  const handleSubmit = async () => {
    if (!validateEmail(email) && !showNameFields) {
      return dispatch(setError('Please enter a valid email address'));
    }

    // if it's just the email entry, see if contact exists and sign them in if so
    // if not, show the name fields so user can create a contact
    // then sign in the user that was created

    if (!showNameFields) {
      const user = await signIn({
        email,
        subscribe,
      }).unwrap();

      if (!user) {
        setShowNameFields(true);
      } else {
        navigateAfterSignIn();
      }
    } else {
      const user = await createContact({
        email,
        firstName,
        lastName,
        city,
        subscribe,
      }).unwrap();

      if (user) {
        await signIn({ email: user.email }).unwrap();
        navigateAfterSignIn();
      }
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
          <Text style={baseStyles.btnTextSm}>
            Use a different email address
          </Text>
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
      <View style={authStyles.getContact}>
        <View style={[baseStyles.screenSection, authStyles.authHeader]}>
          <Text style={[baseStyles.textSm, baseStyles.centerText]}>
            Enter your email to sign in / sign up
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
                city={city}
                setCity={setCity}
                listRef={listRef}
              />
            </>
          ) : (
            <EnterEmail email={email} setEmail={setEmail} next={handleSubmit} />
          )}
        </View>
        <View
          style={[
            baseStyles.screenSection,
            authStyles.checkbox,
            baseStyles.inputLabel,
          ]}
        >
          <BouncyCheckbox
            onPress={checked => setSubscribe(checked)}
            isChecked={subscribe}
          />
          <Text style={baseStyles.textSm}>
            I want to receive communications from Visit Oakland.
          </Text>
        </View>
        <View style={baseStyles.centerSection}>
          <Btn onPress={handleSubmit}>
            <Text style={baseStyles.btnText}>Submit</Text>
          </Btn>
        </View>
      </View>
    );
  };

  return (
    <ScreenBackground>
      <FlatList
        data={[renderContent()]}
        renderItem={({ item }) => item}
        ref={listRef}
      />
    </ScreenBackground>
  );
};

export default GetContact;
