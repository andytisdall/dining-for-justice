import {View, Text, Pressable, StyleSheet} from 'react-native';

import RefreshIcon from '../../assets/refresh.svg';
import baseStyles from '../styles/baseStyles';

const Refresh = ({refetch}: {refetch: () => void}) => {
  return (
    <View style={baseStyles.screenSection}>
      <Pressable onPress={refetch} style={styles.refresh}>
        <Text style={baseStyles.textXSm}>Try Again</Text>
        <RefreshIcon style={styles.icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  refresh: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    marginTop: 10,
    maxHeight: 40,
  },
});

export default Refresh;
