import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import rewardsStyles from './rewardsStyles';
import baseStyles from '../styles/baseStyles';
import Btn from '../reusable/Btn';
import {RewardsStackNavigationProp} from '../../navigation/types';

const restaurantImageUri = '';

const RewardsNotSignedIn = () => {
  const navigation = useNavigation<RewardsStackNavigationProp>();
  return (
    <View
      style={[
        rewardsStyles.notSignedIn,
        baseStyles.centerSection,
        baseStyles.screenSection,
      ]}>
      <View style={[baseStyles.centerSection]}>
        <Text style={[baseStyles.text, rewardsStyles.rewardsHeadline]}>
          Enter your email to check in at our bar/restaurant partners!
        </Text>

        <Text
          style={[
            baseStyles.centerText,
            baseStyles.textSm,
            baseStyles.screenSection,
          ]}>
          When you check in at any restaurant or bar on our list, you get a
          chance to win in our prize drawing, and CK gets a free meal donation!
        </Text>
      </View>
      <View style={baseStyles.screenSection}>
        <Btn onPress={() => navigation.navigate('GetContact')}>
          <Text style={[baseStyles.btnText, baseStyles.centerText]}>
            Sign In
          </Text>
        </Btn>
      </View>
      <FastImage source={{uri: restaurantImageUri}} />
    </View>
  );
};

export default RewardsNotSignedIn;
