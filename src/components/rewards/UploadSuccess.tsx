import {View, Text} from 'react-native';

import baseStyles from '../styles/baseStyles';

const UploadSuccess = () => {
  return (
    <View style={baseStyles.screen}>
      <Text style={baseStyles.title}>Upload Successful</Text>
    </View>
  );
};

export default UploadSuccess;
