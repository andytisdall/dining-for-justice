import {View, Text} from 'react-native';
import {PropsWithChildren} from 'react';

import Btn from '../../reusable/Btn';
import restaurantStyles from '../restaurantList/restaurantStyles';
import baseStyles from '../../styles/baseStyles';

const MapHeader = ({
  resetMap,
  children,
  onLocationPress,
}: {resetMap: () => void; onLocationPress: () => void} & PropsWithChildren) => {
  return (
    <View style={restaurantStyles.listHeader}>
      <Btn onPress={onLocationPress}>
        <Text style={baseStyles.btnTextSm}>My Location</Text>
      </Btn>
      <Btn onPress={resetMap}>
        <Text style={baseStyles.btnTextSm}>Reset Map</Text>
      </Btn>
      {children}
    </View>
  );
};

export default MapHeader;
