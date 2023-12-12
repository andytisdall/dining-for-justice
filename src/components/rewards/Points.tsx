import {View, Text} from 'react-native';

import {useGetContactQuery} from '../../state/apis/contact/contactApi';
import baseStyles from '../styles/baseStyles';
import rewardsStyles from './rewardsStyles';
import {PropsWithChildren} from 'react';

const Points = ({children}: PropsWithChildren) => {
  const {data: contact} = useGetContactQuery();

  return (
    <View style={baseStyles.screenBorders}>
      <View style={[baseStyles.screenSection, rewardsStyles.pointsSummary]}>
        <Text style={baseStyles.text}>D4J Points: </Text>
        <Text style={baseStyles.text}>{contact?.d4jPoints || 0}</Text>
      </View>

      <View>{children}</View>
    </View>
  );
};

export default Points;
