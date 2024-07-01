import {View, FlatList, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMemo} from 'react';

import {RestaurantStackNavigationProp} from '../../../navigation/types';
import {Restaurant} from '../../../state/apis/restaurantApi/restaurantApi';
import {userIsWithinRange} from '../restaurantDetail/checkIn/CheckIn';
import restaurantStyles from './restaurantStyles';
import baseStyles, {getPressedStyle} from '../../styles/baseStyles';
import {
  useGetLocationQuery,
  // useGetPermissionMutation,
} from '../../../state/apis/rewardsApi/locationApi';
import FastImage from 'react-native-fast-image';

const RestaurantDetector = ({restaurants}: {restaurants: Restaurant[]}) => {
  // const [open, setOpen] = useState(false);
  const {data: location} = useGetLocationQuery();
  // const [getPermission] = useGetPermissionMutation();

  const navigation = useNavigation<RestaurantStackNavigationProp>();

  const restaurantsWithinRange = useMemo(() => {
    return restaurants.filter(
      rest =>
        rest.coords && location && userIsWithinRange(rest.coords, location),
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

  // const text = open
  //   ? 'To check in to a location, go to one of the bars or restaurants below, select that location from this list, and hit the check-in button'
  //   : 'Check in to win prizes!';

  // const style = open
  //   ? restaurantStyles.restaurantDetectorOpen
  //   : restaurantStyles.restaurantDetectorClosed;

  // const textStyle = open
  //   ? restaurantStyles.restaurantDetectorTextOpen
  //   : undefined;

  if (restaurantsWithinRange.length) {
    return (
      <View style={[restaurantStyles.restaurantDetectorOpen]}>
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <Text style={baseStyles.text}>Check in now at:</Text>
          <FlatList
            data={restaurantsWithinRange}
            renderItem={renderItem}
            contentContainerStyle={[
              baseStyles.centerSection,
              baseStyles.screenSection,
            ]}
          />
        </View>
      </View>
    );
  }

  return (
    // <Pressable
    //   onPress={() => {
    //     setOpen(!open);
    //     getPermission();
    //   }}
    //   style={[baseStyles.screenSection, style]}>
    //   <Text style={[baseStyles.btnTextSm, baseStyles.centerText, textStyle]}>
    //     {text}
    //   </Text>
    // </Pressable>
    <View />
  );
};

export default RestaurantDetector;
