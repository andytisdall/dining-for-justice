import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMemo, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {RewardsStackParams} from './RewardsNavigator';
import {ScrollView, Text, View} from 'react-native';
import Btn from '../reusable/Btn';
import baseStyles from '../styles/baseStyles';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import uploadStyles from './upload/uploadStyles';
import {useGetContactQuery} from '../../state/apis/contact/contactApi';
import Points from './Points';
import rewardsStyles from './rewardsStyles';
import {useRedeemPointsMutation} from '../../state/apis/rewardsApi/prizeApi';
import Loading from '../reusable/Loading';

type RewardsScreenProps = NativeStackScreenProps<
  RewardsStackParams,
  'PrizeDetail'
>;

const prizes = {
  giftCert: {points: 5, title: '$50 Gift Certificate'},
};

const PrizeDetail = ({route}: RewardsScreenProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [restaurantName, setRestaurantName] = useState('');

  const {data: contact} = useGetContactQuery();

  const {name} = route.params;
  const prize = prizes[name];

  const {data: restaurants} = useGetRestaurantsQuery();
  const [redeemPoints, {isLoading}] = useRedeemPointsMutation();

  const restaurantOptions = useMemo(() => {
    if (restaurants) {
      return [...restaurants]
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .map(rest => {
          return {label: rest.name, value: rest.name};
        });
    }
    return [];
  }, [restaurants]);

  const dropdown = () => {
    if (name === 'giftCert') {
      return (
        <View style={baseStyles.screenSection}>
          <Text style={baseStyles.inputLabel}>
            Select which restaurant you want a $50 gift certificate for:
          </Text>
          <DropDownPicker
            open={dropdownOpen}
            setOpen={setDropdownOpen}
            items={restaurantOptions}
            value={restaurantName || null}
            setValue={setRestaurantName}
            listMode="MODAL"
            style={uploadStyles.dropdown}
            placeholder="Select restaurant"
            placeholderStyle={uploadStyles.dropdownPlaceholder}
            textStyle={uploadStyles.dropdownPlaceholder}
          />
        </View>
      );
    }
  };

  const renderError = () => {
    if (contact?.d4jPoints !== undefined && prize.points > contact.d4jPoints) {
      return (
        <View style={rewardsStyles.prizeError}>
          <Text style={[baseStyles.textSm, baseStyles.centerText]}>
            You do not have enough points to redeem this prize.
          </Text>
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
              onPress={() => redeemPoints({prize: name, restaurantName})}
              disabled={name === 'giftCert' && !restaurantName}>
              <Text style={baseStyles.btnText}>Confirm</Text>
            </Btn>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default PrizeDetail;
