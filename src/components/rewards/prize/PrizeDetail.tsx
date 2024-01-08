import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState, useEffect} from 'react';

import {RewardsStackParams} from '../RewardsNavigator';
import {ScrollView, Text, View} from 'react-native';
import Btn from '../../reusable/Btn';
import baseStyles from '../../styles/baseStyles';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import {useGetContactQuery} from '../../../state/apis/contact/contactApi';
import Points from '../Points';
import {useRedeemPointsMutation} from '../../../state/apis/rewardsApi/prizeApi';
import Loading from '../../reusable/Loading';
import RestaurantDropdown from '../RestaurantDropdown';
import prizeStyles from './prizeStyles';

type RewardsScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'PrizeDetail'
>;

const prizes = {
  giftCert: {points: 5, title: '$50 Gift Certificate'},
};

const PrizeDetail = ({route, navigation}: RewardsScreenProps) => {
  const [restaurantId, setRestaurantId] = useState('');

  const {data: contact} = useGetContactQuery();

  const {name} = route.params;
  const prize = prizes[name];

  const {data: restaurants} = useGetRestaurantsQuery();
  const [redeemPoints, {isLoading}] = useRedeemPointsMutation();

  const insufficientPoints =
    contact?.d4jPoints !== undefined && prize.points > contact.d4jPoints;

  useEffect(
    () => navigation.setOptions({headerTitle: prize.title}),
    [navigation, prize],
  );

  const dropdown = () => {
    if (name === 'giftCert') {
      return (
        <View style={baseStyles.screenSection}>
          <Text style={baseStyles.inputLabel}>
            Select which restaurant you want a $50 gift certificate for:
          </Text>
          <RestaurantDropdown
            restaurantId={restaurantId}
            setRestaurantId={setRestaurantId}
          />
        </View>
      );
    }
  };

  const renderError = () => {
    if (insufficientPoints) {
      return (
        <View style={baseStyles.screenSection}>
          <View style={prizeStyles.prizeError}>
            <Text style={[baseStyles.textSm, baseStyles.centerText]}>
              You do not have enough points to redeem this prize.
            </Text>
          </View>
        </View>
      );
    }
  };

  if (!prize) {
    return (
      <View>
        <Text>Could not find prize details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={baseStyles.screen}>
      <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
        <Text style={baseStyles.text}>
          Redeeming {prize.points} points for:
        </Text>
        <Text style={baseStyles.textLg}>{prize.title}</Text>
        <View style={baseStyles.centerSection}>
          {dropdown()}
          <Points />
          {renderError()}
          {isLoading ? (
            <Loading />
          ) : (
            <Btn
              onPress={() => {
                const restaurantIndex = restaurants?.findIndex(
                  r => r.id === restaurantId,
                );
                if (restaurants && restaurantIndex) {
                  redeemPoints({
                    prize: name,
                    restaurantName: restaurants[restaurantIndex].name,
                  })
                    .unwrap()
                    .then(() => navigation.navigate('PrizeSuccess'));
                }
              }}
              disabled={
                insufficientPoints || (name === 'giftCert' && !restaurantId)
              }>
              <Text style={baseStyles.btnText}>Confirm</Text>
            </Btn>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default PrizeDetail;
