import { Text } from 'react-native';

import styles from './styles';
import { sizeMultiplier } from '../../styles/baseStyles';

type TabLabelProps = { focused: boolean; color: string };

const createTabLabel = (name: string) => {
  let labelSize = { fontSize: (140 / name.length) * sizeMultiplier };
  if (labelSize.fontSize > 14) {
    labelSize = { fontSize: 14 };
  }

  const TabLabel = ({ focused, color }: TabLabelProps) => {
    const style: any[] = [styles.tabLabel, { color }, labelSize];
    if (focused) {
      style.push(styles.focusedText);
    }
    return <Text style={style}>{name}</Text>;
  };
  return TabLabel;
};

export default createTabLabel;
