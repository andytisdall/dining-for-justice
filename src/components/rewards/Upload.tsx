import {Text, View, FlatList} from 'react-native';
import {useState, useMemo} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import rewardsStyles from './rewardsStyles';
import baseStyles from '../styles/baseStyles';
import {RewardsStackParams} from './RewardsNavigator';
import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import {useUploadReceiptMutation} from '../../state/apis/rewardsApi/receiptApi';
import AddPhoto, {PhotoFile} from '../reusable/AddPhoto';
import Btn from '../reusable/Btn';
import Loading from '../reusable/Loading';

type UploadScreenProps = NativeStackScreenProps<RewardsStackParams, 'Upload'>;

const Upload = ({navigation}: UploadScreenProps) => {
  const [photo, setPhoto] = useState<PhotoFile>();
  const [restaurantId, setRestaurantId] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {data: restaurants} = useGetRestaurantsQuery();

  const onSubmit = () => {
    if (photo && restaurantId) {
      uploadReceipt({
        photo,
        restaurantId,
        contactId: '0037400000FU7XrAAL',
        date: new Date(),
      })
        .unwrap()
        .then(() => navigation.navigate('UploadSuccess'));
    }
  };

  const [uploadReceipt, {isLoading}] = useUploadReceiptMutation();

  const restaurantOptions = useMemo(() => {
    if (restaurants) {
      return restaurants.map(rest => {
        return {label: rest.name, value: rest.id};
      });
    }
    return [];
  }, [restaurants]);

  const renderUpload = () => {
    return (
      <View style={rewardsStyles.rewardsUpload}>
        <Text style={baseStyles.title}>Upload Receipt</Text>
        <AddPhoto photoFile={photo} setPhoto={setPhoto} />
        <DropDownPicker
          open={dropdownOpen}
          setOpen={setDropdownOpen}
          items={restaurantOptions}
          value={restaurantId || null}
          setValue={setRestaurantId}
        />
        <View style={baseStyles.centerSection}>
          <Btn onPress={onSubmit}>
            <Text>Submit</Text>
          </Btn>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      style={baseStyles.screen}
      data={isLoading ? [<Loading />] : [renderUpload()]}
      renderItem={({item}) => item}
    />
  );
};

export default Upload;
