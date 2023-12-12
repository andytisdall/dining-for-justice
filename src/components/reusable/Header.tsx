import {View, Text} from 'react-native';

import {styles} from './StackHeader';

const Header = ({title}: {title: string}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
