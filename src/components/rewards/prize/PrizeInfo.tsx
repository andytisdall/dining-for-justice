import {FlatList} from 'react-native';

import ScreenBackground from '../../reusable/ScreenBackground';
import Points from '../pastVisits/Points';
import Prizes from './Prizes';
import baseStyles from '../../styles/baseStyles';

const PrizeInfo = () => {
  return (
    <ScreenBackground>
      <FlatList
        data={[<Points />, <Prizes />]}
        renderItem={({item}) => item}
        contentContainerStyle={baseStyles.scrollView}
      />
    </ScreenBackground>
  );
};

export default PrizeInfo;
