import {View, Text, Pressable, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRef, useEffect} from 'react';

import baseStyles from '../../styles/baseStyles';
import contestStyles from './contestStyles';
import {RootNavigationProp} from '../../../navigation/rootTabs';
import FastImage from 'react-native-fast-image';

const styleBtnImg = require('../../../assets/logos/style_btn.png');

const ContestLink = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const translateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateValue, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 15,
      speed: 0.3,
    }).start();
  }, [translateValue]);

  const navigate = () => {
    navigation.navigate('Events', {
      screen: 'ContestHome',
      initial: false,
    });
  };

  return (
    <Animated.View
      style={{
        transform: [{scale: translateValue}],
      }}>
      <Pressable
        onPress={navigate}
        style={[baseStyles.centerSection, baseStyles.screenSection]}>
        <View style={contestStyles.contestLinkBtn}>
          <FastImage
            source={styleBtnImg}
            style={contestStyles.contestLinkBtnImg}
          />
        </View>
        <Text style={[baseStyles.centerText, contestStyles.contestLinkBtnText]}>
          Vote for your favorite cocktail here!
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default ContestLink;
