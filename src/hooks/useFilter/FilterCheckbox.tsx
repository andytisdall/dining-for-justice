import {View, Text} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {memo} from 'react';

import styles from './filterStyles';
import baseStyles, {sizeMultiplier} from '../../components/styles/baseStyles';

const FilterCheckbox = ({
  enabled,
  setValue,
  label,
}: {
  enabled: boolean;
  setValue: (newState: boolean) => void;
  label: string;
}) => {
  return (
    <View style={styles.checkbox}>
      <BouncyCheckbox
        onPress={(isChecked: boolean) => setValue(isChecked)}
        isChecked={enabled}
        size={25 * sizeMultiplier}
      />
      <Text style={[baseStyles.textXSm, styles.filterLabel]}>{label}</Text>
    </View>
  );
};

export default memo(FilterCheckbox);
