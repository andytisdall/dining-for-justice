import {View, Text, Image, ScrollView} from 'react-native';
// import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import baseStyles from '../styles/baseStyles';
import Header from '../reusable/Header';
import homeStyles from './homeStyles';
import {useGetTotalMealsQuery} from '../../state/apis/impactApi/impactApi';
import Loading from '../reusable/Loading';
// import {RootTabsParams} from '../../../App';

// type HomeProps = BottomTabScreenProps<RootTabsParams, 'Home'>;

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
          <Text style={baseStyles.text}>
            Total Meals Served by the CK Free Meal Program:
          </Text>
          <Text style={homeStyles.totalMeals}>{totalMeals}</Text>
        </View>
      );
    }
  };
  return (
    <ScrollView contentContainerStyle={[baseStyles.scrollView]}>
      <View style={baseStyles.screen}>
        <Header title="Home" />
        <View style={baseStyles.screenSection}>
          <View style={[homeStyles.logoContainer, baseStyles.centerSection]}>
            <Image
              source={require('../../assets/d4j-logo.jpg')}
              style={homeStyles.logo}
            />
          </View>
        </View>

        {renderTotalMeals()}
      </View>
    </ScrollView>
  );
};

export default Home;
