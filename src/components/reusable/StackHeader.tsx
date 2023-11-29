import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Image, Pressable, Animated, StyleSheet, View, Text} from 'react-native';
import {useRef} from 'react';
import {getHeaderTitle} from '@react-navigation/elements';

import baseStyles from '../styles/baseStyles';
import colors from '../styles/colors';

const backIcon = require('../../assets/backIcon.png');

const StackHeader = ({navigation, route, options}: NativeStackHeaderProps) => {
  const translateValue = useRef(new Animated.Value(0)).current;

  const title = getHeaderTitle(options, route.name);

  return (
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
        <Text style={baseStyles.title}>{title}</Text>
      </View>

      {!options.headerBackVisible && <View style={styles.btn} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: colors.darkGrey,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: 40,
    width: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {width: '75%', height: '100%', paddingHorizontal: 5, paddingBottom: 5},
});

export default StackHeader;
