import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Pressable, ScrollView, Text, View} from 'react-native';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';

import prizeStyles from './prizeStyles';
import Points from '../Points';

import {RewardsStackParams} from '../RewardsNavigator';
import ScreenBackground from '../../reusable/ScreenBackground';

type RewardsScreenProps = NativeStackScreenProps<RewardsStackParams, 'Prizes'>;

const ORWPrize = ({navigation}: RewardsScreenProps) => {
  return (
    <ScrollView contentContainerStyle={baseStyles.scrollView}>
      <ScreenBackground>
        <Points />

        <View style={baseStyles.screenSection}>
          <Text style={baseStyles.text}>
            On Wednesday, March 27th, prizes will be drawn for the ORW '24
            raffle. Each D4J point is a chance to win! Here are the available
            prizes:
          </Text>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate('PrizeDetail', {name: 'giftCert'})
          }>
          {({pressed}) => {
            const pressedStyle = getPressedStyle(pressed);
            return (
              <View
                style={[
                  pressedStyle,
                  baseStyles.screenSection,
                  prizeStyles.prize,
                ]}>
                <View style={[baseStyles.row]}>
                  <Text style={[baseStyles.text, prizeStyles.prizePoints]}>
                    5 points:
                  </Text>
                  <Text style={baseStyles.textSm}>Gift Certificate</Text>
                </View>
                <Text style={[baseStyles.textSm, prizeStyles.prizeDescription]}>
                  Get a $50 gift certificate to any current Dining for Justice
                  restaurant
                </Text>
              </View>
            );
          }}
        </Pressable>
        <View style={[baseStyles.screenSection, prizeStyles.prize]}>
          <View style={baseStyles.row}>
            <Text style={[baseStyles.text, prizeStyles.prizePoints]}>
              10 points:
            </Text>
            <Text style={baseStyles.textSm}>Private Dinner</Text>
          </View>
          <Text style={[baseStyles.textSm, prizeStyles.prizeDescription]}>
            Private dinner with any personage living or dead
          </Text>
        </View>
      </ScreenBackground>
    </ScrollView>
  );
};

export default ORWPrize;
