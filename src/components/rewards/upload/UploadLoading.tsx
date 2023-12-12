import {Text, View} from 'react-native';
import Loading from '../../reusable/Loading';

import baseStyles from '../../styles/baseStyles';

const UploadLoading = () => {
  return (
    <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
      <Text style={baseStyles.textLg}>Uploading your Receipt</Text>
      <Loading />
    </View>
  );
};

export default UploadLoading;
