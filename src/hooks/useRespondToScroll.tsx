import {useState, PropsWithChildren, useCallback} from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  StyleSheet,
} from 'react-native';

const useRespondToScroll = (
  height: number,
): [
  (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
  ({children}: PropsWithChildren) => React.JSX.Element,
] => {
  const [show, setShow] = useState(false);
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollDistance = event.nativeEvent.contentOffset.y;
    if (scrollDistance > height && !show) {
      setShow(true);
    }
    if (scrollDistance < height && show) {
      setShow(false);
    }
  };

  const PopUp = useCallback(
    ({children}: PropsWithChildren) => {
      return <View style={styles.popUp}>{show && children}</View>;
    },
    [show],
  );

  return [onScroll, PopUp];
};

const styles = StyleSheet.create({
  popUp: {
    position: 'absolute',
    zIndex: 10,
    alignSelf: 'center',
  },
});

export default useRespondToScroll;
