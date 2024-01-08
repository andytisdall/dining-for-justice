import {View, Text, Image, ScrollView, Linking} from 'react-native';

import ScreenBackground from '../reusable/ScreenBackground';
import baseStyles from '../styles/baseStyles';
import Header from '../reusable/Header';
import homeStyles from './homeStyles';
import {useGetTotalMealsQuery} from '../../state/apis/impactApi/impactApi';
import Loading from '../reusable/Loading';
import Btn from '../reusable/Btn';

const orwLogo = require('../../assets/orw-logo.png');

const Home = () => {
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
            Total Meals Served by the CK Free Meal Program:
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
        <View style={baseStyles.screenSection}>
          <View style={[homeStyles.logoContainer, baseStyles.centerSection]}>
            <Image source={orwLogo} style={homeStyles.logo} />
          </View>
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
