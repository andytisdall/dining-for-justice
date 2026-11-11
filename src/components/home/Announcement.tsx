import { View, Text, Pressable } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import { NotificationPayload } from '@community-kitchens/apiinterfaces';
import { HomeNavigationProp } from '../../navigation/types';
import Btn from '../reusable/Btn';
import homeStyles from './homeStyles';
import baseStyles from '../styles/baseStyles';

const AnnouncementModal = ({
  announcement,
  dismiss,
}: {
  announcement: NotificationPayload;
  dismiss: () => void;
}) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const renderPhoto = () => {
    if (announcement.photo) {
      return (
        <FastImage
          source={{ uri: announcement.photo }}
          style={homeStyles.announcementPhoto}
          resizeMode="cover"
        />
      );
    }
  };

  const navigate = () => {
    if (announcement.custom) {
      const { screen, subScreen, params } = announcement.custom;

      if (subScreen && params) {
        // @ts-ignore
        navigation.navigate(screen, {
          screen: subScreen,
          params: params,
          initial: false,
        });
      } else if (subScreen) {
        // @ts-ignore
        navigation.navigate(screen, {
          screen: subScreen,
          initial: false,
        });
      } else {
        // @ts-ignore
        navigation.navigate(screen);
      }
    }
    dismiss();
  };

  const renderLink = () => {
    if (announcement.custom) {
      return (
        <Btn onPress={navigate}>
          <Text>More Info</Text>
        </Btn>
      );
    }
  };

  return (
    <View style={homeStyles.announcementBackground}>
      <View style={homeStyles.announcement}>
        <Pressable onPress={dismiss} style={homeStyles.announcementDismiss}>
          <Text style={homeStyles.announcementDismissText}>X</Text>
        </Pressable>
        <View style={baseStyles.centerSection}>
          <Text
            style={[
              baseStyles.textLg,
              baseStyles.centerText,
              homeStyles.announcementTitle,
            ]}
          >
            {announcement.title}
          </Text>
          <View style={baseStyles.screenSection}>
            <Text style={[baseStyles.textSm, baseStyles.centerText]}>
              {announcement.body}
            </Text>
          </View>
          {renderPhoto()}
          {renderLink()}
        </View>
      </View>
    </View>
  );
};

export default AnnouncementModal;
