import LinearGradient from 'react-native-linear-gradient';
import {PropsWithChildren} from 'react';

import baseStyles from '../styles/baseStyles';
import colors from '../styles/colors';

const ScreenBackground = ({children}: PropsWithChildren) => {
  return (
    <LinearGradient
      colors={[colors.darkBlue, colors.nightBlue, colors.midnightBlue]}
      style={baseStyles.screen}
      start={{x: 0, y: 0}}
      end={{x: 0.67, y: 1}}>
      {children}
    </LinearGradient>
  );
};

export default ScreenBackground;
