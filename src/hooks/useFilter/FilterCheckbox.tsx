import {View, Text} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import styles from './filterStyles';
import baseStyles from '../../components/styles/baseStyles';

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
        size={25}
      />
      <Text style={[baseStyles.textXSm, styles.filterLabel]}>{label}</Text>
    </View>
  );
};

export default FilterCheckbox;
