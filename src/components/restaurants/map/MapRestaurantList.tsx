import {View, Text} from 'react-native';
import {useState} from 'react';

import mapStyles from './mapStyles';
import {PropsWithChildren} from 'react';
import Btn from '../../reusable/Btn';
import baseStyles from '../../styles/baseStyles';

const MapRestaurantList = ({
  children,
  orderByComponent,
}: PropsWithChildren & {orderByComponent: JSX.Element | undefined}) => {
  const [showList, setShowList] = useState(false);

  const renderShowRestaurantListBtn = () => {
    const btnText = showList ? 'Hide List' : 'Show List';
    return (
      <View>
        <Btn onPress={() => setShowList(!showList)}>
          <Text style={baseStyles.btnText}>{btnText}</Text>
        </Btn>
      </View>
    );
  };

  return (
    <View>
      <View style={mapStyles.listBtns}>
        {renderShowRestaurantListBtn()}
        {showList && orderByComponent}
      </View>
      {showList && children}
    </View>
  );
};

export default MapRestaurantList;
