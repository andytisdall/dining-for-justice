import {View, Text, Image} from 'react-native';
import {PropsWithChildren} from 'react';

import styles from './filterStyles';
import Btn from '../../components/reusable/Btn';
import baseStyles from '../../components/styles/baseStyles';
import filterStyles from './filterStyles';

const filterIcon = (
  <Image
    source={require('../../assets/filterIcon.png')}
    style={styles.filterIcon}
  />
);

const Filter = ({
  filterVisible,
  onPress,
  activeFilters,
}: {
  filterVisible: boolean;
  onPress: () => void;
  activeFilters: number;
} & PropsWithChildren) => {
  const action = filterVisible ? 'Hide' : activeFilters;
  return (
    <View style={styles.filterBtnContainer}>
      <Btn style={styles.filterBtn} onPress={onPress}>
        {filterIcon}
      </Btn>
      <View style={filterStyles.filterTitle}>
        <Text style={[baseStyles.textSm, baseStyles.centerText]}>
          {action} Filters
        </Text>
      </View>
    </View>
  );
};

export default Filter;
