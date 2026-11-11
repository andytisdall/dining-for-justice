import {View, Text} from 'react-native';
import {PropsWithChildren} from 'react';

import {useGetPointsQuery} from '../../../state/apis/rewardsApi/checkInApi';
import baseStyles from '../../styles/baseStyles';
import rewardsStyles from './../rewardsStyles';
import Loading from '../../reusable/Loading';

const Points = ({children}: PropsWithChildren) => {
  const {data: checkIns, isLoading} = useGetPointsQuery();

  return (
    <View style={[baseStyles.centerSection]}>
      <View style={[baseStyles.screenSection, rewardsStyles.pointsSummary]}>
        {isLoading ? (
          <Loading />
        ) : (
          <Text style={baseStyles.inputLabel}>
            You have {checkIns?.length || '0'} D4J Points
          </Text>
        )}
      </View>

      <View>{children}</View>
    </View>
  );
};

export default Points;
