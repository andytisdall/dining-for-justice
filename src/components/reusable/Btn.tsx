import {StyleSheet, Pressable, Animated, View} from 'react-native';
import {ReactNode, useRef} from 'react';

interface BtnProps {
  style?: Record<string, any> | Record<string, any>[];
  children: ReactNode;
  onPress: () => void;
  onError?: () => void;
  disabled?: boolean;
}

const Btn = ({style, children, onPress, disabled, onError}: BtnProps) => {
  const translateValue = useRef(new Animated.Value(0)).current;

  const btnStyle = [styles.btn, style];
  if (disabled) {
    btnStyle.push(styles.btnDisabled);
  }

  const filterStyle: any[] = [styles.filterStyle];

  return (
    <Animated.View style={{transform: [{translateY: translateValue}]}}>
      <Pressable
        onPressIn={() => {
          if (!disabled) {
            Animated.timing(translateValue, {
              toValue: 4,
              duration: 50,
              useNativeDriver: true,
            }).start();
          }
        }}
        onPressOut={() =>
          Animated.timing(translateValue, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }).start()
        }
        onPress={() => {
          if (!disabled) {
            onPress();
          }
          if (disabled && onError) {
            onError();
          }
        }}
        style={btnStyle}>
        {({pressed}) => {
          if (pressed && !disabled) {
            filterStyle.push(styles.btnPressed);
          }
          return <View style={filterStyle}>{children}</View>;
        }}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(150, 200, 150, 1)',
    overflow: 'hidden',
    alignSelf: 'baseline',
    margin: 10,
  },
  filterStyle: {
    padding: 10,
  },
  btnPressed: {
    backgroundColor: 'rgba(250,250,250,.3)',
  },
  btnContainerPressed: {},
  btnDisabled: {backgroundColor: 'rgb(130,130,130)'},
});

export default Btn;
