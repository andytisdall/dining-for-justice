import {Text, View, Linking} from 'react-native';

import {
  useSignOutMutation,
  useGetContactQuery,
} from '../../../state/apis/contactApi/contactApi';
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
      <Btn
        style={authStyles.deleteAccountBtn}
        onPress={() =>
          Linking.openURL(
            'https://portal.ckoakland.org/delete-data/' + contact?.email,
          )
        }>
        <Text style={baseStyles.textXSm}>Delete My Account</Text>
      </Btn>
    </View>
  );
};

export default User;
