import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Pressable, Animated, StyleSheet, View, Text} from 'react-native';
import {useRef} from 'react';
import {getHeaderTitle} from '@react-navigation/elements';
import LinearGradient from 'react-native-linear-gradient';

import Arrow from '../../assets/arrow.svg';
import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';

const font = 'Rhodium Libre';

const StackHeader = ({navigation, route, options}: NativeStackHeaderProps) => {
  const translateValue = useRef(new Animated.Value(0)).current;

  const title = getHeaderTitle(options, route.name);

  return (
    <View style={styles.headerContainer}>
      <LinearGradient
        style={styles.header}
        colors={['rgb(60,60,120)', 'rgb(30,40,70)']}>
        {options.headerBackVisible && (
          <Animated.View
            style={[
              {
                transform: [{translateY: translateValue}],
              },
              styles.btn,
            ]}>
            <Pressable
              onPressIn={() => {
                Animated.timing(translateValue, {
                  toValue: 4,
                  duration: 50,
                  useNativeDriver: true,
                }).start();
              }}
              onPressOut={() =>
                Animated.timing(translateValue, {
                  toValue: 0,
                  duration: 50,
                  useNativeDriver: true,
                }).start()
              }
              onPress={() => navigation.goBack()}
              style={styles.pressable}>
              <Arrow style={[styles.arrow]} />
            </Pressable>
          </Animated.View>
        )}

        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export const styles = StyleSheet.create({
  headerContainer: {
    padding: 1 * sizeMultiplier,
    backgroundColor: colors.lightGrey,
  },
  header: {
    width: '100%',
    backgroundColor: colors.grey,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.darkGrey,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 24 * sizeMultiplier,
    color: 'white',
    fontFamily: font,
    textAlign: 'center',
    lineHeight: 35 * sizeMultiplier,
    paddingTop: 8,
  },
  btn: {
    borderWidth: 2,
    borderRadius: 50 * sizeMultiplier,
    backgroundColor: colors.lightGrey,
    borderColor: 'white',
    marginLeft: 10,
    height: 40 * sizeMultiplier,
    width: 40 * sizeMultiplier,
    position: 'absolute',
    left: 5 * sizeMultiplier,
  },
  pressable: {width: '100%', height: '100%'},
  arrow: {
    transform: [
      {rotate: '180deg'},
      {translateX: 12.5 * sizeMultiplier},
      {translateY: -6.5 * sizeMultiplier},
    ],
    maxHeight: 25 * sizeMultiplier,
    maxWidth: 23 * sizeMultiplier,
    position: 'absolute',
    left: '50%',
  },
});

export default StackHeader;
