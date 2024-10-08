import {View, Text} from 'react-native';

import baseStyles from '../../styles/baseStyles';
import {useGetContactQuery} from '../../../state/apis/contactApi/contactApi';

const Unconfirmed = () => {
  const {data: contact} = useGetContactQuery(undefined, {refetchOnFocus: true});
  if (contact?.unconfirmed) {
    return (
      <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
        <Text style={[baseStyles.textSm, baseStyles.centerText]}>
          You have been sent a confirmation email. Please follow the
          instructions in this email to finish creating your account.
        </Text>
      </View>
    );
  }
};

export default Unconfirmed;
