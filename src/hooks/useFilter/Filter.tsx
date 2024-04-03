import {View, Text, Image} from 'react-native';
import {PropsWithChildren} from 'react';

import styles from './filterStyles';
import Btn from '../../components/reusable/Btn';
import baseStyles from '../../components/styles/baseStyles';

const filterIcon = (
  <Image
    source={require('../../assets/filterIcon.png')}
    style={styles.filterIcon}
  />
);

const Filter = ({
  filterVisible,
  setFilterVisible,
  children,
}: {
  filterVisible: boolean;
  setFilterVisible: (visible: boolean) => void;
} & PropsWithChildren) => {
  if (filterVisible) {
    return (
      <View>
        <View style={styles.filterBtnContainer}>
          <Btn
            style={styles.filterBtn}
            onPress={() => {
              setFilterVisible(false);
            }}>
            {filterIcon}
          </Btn>
          <Text style={baseStyles.textSm}>Hide Filters</Text>
        </View>

        <View style={styles.filterCheckboxes}>{children}</View>
      </View>
    );
  } else {
    return (
      <View style={styles.filterBtnContainer}>
        <Btn onPress={() => setFilterVisible(true)} style={styles.filterBtn}>
          {filterIcon}
        </Btn>
        <Text style={baseStyles.textSm}>Show Filters</Text>
      </View>
    );
  }
};

export default Filter;
