import {View, Text, ScrollView} from 'react-native';

import ScreenBackground from '../../reusable/ScreenBackground';
import {useGetContestRulesQuery} from '../../../state/apis/rewardsApi/contestApi';
import baseStyles from '../../styles/baseStyles';
import Loading from '../../reusable/Loading';

const ContestRules = () => {
  const {data: contestRules, isLoading} = useGetContestRulesQuery();

  const renderRules = () => {
    return (
      <View style={baseStyles.screenSection}>
        <Text
          style={[
            baseStyles.inputLabel,
            baseStyles.centerText,
            baseStyles.screenSection,
          ]}>
          Community Kitchens Contest Rules
        </Text>
        <View style={baseStyles.screenBorders}>
          <Text style={baseStyles.textSm}>{contestRules?.rules}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={baseStyles.scrollView}>
        {isLoading ? <Loading /> : renderRules()}
      </ScrollView>
    </ScreenBackground>
  );
};

export default ContestRules;
