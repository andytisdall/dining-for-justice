import {View, Text, ScrollView} from 'react-native';

import Header from '../reusable/Header';
import baseStyles from '../styles/baseStyles';

const EventsHome = () => {
  return (
    <ScrollView style={baseStyles.screen}>
      <Header title="Events" />
      <View style={baseStyles.screenSection}>
        <Text style={baseStyles.text}>Your one stop shop for events.</Text>
      </View>
    </ScrollView>
  );
};

export default EventsHome;
