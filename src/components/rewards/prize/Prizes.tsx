import {Text, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

import baseStyles from '../../styles/baseStyles';
import PrizeCard from './PrizeCard';
import Btn from '../../reusable/Btn';
import {
  useGetPrizesQuery,
  Prize,
} from '../../../state/apis/rewardsApi/contestApi';
import Loading from '../../reusable/Loading';
import {RewardsStackNavigationProp} from '../../../navigation/types';

const Prizes = () => {
  const {data: prizes, isLoading} = useGetPrizesQuery();

  const navigation = useNavigation<RewardsStackNavigationProp>();

  const renderItem = useCallback(({item}: {item: Prize}) => {
    return (
      <PrizeCard
        title={item.title}
        description={item.description}
        photo={item.photo}
      />
    );
  }, []);

  return (
    <View style={baseStyles.screenSection}>
      <Text style={[baseStyles.textLg, baseStyles.centerText]}>
        Each D4J point is a chance to win!
      </Text>
      <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
        <Btn onPress={() => navigation.navigate('Rules')}>
          <Text style={baseStyles.btnText}>Contest Rules</Text>
        </Btn>
        <Text style={[baseStyles.centerText, baseStyles.textSm]}>
          To check in when you're at a bar or restaurant, go to the "Explore"
          tab at the bottom of your screen, and find your location.
        </Text>
      </View>
      {isLoading && <Loading />}
      {prizes && <FlatList data={prizes} renderItem={renderItem} />}
    </View>
  );
};

export default Prizes;
