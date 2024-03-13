import {ScrollView} from 'react-native';

import ScreenBackground from '../../reusable/ScreenBackground';
import Points from '../pastVisits/Points';
import Prizes from './Prizes';
import baseStyles from '../../styles/baseStyles';

const PrizeInfo = () => {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={baseStyles.scrollView}>
        <Points />
        <Prizes />
      </ScrollView>
    </ScreenBackground>
  );
};

export default PrizeInfo;
