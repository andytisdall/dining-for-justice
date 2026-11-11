import {
  Text,
  View,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useCallback, useEffect } from 'react';
import { Notifications } from 'react-native-notifications';

import AnimatedLoading from '../reusable/AnimatedLoading';
import baseStyles from '../styles/baseStyles';
import { useGetContactQuery } from '../../state/apis/contact/contactApi';
import PastCheckIns from './pastVisits/PastCheckIns';
import User from './auth/User';
import rewardsStyles from './rewardsStyles';
import RewardsNotSignedIn from './RewardsNotSignedIn';
import ScreenBackground from '../reusable/ScreenBackground';
import { useGetStyleWeekActiveQuery } from '../../state/apis/configApi/configApi';
import ContestLink from '../events/contest/ContestLink';
import { useRegisterDeviceTokenMutation } from '../../state/apis/notificationApi/notificationApi';
import { RewardsHomeScreenProps } from '../../navigation/rewards';

const RewardsHome = ({ route, navigation }: RewardsHomeScreenProps) => {
  const { data: contact, isFetching: contactIsLoading } = useGetContactQuery();
  const { data: styleWeekConfig } = useGetStyleWeekActiveQuery();

  const [registerDeviceToken] = useRegisterDeviceTokenMutation();

  const registerNotifications = useCallback(async () => {
    if (contact) {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        Notifications.setNotificationChannel({
          channelId: 'dining-for-justice-app',
          name: 'Dining for Justice app channel',
          importance: 5,
          description: 'Notifications from Community Kitchens',
          enableLights: true,
          enableVibration: true,
          showBadge: true,
          vibrationPattern: [200, 1000, 500, 1000, 500],
        });
      }
      Notifications.events().registerRemoteNotificationsRegistered(
        ({ deviceToken }) => {
          const existingToken = contact.token;

          if (deviceToken !== existingToken) {
            registerDeviceToken(deviceToken).unwrap();
          }
        },
      );

      Notifications.registerRemoteNotifications();
    }
  }, [contact, registerDeviceToken]);

  useEffect(() => {
    registerNotifications();
  }, [registerNotifications]);

  const redirect = route.params?.redirect;

  useEffect(() => {
    if (redirect) {
      //@ts-ignore
      navigation.navigate(redirect);
    }
  }, [navigation, redirect]);

  const rewardsText = (
    <View style={[baseStyles.centerSection]}>
      <Text style={[baseStyles.text, rewardsStyles.rewardsHeadline]}>
        Thanks for Checking In!
      </Text>

      <Text style={[baseStyles.centerText, baseStyles.textSm]}>
        When you check in at any restaurant or bar on our list, you get a chance
        to win in our prize drawing, and CK gets a free meal donation!
      </Text>
    </View>
  );

  const renderSignedIn = () => {
    return (
      <View style={baseStyles.screenSection}>
        {rewardsText}
        <PastCheckIns />
        <User />
      </View>
    );
  };

  const renderScreen = () => {
    return contactIsLoading ? (
      <View style={baseStyles.loadingContainer}>
        <AnimatedLoading />
      </View>
    ) : !contact ? (
      <RewardsNotSignedIn />
    ) : (
      renderSignedIn()
    );
  };

  const data = [renderScreen()];
  if (styleWeekConfig?.contestActive) {
    data.unshift(<ContestLink />);
  }

  return (
    <ScreenBackground>
      <FlatList
        style={baseStyles.scrollView}
        data={data}
        renderItem={({ item }) => item}
      />
    </ScreenBackground>
  );
};

export default RewardsHome;
