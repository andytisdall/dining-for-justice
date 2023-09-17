import {View, Text} from 'react-native';

import Error from './reusable/Error';
import {useGetUserQuery} from '../state/apis/authApi';

const Home = () => {
  const {data, error} = useGetUserQuery();

  return (
    <View>
      <Text>Hello</Text>
      <Text>{data}</Text>
      <Error error={error} />
    </View>
  );
};

export default Home;
