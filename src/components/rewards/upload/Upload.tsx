import {Text, View, FlatList} from 'react-native';
import {useState, useMemo} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns-tz';

import uploadStyles from './uploadStyles';
import baseStyles from '../../styles/baseStyles';
import {RewardsStackParams} from '../RewardsNavigator';
import {useGetRestaurantsQuery} from '../../../state/apis/restaurantApi/restaurantApi';
import {useUploadReceiptMutation} from '../../../state/apis/rewardsApi/receiptApi';
import AddPhoto, {PhotoFile} from '../../reusable/AddPhoto';
import Btn from '../../reusable/Btn';
import Loading from '../../reusable/Loading';

type UploadScreenProps = NativeStackScreenProps<RewardsStackParams, 'Upload'>;

const Upload = ({navigation}: UploadScreenProps) => {
  const [photo, setPhoto] = useState<PhotoFile>();
  const [restaurantId, setRestaurantId] = useState('');
  const [date, setDate] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const {data: restaurants} = useGetRestaurantsQuery();

  const [uploadReceipt, {isLoading}] = useUploadReceiptMutation();

  const onSubmit = () => {
    if (photo && restaurantId) {
      uploadReceipt({
        photo,
        restaurantId,
        date: new Date(),
      })
        .unwrap()
        .then(res => navigation.navigate('UploadSuccess', {data: res}));
    }
  };

  const dateSelect = () => {
    return (
      <DatePicker
        modal
        mode="date"
        open={dateOpen}
        date={date}
        onConfirm={(selectedDate: Date) => {
          setDate(selectedDate);
          setDateOpen(false);
        }}
        onCancel={() => setDateOpen(false)}
        androidVariant="nativeAndroid"
        maximumDate={new Date()}
      />
    );
  };

  const restaurantOptions = useMemo(() => {
    if (restaurants) {
      return [...restaurants]
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .map(rest => {
          return {label: rest.name, value: rest.id};
        });
    }
    return [];
  }, [restaurants]);

  const renderUpload = () => {
    return (
      <View style={baseStyles.screenSection}>
        <View style={uploadStyles.uploadItem}>
          <Text style={baseStyles.text}>Provide a photo of your receipt:</Text>
          <AddPhoto photoFile={photo} setPhoto={setPhoto} />
        </View>

        <View style={uploadStyles.uploadItem}>
          <Text style={baseStyles.text}>Restaurant:</Text>
          <DropDownPicker
            open={dropdownOpen}
            setOpen={setDropdownOpen}
            items={restaurantOptions}
            value={restaurantId || null}
            setValue={setRestaurantId}
            listMode="MODAL"
            style={uploadStyles.dropdown}
            placeholder="Select restaurant"
            placeholderStyle={uploadStyles.dropdownPlaceholder}
            textStyle={uploadStyles.dropdownPlaceholder}
          />
        </View>
        <View style={uploadStyles.uploadItem}>
          <Text style={baseStyles.text}>Date of visit:</Text>
          <Btn onPress={() => setDateOpen(true)}>
            <Text>{format(date, 'M/d/yy')}</Text>
          </Btn>
          {dateSelect()}
        </View>
        <View style={baseStyles.centerSection}>
          <Btn onPress={onSubmit} disabled={!restaurantId || !photo}>
            <Text>Submit</Text>
          </Btn>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={baseStyles.screen}>
        <Loading />
      </View>
    );
  }

  return (
    <FlatList
      style={baseStyles.screen}
      data={[renderUpload()]}
      renderItem={({item}) => item}
    />
  );
};

export default Upload;
