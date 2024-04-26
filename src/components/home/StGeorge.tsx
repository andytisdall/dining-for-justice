import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {HomeNavigationProp} from '../../navigation/types';
import Btn from '../reusable/Btn';
import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';
import {ST_GEORGE_ID} from '../events/EventDetail';

const stGeorgeLogo = require('../../assets/st-george-logo.png');

const StGeorge = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <View style={[homeStyles.stGeorge, baseStyles.centerSection]}>
      <Text style={baseStyles.title}>Featured Event</Text>
      <View style={homeStyles.stGeorgeLogoContainer}>
        <FastImage
          source={stGeorgeLogo}
          style={homeStyles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={[baseStyles.inputLabel, baseStyles.centerText]}>
        St George's Cocktail Competition at 5 Oakland bars
      </Text>
      <Btn
        onPress={() =>
          navigation.navigate('Events', {
            screen: 'EventDetail',
            params: {id: ST_GEORGE_ID},
          })
        }>
        <Text>Event Info</Text>
      </Btn>
    </View>
  );
};

export default StGeorge;
