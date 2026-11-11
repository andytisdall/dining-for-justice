import {View, Text, Pressable} from 'react-native';
import {format} from 'date-fns';

import styles from './styles';
import Arrow from '../../../assets/right-arrow.svg';

const CalendarHeader = ({
  month,
  changeMonth,
}: {
  month: Date;
  changeMonth: (side: 'add' | 'sub' | 'reset') => void;
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.monthHeader}>
        <Pressable
          onPress={() => {
            changeMonth('sub');
          }}
          style={[styles.arrow, styles.left]}>
          <Arrow />
        </Pressable>
        <Text style={styles.monthTitle}>{format(month, 'MMMM yyyy')}</Text>
        <Pressable
          onPress={() => {
            changeMonth('add');
          }}
          style={styles.arrow}>
          <Arrow />
        </Pressable>
      </View>
    </View>
  );
};

export default CalendarHeader;
