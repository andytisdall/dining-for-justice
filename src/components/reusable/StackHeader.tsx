import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Pressable, Animated, StyleSheet, View, Text} from 'react-native';
import {useRef} from 'react';
import {getHeaderTitle} from '@react-navigation/elements';
import Arrow from '../../assets/arrow.svg';
import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';

export const TITLE_FONT = 'Alice';

const StackHeader = ({navigation, route, options}: NativeStackHeaderProps) => {
  const translateValue = useRef(new Animated.Value(0)).current;

  const title = getHeaderTitle(options, route.name);

  return (
    <View style={styles.header}>
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
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.pressable}>
            <Arrow style={[styles.arrow]} />
          </Pressable>
        </Animated.View>
      )}

      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10 * sizeMultiplier,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.darkGrey,
    backgroundColor: colors.orange,
    minHeight: 50 * sizeMultiplier,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    transform: [{translateX: sizeMultiplier * 10}],
  },
  titleText: {
    fontSize: 22 * sizeMultiplier,
    color: 'black',
    fontFamily: TITLE_FONT,
    textAlign: 'center',
    lineHeight: 20 * sizeMultiplier,
    paddingTop: 5,
  },
  btn: {
    borderWidth: 2,
    borderRadius: 50 * sizeMultiplier,
    backgroundColor: colors.beige,
    borderColor: 'black',
    marginLeft: 10,
    height: 35 * sizeMultiplier,
    width: 35 * sizeMultiplier,
    position: 'absolute',
    left: 5 * sizeMultiplier,
  },
  pressable: {width: '100%', height: '100%'},
  arrow: {
    transform: [
      {rotate: '180deg'},
      {translateX: 10.5 * sizeMultiplier},
      {translateY: -6.5 * sizeMultiplier},
    ],
    maxHeight: 20 * sizeMultiplier,
    maxWidth: 20 * sizeMultiplier,
    position: 'absolute',
    left: '50%',
  },
});

export default StackHeader;
