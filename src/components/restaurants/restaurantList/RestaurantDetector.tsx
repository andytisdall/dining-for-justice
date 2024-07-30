import {View, FlatList, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMemo} from 'react';
import FastImage from 'react-native-fast-image';

import {RestaurantStackNavigationProp} from '../../../navigation/types';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import {userIsWithinRange} from '../restaurantDetail/checkIn/CheckIn';
import restaurantStyles from './restaurantStyles';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import useLocation from '../../../hooks/useLocation';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';

const RestaurantDetector = () => {
  const {data: restaurants} = useGetRestaurantsQuery();

  const location = useLocation();

  const navigation = useNavigation<RestaurantStackNavigationProp>();

  const restaurantsWithinRange = useMemo(() => {
    return restaurants?.filter(
      rest =>
        !rest.closed &&
        rest.coords &&
        location &&
        userIsWithinRange(rest.coords, location),
    );
  }, [location, restaurants]);

  const renderItem = ({item}: {item: Restaurant}) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('RestaurantDetail', {id: item.id})}>
        {({pressed}) => {
          const pressedStyle = getPressedStyle(pressed);
          return (
            <View
              style={[restaurantStyles.restaurantDetectorItem, pressedStyle]}>
              <FastImage
                source={{uri: item.photo}}
                resizeMode="cover"
                style={restaurantStyles.restaurantDetectorPhoto}
              />
              <Text style={baseStyles.textSm}>{item.name}</Text>
            </View>
          );
        }}
      </Pressable>
    );
  };

  if (restaurantsWithinRange?.length) {
    return (
      <View style={[restaurantStyles.restaurantDetectorOpen]}>
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <Text style={baseStyles.text}>Check in now at:</Text>
          <FlatList
            data={restaurantsWithinRange}
            renderItem={renderItem}
            contentContainerStyle={[baseStyles.centerSection]}
          />
        </View>
      </View>
    );
  }

  return <View />;
};

export default RestaurantDetector;
