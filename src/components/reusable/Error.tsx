import type {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import type {SerializedError} from '@reduxjs/toolkit';
import {View, Text} from 'react-native';
import baseStyles from '../styles/baseStyles';

const Error = ({
  error,
}: {
  error: FetchBaseQueryError | SerializedError | undefined;
}) => {
  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg =
        'error' in error ? error.error : JSON.stringify(error.data);

      return (
        <View style={baseStyles.error}>
          <Text>An error has occurred:</Text>
          <Text>{errMsg}</Text>
        </View>
      );
    } else {
      // you can access all properties of `SerializedError` here
      return <Text>{error.message}</Text>;
    }
  }
};

export default Error;
