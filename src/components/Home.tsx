import {View, Text} from 'react-native';

// import { useSelector } from 'react-redux';
import baseStyles from './styles/baseStyles';
import Btn from './reusable/Btn';
import {useSignOutMutation} from '../state/apis/authApi';

const Home = () => {
  const [signOut] = useSignOutMutation();

  return (
    <View style={baseStyles.main}>
      <Text>Hello</Text>
      {/* <Text>{user?.username}</Text> */}
      <Btn onPress={signOut}>
        <Text>Sign Out</Text>
      </Btn>
    </View>
  );
};

export default Home;
