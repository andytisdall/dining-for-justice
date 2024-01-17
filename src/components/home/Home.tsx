import {View, Text, Image, ScrollView, Linking} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import ScreenBackground from '../reusable/ScreenBackground';
import baseStyles from '../styles/baseStyles';
import Header from '../reusable/Header';
import homeStyles from './homeStyles';
import {useGetTotalMealsQuery} from '../../state/apis/impactApi/impactApi';
import Loading from '../reusable/Loading';
import Btn from '../reusable/Btn';
import {RootTabsParams} from '../../../App';

const orwLogo = require('../../assets/orw-logo.png');

type HomeScreenProps = NativeStackScreenProps<RootTabsParams, 'Home'>;

const Home = ({navigation}: HomeScreenProps) => {
  const {data: meals, isLoading} = useGetTotalMealsQuery();

  const totalMeals =
    meals?.total.toString().slice(0, 3) +
    ',' +
    meals?.total.toString().slice(3);

  const renderTotalMeals = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (totalMeals) {
      return (
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <Text style={[baseStyles.text, baseStyles.centerText]}>
            Total Free Meals Served by Community Kitchens
          </Text>
          <Text style={homeStyles.totalMeals}>{totalMeals}</Text>
        </View>
      );
    }
  };
  return (
    <ScrollView contentContainerStyle={[baseStyles.scrollView]}>
      <ScreenBackground>
        <Header title="Home" />
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <View style={[homeStyles.logoContainer, baseStyles.centerSection]}>
            <Image source={orwLogo} style={homeStyles.logo} />
          </View>
          <Text style={[baseStyles.inputLabel, baseStyles.centerText]}>
            Visit Dining for Justice restaurants during Oakland Restaurant Week
            for a chance to win prizes
          </Text>
          <Text style={[baseStyles.text, baseStyles.centerText]}>
            3/14 - 3/24
          </Text>
          <Btn onPress={() => navigation.navigate('Rewards')}>
            <Text style={baseStyles.btnText}>More Info</Text>
          </Btn>
        </View>

        {renderTotalMeals()}
        <View style={baseStyles.centerSection}>
          <Btn
            style={homeStyles.donateBtn}
            onPress={() => Linking.openURL('https://www.ckoakland.org/donate')}>
            <Text style={homeStyles.donateBtnText}>Donate Now</Text>
          </Btn>
        </View>
      </ScreenBackground>
    </ScrollView>
  );
};

export default Home;
