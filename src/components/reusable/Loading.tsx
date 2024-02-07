import {ActivityIndicator} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

import colors from '../styles/colors';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default Loading;
