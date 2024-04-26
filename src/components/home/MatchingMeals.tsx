import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useGetTotalCheckInsQuery} from '../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';

const blockLogo = require('../../assets/block-logo.png');

const MatchingMeals = () => {
  const {data: totalCheckins} = useGetTotalCheckInsQuery();

  if (totalCheckins) {
    return (
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        <Text
          style={[
            baseStyles.inputLabel,
            baseStyles.screenSection,
            baseStyles.centerText,
          ]}>
          A free community meal is donated by Block for the first 2000
          check-ins!
        </Text>
        <View style={homeStyles.logoContainer}>
          <FastImage source={blockLogo} style={homeStyles.logo} />
        </View>
        <View style={baseStyles.screenBorders}>
          <Text style={[baseStyles.text, baseStyles.centerText]}>
            Meals Donated by our Sponsors:
          </Text>
          <Text style={[homeStyles.totalMeals, baseStyles.centerText]}>
            {totalCheckins.checkIns}
          </Text>
          <View style={baseStyles.screenSection} />
        </View>
      </View>
    );
  }
};

export default MatchingMeals;
