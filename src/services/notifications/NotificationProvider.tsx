import {useEffect, PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';

import Notifications from './NotificationsService';
import {IncomingNotification} from './NotificationsService';
import {RootNavigationProp, NotificationData} from '../../navigation/types';

const NotificationContainer = ({children}: PropsWithChildren) => {
  const navigation = useNavigation<RootNavigationProp>();

  useEffect(() => {
    const listenerKey = Notifications.listen(
      (notification: IncomingNotification) => {
        try {
          const {screen, subScreen, params} =
            notification.data as NotificationData;

          if (subScreen && params) {
            // @ts-ignore
            navigation.navigate(screen, {
              screen: subScreen,
              params: params,
            });
          } else if (subScreen) {
            // @ts-ignore
            navigation.navigate(screen, {
              screen: subScreen,
            });
          } else {
            // @ts-ignore
            navigation.navigate(screen);
          }
        } catch (err) {
          console.log('Malformed notification data');
        }
      },
    );
    return () => Notifications.remove(listenerKey);
  }, [navigation]);

  return <>{children}</>;
};

export default NotificationContainer;
