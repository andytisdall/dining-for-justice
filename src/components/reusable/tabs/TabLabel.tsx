import {Text} from 'react-native';

import styles from './styles';

type TabLabelProps = {focused: boolean; color: string};

const createTabLabel = (name: string) => {
  const TabLabel = ({focused, color}: TabLabelProps) => {
    const style: any[] = [styles.tabLabel, {color}];
    if (focused) {
      style.push(styles.focusedText);
    }
    return <Text style={style}>{name}</Text>;
  };
  return TabLabel;
};

export default createTabLabel;
