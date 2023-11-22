import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../state/store';

import {clearError} from '../../state/apis/slices/errorSlice';
import baseStyles from '../styles/baseStyles';

const Error = () => {
  const error = useSelector((state: RootState) => state.error.message);
  const dispatch = useDispatch();
  if (error) {
    setTimeout(() => dispatch(clearError()), 5000);
    return (
      <View style={baseStyles.error}>
        <Text>{error}</Text>
      </View>
    );
  }
};

export default Error;
