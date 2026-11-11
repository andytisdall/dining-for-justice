import {View} from 'react-native';

import restaurantCalloutStyles from './restaurantCalloutStyles';

const CalloutArrow = () => {
  return (
    <View>
      <View style={restaurantCalloutStyles.calloutArrow} />
      <View
        style={[
          restaurantCalloutStyles.calloutArrow,
          restaurantCalloutStyles.calloutArrowBackground,
        ]}
      />
    </View>
  );
};

export default CalloutArrow;
