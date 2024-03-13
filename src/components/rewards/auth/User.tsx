import {Text, View} from 'react-native';

import {
  useSignOutMutation,
  useGetContactQuery,
} from '../../../state/apis/contact/contactApi';
import baseStyles from '../../styles/baseStyles';
import Btn from '../../reusable/Btn';
import authStyles from './authStyles';

const User = () => {
  const [signOut] = useSignOutMutation();
  const {data: contact} = useGetContactQuery();

  return (
    <View style={[authStyles.user]}>
      <Text style={baseStyles.textSm}>Signed in as {contact?.email}</Text>
      <Btn onPress={signOut} style={authStyles.signOutBtn}>
        <Text style={authStyles.signOutBtnText}>Sign Out</Text>
      </Btn>
    </View>
  );
};

export default User;
