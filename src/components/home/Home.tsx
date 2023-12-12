import {View, Text, Image, ScrollView} from 'react-native';
import baseStyles from '../styles/baseStyles';
// import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import Header from '../reusable/Header';
import homeStyles from './homeStyles';
// import {RootTabsParams} from '../../../App';

// type HomeProps = BottomTabScreenProps<RootTabsParams, 'Home'>;

const Home = () => {
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
        <View style={[baseStyles.screenSection, baseStyles.centerSection]}>
          <Text style={baseStyles.textSm}>
            You have successfully accessed the D4J app home screen. Great job!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
