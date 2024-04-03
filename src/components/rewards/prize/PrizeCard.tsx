import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import baseStyles from '../../styles/baseStyles';
import prizeStyles from './prizeStyles';

const PrizeCard = ({
  photo,
  title,
  description,
}: {
  photo: string;
  title: string;
  description: string;
}) => {
  return (
    <View style={[baseStyles.screenBorders, baseStyles.centerSection]}>
      <Text style={[baseStyles.inputLabel, baseStyles.centerText]}>
        {title}
      </Text>
      <View style={prizeStyles.prizePhotoContainer}>
        <FastImage
          style={prizeStyles.prizePhoto}
          resizeMode="cover"
          source={{uri: photo}}
        />
      </View>
      <Text style={[baseStyles.textSm, baseStyles.centerText]}>
        {description}
      </Text>
    </View>
  );
};

export default PrizeCard;
