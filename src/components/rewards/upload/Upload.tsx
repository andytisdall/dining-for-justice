import {Text, View, FlatList} from 'react-native';
import {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns-tz';

import uploadStyles from './uploadStyles';
import baseStyles from '../../styles/baseStyles';
import {RewardsStackParams} from '../RewardsNavigator';
import {useUploadReceiptMutation} from '../../../state/apis/rewardsApi/receiptApi';
import AddPhoto, {PhotoFile} from '../../reusable/AddPhoto';
import Btn from '../../reusable/Btn';
import Loading from '../../reusable/Loading';
import RestaurantDropdown from '../RestaurantDropdown';
import ScreenBackground from '../../reusable/ScreenBackground';
import ThumbsUp from '../../reusable/ThumbsUp';

type UploadScreenProps = NativeStackScreenProps<RewardsStackParams, 'Upload'>;

const Upload = ({navigation}: UploadScreenProps) => {
  const [photo, setPhoto] = useState<PhotoFile>();
  const [restaurantId, setRestaurantId] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);

  const [uploadReceipt, {isLoading, isSuccess}] = useUploadReceiptMutation();

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

  const renderUpload = () => {
    return (
      <View style={baseStyles.screenSection}>
        <View style={uploadStyles.uploadItem}>
          <Text style={baseStyles.text}>Provide a photo of your receipt:</Text>
          <AddPhoto photoFile={photo} setPhoto={setPhoto} />
        </View>

        <View style={uploadStyles.uploadItem}>
          <Text style={baseStyles.text}>Restaurant:</Text>
          <RestaurantDropdown
            restaurantId={restaurantId}
            setRestaurantId={setRestaurantId}
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

  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (isSuccess) {
      return <ThumbsUp />;
    }
    return <FlatList data={[renderUpload()]} renderItem={({item}) => item} />;
  };

  return <ScreenBackground>{renderContent()}</ScreenBackground>;
};

export default Upload;
