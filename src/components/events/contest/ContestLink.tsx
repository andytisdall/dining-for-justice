import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import baseStyles from '../../styles/baseStyles';
import contestStyles from './contestStyles';
import {RootNavigationProp} from '../../../navigation/rootTabs';
import FastImage from 'react-native-fast-image';
import Btn from '../../reusable/Btn';

const styleBtnImg = require('../../../assets/logos/style_btn.png');

const ContestLink = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
      <Btn
        onPress={() =>
          navigation.navigate('Events', {
            screen: 'ContestHome',
            initial: false,
          })
        }
        style={contestStyles.contestLinkBtn}>
        <View style={baseStyles.centerSection}>
          <FastImage
            source={styleBtnImg}
            style={contestStyles.contestLinkBtnImg}
          />
        </View>
        <Text
          style={[baseStyles.centerText, contestStyles.contestLinkBtnText2]}>
          Vote for your favorite cocktail!
        </Text>
      </Btn>
    </View>
  );
};

export default ContestLink;
