import {View, Text, ScrollView} from 'react-native';
import {useEffect} from 'react';

import ScreenBackground from '../../reusable/ScreenBackground';
import baseStyles from '../../styles/baseStyles';
import {ConfirmScreenProps} from '../../../navigation/rewards';
import {useConfirmContactMutation} from '../../../state/apis/contactApi/contactApi';
import authStyles from './authStyles';
import ThumbsUp from '../../reusable/ThumbsUp';
import AnimatedLoading from '../../reusable/AnimatedLoading';

const Confirm = ({route, navigation}: ConfirmScreenProps) => {
  const {code} = route.params;

  const [confirmContact, {isSuccess, isLoading, isError}] =
    useConfirmContactMutation();

  useEffect(() => {
    confirmContact({code});
  }, [code, confirmContact]);

  const renderState = () => {
    if (isLoading) {
      return <AnimatedLoading />;
    }

    if (isError) {
      return <Text style={baseStyles.text}>User could not be verified</Text>;
    }

    if (isSuccess) {
      setTimeout(() => {
        navigation.navigate('RewardsHome');
      }, 1000);
      return <ThumbsUp />;
    }
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={baseStyles.scrollView}>
        <View style={[baseStyles.screenSection, authStyles.confirm]}>
          {renderState()}
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

export default Confirm;
