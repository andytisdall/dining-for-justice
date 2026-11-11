import {Text, Animated, Pressable} from 'react-native';
import {useRef, useEffect} from 'react';
import checkInStyles from './checkInStyles';
import baseStyles from '../../../styles/baseStyles';

const SuccessModal = ({onPress}: {onPress: () => void}) => {
  const translateValue = useRef(new Animated.Value(0)).current;

  const openAnimation = Animated.timing(translateValue, {
    toValue: 1,
    duration: 600,
    useNativeDriver: true,
  });

  const closeAnimation = Animated.timing(translateValue, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  useEffect(() => {
    openAnimation.start();
  }, [openAnimation]);

  return (
    <Pressable
      onPress={() => {
        closeAnimation.start(onPress);
      }}
      style={checkInStyles.background}>
      <Animated.View
        style={[{transform: [{scale: translateValue}]}, checkInStyles.content]}>
        <Text style={baseStyles.centerText}>
          You have earned 1 D4J point! Be sure to thank staff for being a part
          of Community Kitchens and helping feed our community.
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default SuccessModal;
