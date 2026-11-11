import {View, Text} from 'react-native';

import restaurantTagStyles from './restaurantTagStyles';
import baseStyles from '../../../styles/baseStyles';

const TagIcon = ({text}: {text: string}) => {
  return (
    <View style={[restaurantTagStyles.restaurantInfoItem]}>
      <Text style={baseStyles.btnText}>{text}</Text>
    </View>
  );
};

export default TagIcon;
