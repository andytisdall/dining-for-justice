import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useGetTotalCheckInsQuery} from '../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';

const rootsLogo = require('../../assets/roots-logo.png');

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
          A free community meal is donated by our sponsors for the first 2000
          check-ins!
        </Text>
        {/* <View style={homeStyles.sponsors}> */}
        <View style={homeStyles.rootsLogoContainer}>
          <FastImage source={rootsLogo} style={homeStyles.logo} />
        </View>
        {/* </View> */}

        <Text style={[baseStyles.textLg, baseStyles.centerText]}>
          Meals Donated by our Sponsors:
        </Text>
        <View>
          <Text style={homeStyles.totalMeals}>{totalCheckins.checkIns}</Text>
        </View>
        <View style={baseStyles.screenSection} />
      </View>
    );
  }
};

export default MatchingMeals;
