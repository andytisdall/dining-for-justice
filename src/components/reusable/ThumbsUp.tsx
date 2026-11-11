import {StyleSheet, Animated} from 'react-native';
import {useRef} from 'react';

import Thumb from '../../assets/thumb.svg';
import {sizeMultiplier} from '../styles/baseStyles';

const ThumbsUp = () => {
  const translateValue = useRef(new Animated.Value(0)).current;

  Animated.timing(translateValue, {
    toValue: 3,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View
      style={[styles.container, {transform: [{scale: translateValue}]}]}>
      <Thumb height={60 * sizeMultiplier} width={60 * sizeMultiplier} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ThumbsUp;
