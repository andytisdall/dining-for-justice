import {View, Text} from 'react-native';

// import { useSelector } from 'react-redux';
import baseStyles from './styles/baseStyles';

const Home = () => {
  return (
    <View style={baseStyles.main}>
      <Text>Hello</Text>
      {/* <Text>{user?.username}</Text> */}
    </View>
  );
};

export default Home;
