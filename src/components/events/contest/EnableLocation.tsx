import { View, Text } from 'react-native';

import Btn from '../../reusable/Btn';
import useEnableLocation from '../../../hooks/useEnableLocation';
import baseStyles from '../../styles/baseStyles';
import { useCheckPermissionMutation } from '../../../state/apis/rewardsApi/locationApi';
import { useState } from 'react';
import AnimatedLoading from '../../reusable/AnimatedLoading';

const EnableLocation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [openEnableLocationModal, enableLocationModal] = useEnableLocation();
  const [getPermission] = useCheckPermissionMutation();

  return (
    <View style={baseStyles.screen}>
      {isLoading ? (
        <AnimatedLoading />
      ) : (
        <View style={[baseStyles.centerSection, baseStyles.screenSection]}>
          <Text style={baseStyles.text}>
            You must enable location services to vote in the cocktail contest.
          </Text>
          <Btn
            onPress={async () => {
              const permission = await getPermission().unwrap();
              if (!permission) {
                openEnableLocationModal();
              } else {
                setIsLoading(true);
              }
            }}
          >
            <Text style={baseStyles.btnText}>Enable Location</Text>
          </Btn>
        </View>
      )}
      {enableLocationModal}
    </View>
  );
};

export default EnableLocation;
