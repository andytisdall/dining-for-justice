import {StyleSheet, Animated, Image, View, Easing} from 'react-native';
import {useRef} from 'react';

const AnimatedLoading = () => {
  const translateValue1 = useRef(new Animated.Value(0)).current;
  const translateValue2 = useRef(new Animated.Value(0)).current;
  const translateValue3 = useRef(new Animated.Value(0)).current;

  const rotationValue1 = useRef(new Animated.Value(0)).current;
  const rotationValue2 = useRef(new Animated.Value(0)).current;
  const rotationValue3 = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(translateValue1, {
      toValue: 400,
      duration: 1200,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
  ).start();
  Animated.loop(
    Animated.timing(translateValue2, {
      toValue: 400,
      duration: 2200,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
  ).start();
  Animated.loop(
    Animated.timing(translateValue3, {
      toValue: 400,
      duration: 1600,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
  ).start();

  Animated.loop(
    Animated.timing(rotationValue1, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
  ).start();

  Animated.loop(
    Animated.timing(rotationValue2, {
      toValue: 1,
      duration: 1700,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
  ).start();

  Animated.loop(
    Animated.timing(rotationValue3, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
  ).start();

  const rotation1 = rotationValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotation2 = rotationValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  const rotation3 = rotationValue3.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{translateY: translateValue1}, {rotate: rotation1}],
        }}>
        <Image
          source={require('../../assets/pizza.png')}
          style={styles.pizza}
        />
      </Animated.View>
      <Animated.View
        style={{
          transform: [{translateY: translateValue2}, {rotate: rotation2}],
        }}>
        <Image
          source={require('../../assets/chicken.png')}
          style={styles.pizza}
        />
      </Animated.View>
      <Animated.View
        style={{
          transform: [{translateY: translateValue3}, {rotate: rotation3}],
        }}>
        <Image
          source={require('../../assets/cocktail.png')}
          style={styles.pizza}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pizza: {height: 60, width: 60},
  container: {
    flexDirection: 'row',
    // minHeight: '100%',
    // // flex: 1,
    // borderWidth: 1,
    // borderColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
});

export default AnimatedLoading;
