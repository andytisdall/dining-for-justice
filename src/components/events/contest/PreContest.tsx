import baseStyles from '../../styles/baseStyles';
import { View, Text } from 'react-native';

const PreContest = () => {
  return (
    <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
      <Text style={[baseStyles.text, baseStyles.centerText]}>
        The cocktail contest will be held October 7, 2026 between 5:30pm -
        8:00pm. Check back here to vote at that time.
      </Text>
    </View>
  );
};

export default PreContest;
