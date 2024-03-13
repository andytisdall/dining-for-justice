import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Pressable, Animated, StyleSheet, View, Text} from 'react-native';
import {useRef} from 'react';
import {getHeaderTitle} from '@react-navigation/elements';
import LinearGradient from 'react-native-linear-gradient';

import Arrow from '../../assets/arrow.svg';
import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';

const StackHeader = ({navigation, route, options}: NativeStackHeaderProps) => {
  const translateValue = useRef(new Animated.Value(0)).current;

  const title = getHeaderTitle(options, route.name);

  return (
    <View style={styles.headerContainer}>
      <LinearGradient
        style={styles.header}
        colors={[colors.grey, colors.darkGrey, 'black']}>
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
        {options.headerBackVisible && <View style={styles.sides} />}
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
    paddingVertical: 7 * sizeMultiplier,
    flexDirection: 'row',
    alignItems: 'center',
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
    height: '100%',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25 * sizeMultiplier,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'IBMPlexSerif-SemiBold',
  },
  btn: {
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: colors.blue,
    borderColor: colors.nightBlue,
    marginLeft: 10,
    height: 40 * sizeMultiplier,
    width: 40 * sizeMultiplier,
    position: 'relative',
  },
  pressable: {width: '100%', height: '100%'},
  sides: {flex: 1},
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
