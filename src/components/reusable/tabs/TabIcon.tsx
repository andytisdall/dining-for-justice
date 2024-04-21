import {Image, View} from 'react-native';

import styles from './styles';

type TabIconProps = {focused: boolean; color: string; size: number};

const tabImages = {
  home: require('../../../assets/homeIcon.webp'),
  restaurants: require('../../../assets/restaurantIcon.png'),
  rewards: require('../../../assets/dollarIcon.webp'),
  events: require('../../../assets/cal.jpg'),
  contest: require('../../../assets/cocktailIcon.png'),
};

const createTabIcon = (
  icon: 'home' | 'restaurants' | 'rewards' | 'events' | 'contest',
) => {
  const TabIcon = ({size, focused}: TabIconProps) => {
    const style: any[] = [styles.tabIconContainer, {height: size, width: size}];
    if (focused) {
      style.push(styles.focusedIcon);
    }

    return (
      <View style={style}>
        <Image style={styles.tabIcon} source={tabImages[icon]} alt="Text" />
      </View>
    );
  };
  return TabIcon;
};

export default createTabIcon;
