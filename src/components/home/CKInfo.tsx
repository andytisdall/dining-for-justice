import {View, Text, Image, Linking} from 'react-native';
import {useMemo} from 'react';

import baseStyles from '../styles/baseStyles';
import homeStyles from './homeStyles';
import AnimatedLoading from '../reusable/AnimatedLoading';
import {useGetTotalMealsQuery} from '../../state/apis/impactApi/impactApi';
import Btn from '../reusable/Btn';

const ckLogo = require('../../assets/ck_logo.png');

const CKInfo = () => {
  const {data: meals, isLoading} = useGetTotalMealsQuery();

  const totalMeals = useMemo(() => {
    return (
      meals?.total.toString().slice(0, 3) +
      ',' +
      meals?.total.toString().slice(3)
    );
  }, [meals]);

  const renderTotalMeals = () => {
    if (isLoading) {
      return <AnimatedLoading />;
    }
    if (meals) {
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
    <View>
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        <View style={[homeStyles.logoContainer]}>
          <Image source={ckLogo} style={homeStyles.logo} />
        </View>
        <View style={[baseStyles.screenBorders, baseStyles.centerSection]}>
          {renderTotalMeals()}
          <Btn
            style={homeStyles.donateBtn}
            onPress={() => Linking.openURL('https://www.ckoakland.org/donate')}>
            <Text style={homeStyles.donateBtnText}>Donate Now</Text>
          </Btn>
        </View>
      </View>
      <View style={baseStyles.screenSection} />
    </View>
  );
};

export default CKInfo;
