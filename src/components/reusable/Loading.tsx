import {ActivityIndicator} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={50 * sizeMultiplier} color={colors.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10 * sizeMultiplier,
  },
});

export default Loading;
