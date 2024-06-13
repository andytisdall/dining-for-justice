import {View, Text, Platform, Linking} from 'react-native';

import {useGetVersionQuery} from '../../state/apis/contactApi/contactApi';
import pkg from '../../../package.json';
import Btn from '../reusable/Btn';
import baseStyles from '../styles/baseStyles';

const APP_STORE_URL =
  'https://apps.apple.com/us/app/dining-for-justice/id6466729382';
const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=org.ckoakland.diningforjustice';
const usingVersion = pkg.version;

const parseVersionString = (versionString: string) => {
  const [major, minor] = versionString.split('.');
  const majorInt = parseInt(major, 10);
  const minorInt = parseInt(minor, 10);
  return [majorInt, minorInt];
};

const getUpdateURL = () => {
  if (Platform.OS === 'ios') {
    return APP_STORE_URL;
  }
  if (Platform.OS === 'android') {
    return GOOGLE_PLAY_URL;
  }
};

const VersionDetector = () => {
  const {data: version} = useGetVersionQuery();
  const currentVersion = version?.currentVersion;

  const versionIsOutdated = () => {
    if (currentVersion) {
      const [usingMajor, usingMinor] = parseVersionString(usingVersion);
      const [currentMajor, currentMinor] = parseVersionString(currentVersion);

      const majorIsOutdated = currentMajor > usingMajor;
      const minorIsOutdated = currentMinor > usingMinor;

      return majorIsOutdated || minorIsOutdated;
    }
    return false;
  };

  const renderLink = () => {
    const url = getUpdateURL();
    if (url) {
      return (
        <Btn onPress={() => Linking.openURL(url)}>
          <Text style={baseStyles.btnText}>Update</Text>
        </Btn>
      );
    }
  };

  return (
    <View style={[baseStyles.centerSection]}>
      {versionIsOutdated() && !!renderLink() && (
        <View style={baseStyles.centerSection}>
          <Text style={baseStyles.textSm}>Your app is outdated</Text>
          {renderLink()}
        </View>
      )}
    </View>
  );
};

export default VersionDetector;
