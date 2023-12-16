import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Pressable, Animated, StyleSheet, View, Text} from 'react-native';
import {useRef} from 'react';
import {getHeaderTitle} from '@react-navigation/elements';

import colors from '../styles/colors';
import {sizeMultiplier} from '../styles/baseStyles';

const StackHeader = ({navigation, route, options}: NativeStackHeaderProps) => {
  const translateValue = useRef(new Animated.Value(0)).current;

  const title = getHeaderTitle(options, route.name);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        {!options.headerBackVisible && (
          <Animated.View
            style={[
              {
                transform: [{translateY: translateValue}],
              },
              styles.arrow,
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
              style={styles.btn}
              onPress={() => navigation.goBack()}>
              {/* <Image style={styles.image} source={backIcon} /> */}
              <Text style={styles.arrowText}>&larr;</Text>
            </Pressable>
          </Animated.View>
        )}

        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        {!options.headerBackVisible && <View style={styles.btn} />}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  headerContainer: {
    padding: 2 * sizeMultiplier,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    backgroundColor: colors.grey,
    paddingHorizontal: 10,
    paddingVertical: 5 * sizeMultiplier,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.lightGrey,
  },
  btn: {
    height: 40 * sizeMultiplier,
    width: 40 * sizeMultiplier,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    width: '70%',
    height: '100%',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 25 * sizeMultiplier,
    color: 'white',
    textAlign: 'center',
  },
  arrow: {
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: colors.blue,
    borderColor: colors.darkBlue,
    marginLeft: 10,
    height: 40 * sizeMultiplier,
    width: 40 * sizeMultiplier,
  },
  arrowText: {
    textAlign: 'center',
    marginTop: 1,
    fontSize: 30 * sizeMultiplier,
  },
});

export default StackHeader;
