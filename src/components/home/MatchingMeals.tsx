import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useGetTotalCheckInsQuery} from '../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';
import rewardsStyles from '../rewards/rewardsStyles';

const blockLogo = require('../../assets/logos/block-logo.png');

const MatchingMeals = () => {
  const {data: totalCheckins} = useGetTotalCheckInsQuery();

  if (totalCheckins) {
    return (
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        <Text
          style={[
            baseStyles.text,
            rewardsStyles.rewardsHeadline,

            baseStyles.screenSection,
            baseStyles.centerText,
          ]}>
          Thank you to our sponsors, partners and supporters for a wonderful
          month of Cocktails for a Cause!
        </Text>
        <Text style={[baseStyles.centerText, baseStyles.textSm]}>
          Block donated 2000 free community meals!
        </Text>
        <View style={homeStyles.logoContainer}>
          <FastImage
            source={blockLogo}
            style={homeStyles.logo}
            resizeMode="contain"
          />
        </View>
        {/* <View style={baseStyles.screenBorders}>
          <Text style={[baseStyles.text, baseStyles.centerText]}>
            Meals Donated by our Sponsors:
          </Text>
          <Text style={[homeStyles.totalMeals, baseStyles.centerText]}>
            {totalCheckins.checkIns}
          </Text>
          <View style={baseStyles.screenSection} />
        </View> */}
      </View>
    );
  }
};

export default MatchingMeals;
