import {View, Text} from 'react-native';

import {useGetContactQuery} from '../../state/apis/contact/contactApi';
import baseStyles from '../styles/baseStyles';
import rewardsStyles from './rewardsStyles';
import {PropsWithChildren} from 'react';

const Points = ({children}: PropsWithChildren) => {
  const {data: contact} = useGetContactQuery();

  return (
    <View style={[baseStyles.centerSection]}>
      <View style={[baseStyles.screenSection, rewardsStyles.pointsSummary]}>
        <Text style={baseStyles.textSm}>
          You have {contact?.d4jPoints || 0} D4J Points
        </Text>
      </View>

      <View>{children}</View>
    </View>
  );
};

export default Points;
