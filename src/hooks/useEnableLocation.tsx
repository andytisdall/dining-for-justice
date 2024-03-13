import {
  View,
  Platform,
  Text,
  Linking,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useState, PropsWithChildren} from 'react';

import Btn from '../components/reusable/Btn';
import baseStyles from '../components/styles/baseStyles';
import colors from '../components/styles/colors';

const Modal = ({
  children,
  onPress,
}: {onPress: () => void} & PropsWithChildren) => {
  return (
    <Pressable style={styles.background} onPress={onPress}>
      <Pressable style={styles.content} onPress={() => {}}>
        <Text style={[baseStyles.btnText, baseStyles.centerText]}>
          You must enable location services for this app to use this feature.
        </Text>
        {children}
      </Pressable>
    </Pressable>
  );
};

const useEnableLocation = (): [() => void, JSX.Element | undefined] => {
  const [modalOpen, setModalOpen] = useState(false);

  const isIos = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  const openSettings = () => {
    if (isIos) {
      Linking.openURL('app-settings:');
    }
    if (isAndroid) {
      Linking.openSettings();
    }
    setModalOpen(false);
  };

  const renderButtons = () => {
    if (isIos || isAndroid) {
      return (
        <View style={styles.btns}>
          <Btn onPress={() => setModalOpen(false)} style={styles.cancel}>
            <Text style={baseStyles.textSm}>Cancel</Text>
          </Btn>
          <Btn onPress={openSettings}>
            <Text style={baseStyles.btnText}>Go to settings</Text>
          </Btn>
        </View>
      );
    }
  };

  const modal = () => {
    if (modalOpen) {
      return (
        <Modal onPress={() => setModalOpen(false)}>{renderButtons()}</Modal>
      );
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return [openModal, modal()];
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(200,200,200,.5)',
    zIndex: 10,
  },
  content: {
    width: '75%',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    alignItems: 'center',
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {width: -1, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
    borderColor: colors.grey,
    borderWidth: 3,
  },
  btns: {
    flexDirection: 'row',
  },
  cancel: {
    backgroundColor: colors.lightGrey,
  },
});

export default useEnableLocation;
