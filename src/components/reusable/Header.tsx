import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../styles/colors';
import {styles} from './StackHeader';

const Header = ({title}: {title: string}) => {
  return (
    <View style={styles.headerContainer}>
      <LinearGradient
        style={styles.header}
        colors={[colors.grey, colors.darkGrey, 'black']}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Header;
