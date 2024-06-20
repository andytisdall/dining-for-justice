import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../state/store';

import {clearError} from '../../state/apis/slices/errorSlice';
import {sizeMultiplier} from '../styles/baseStyles';
import colors from '../styles/colors';

const Error = () => {
  const error = useSelector((state: RootState) => state.error.message);
  const dispatch = useDispatch();
  if (error) {
    return (
      <Pressable
        style={styles.background}
        onPress={() => dispatch(clearError())}>
        <View style={styles.error}>
          <Text style={styles.text}>{error}</Text>
        </View>
      </Pressable>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(200,200,200,.5)',
  },
  error: {
    width: '75%',
    height: 100 * sizeMultiplier,
    justifyContent: 'center',
    backgroundColor: colors.red,
    alignItems: 'center',
    padding: 20 * sizeMultiplier,
    shadowColor: 'black',
    shadowOffset: {width: -1, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
    borderColor: colors.darkRed,
    borderWidth: 3,
  },
  text: {fontSize: 15 * sizeMultiplier},
});

export default Error;
