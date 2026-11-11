import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';

import contestStyles from './contestStyles';
import Btn from '../../reusable/Btn';
import { EventNavigationProp } from '../../../navigation/types';
import baseStyles from '../../styles/baseStyles';

const NotSignedIn = () => {
  const navigation = useNavigation<EventNavigationProp>();

  return (
    <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
      <Text style={[baseStyles.textSm, baseStyles.centerText]}>
        You must enter your email address to vote in the cocktail contest
      </Text>
      <Btn
        onPress={() =>
          navigation.navigate('Rewards', {
            screen: 'GetContact',
            initial: false,
            params: { redirect: 'Events' },
          })
        }
        style={contestStyles.voteBtn}
      >
        <Text style={contestStyles.voteBtnText}>Sign in to Vote</Text>
      </Btn>
    </View>
  );
};

export default NotSignedIn;
