import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useGetTotalCheckInsQuery} from '../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';

const anthemLogo = require('../../assets/anthem-logo.jpeg');
const rootsLogo = require('../../assets/roots-logo.png');

const MatchingMeals = () => {
  const {data: totalCheckins} = useGetTotalCheckInsQuery();

  if (totalCheckins) {
    return (
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        <View style={homeStyles.sponsors}>
          <View style={homeStyles.anthemLogoContainer}>
            <FastImage
              source={anthemLogo}
              resizeMode="contain"
              style={homeStyles.logo}
            />
          </View>
          <View style={homeStyles.rootsLogoContainer}>
            <FastImage source={rootsLogo} style={homeStyles.logo} />
          </View>
        </View>

        <Text style={[baseStyles.textLg, baseStyles.centerText]}>
          Meals Donated by our Sponsors:
        </Text>
        <View style={homeStyles.matchingNumberContainer}>
          <Text style={homeStyles.matchingNumber}>
            {totalCheckins.checkIns}
          </Text>
        </View>
        <View style={baseStyles.screenSection} />
      </View>
    );
  }
};

export default MatchingMeals;
