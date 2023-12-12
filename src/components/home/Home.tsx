import {View, Text} from 'react-native';
import baseStyles from '../styles/baseStyles';
// import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import Header from '../reusable/Header';
import AnimatedLoading from '../reusable/AnimatedLoading';
// import {RootTabsParams} from '../../../App';

// type HomeProps = BottomTabScreenProps<RootTabsParams, 'Home'>;

const Home = () => {
  return (
    <View style={[baseStyles.screen]}>
      <Header title="Home" />
      <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
        <Text style={baseStyles.textSm}>
          You have successfully accessed the D4J app home screen. Great job!
        </Text>
      </View>
      <AnimatedLoading />
    </View>
  );
};

export default Home;
