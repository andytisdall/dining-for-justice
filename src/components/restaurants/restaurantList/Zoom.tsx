import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

import restaurantStyles from './restaurantStyles';
import colors from '../../styles/colors';
import baseStyles from '../../styles/baseStyles';

const Zoom = ({
  zoom,
  setZoom,
}: {
  zoom: number;
  setZoom: (z: number) => void;
}) => {
  return (
    <View style={restaurantStyles.zoom}>
      <Text style={baseStyles.textSm}>-</Text>
      <Slider
        value={zoom}
        onValueChange={value => setZoom(value)}
        style={restaurantStyles.zoomSlider}
        minimumValue={1}
        maximumValue={3}
        step={1}
        thumbSize={32}
        maximumTrackTintColor={colors.beige}
        minimumTrackTintColor={colors.green}
      />
      <Text style={baseStyles.textSm}>+</Text>
    </View>
  );
};

export default Zoom;
