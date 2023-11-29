import {useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, ScrollView} from 'react-native';

import {RewardsStackParams} from '../RewardsNavigator';
import Loading from '../../reusable/Loading';
import EnterEmail from './EnterEmail';
import EnterName from './EnterName';
import {
  useSignInMutation,
  useCreateContactMutation,
  useGetContactQuery,
} from '../../../state/apis/contact/contactApi';
import Btn from '../../reusable/Btn';
import baseStyles from '../../styles/baseStyles';

type GetContactScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'GetContact'
>;

const GetContact = ({navigation}: GetContactScreenProps) => {
  const [email, setEmail] = useState('');
  const [showNameFields, setShowNameFields] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [signIn, signInResult] = useSignInMutation();
  const [createContact, createContactResult] = useCreateContactMutation();
  const {data: contact} = useGetContactQuery();

  const redirectScreen = 'RewardsHome';

  useEffect(() => {
    if (contact) {
      navigation.navigate(redirectScreen);
    }
  }, [contact, navigation]);

  const handleSubmit = () => {
    if (!showNameFields) {
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
      createContact({email, firstName, lastName})
        .unwrap()
        .then(user =>
          signIn(user.email)
            .unwrap()
            .then(() => {
              navigation.navigate(redirectScreen);
            }),
        );
    }
  };

  const displayEmail = () => {
    return (
      <View style={baseStyles.screenSection}>
        <Text style={baseStyles.text}>Email:</Text>
        <Text style={baseStyles.text}>{email}</Text>
        <Btn onPress={() => setShowNameFields(false)}>
          <Text>Use a different email address</Text>
        </Btn>
      </View>
    );
  };

  if (signInResult.isLoading || createContactResult.isLoading) {
    return <Loading />;
  }
  return (
    <ScrollView contentContainerStyle={baseStyles.scrollView}>
      <View style={baseStyles.screen}>
        <View style={baseStyles.screenSection}>
          <Text style={baseStyles.text}>
            Enter your email to do rewards things
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
              />
            </>
          ) : (
            <EnterEmail email={email} setEmail={setEmail} />
          )}

          <Btn onPress={handleSubmit}>
            <Text>Submit</Text>
          </Btn>
        </View>
      </View>
    </ScrollView>
  );
};

export default GetContact;
