import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Image, Pressable, Animated, StyleSheet, View, Text} from 'react-native';
import {useRef} from 'react';
import {getHeaderTitle} from '@react-navigation/elements';

import colors from '../styles/colors';

const backIcon = require('../../assets/backIcon.png');

const StackHeader = ({navigation, route, options}: NativeStackHeaderProps) => {
  const translateValue = useRef(new Animated.Value(0)).current;

  const title = getHeaderTitle(options, route.name);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        {!options.headerBackVisible && (
          <Animated.View style={{transform: [{translateY: translateValue}]}}>
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
              <Image style={styles.image} source={backIcon} />
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
    padding: 2,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    backgroundColor: colors.grey,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.lightGrey,
  },
  btn: {
    height: 40,
    width: 40,
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
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
});

export default StackHeader;
