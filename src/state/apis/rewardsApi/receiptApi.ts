import {Platform} from 'react-native';
import {format} from 'date-fns-tz';

import {api} from '../../api';
import {PhotoFile} from '../../../components/reusable/AddPhoto';

interface UploadReceiptArgs {
  photo: PhotoFile;
  contactId: string;
  restaurantId: string;
  date: Date;
}

interface D4JVisit {
  id: string;
  restaurant: string;
}

const receiptApi = api.injectEndpoints({
  endpoints: builder => ({
    uploadReceipt: builder.mutation<null, UploadReceiptArgs>({
      query: ({photo, contactId, restaurantId, date}) => {
        if (photo && Platform.OS === 'ios') {
          photo.uri = photo!.uri?.replace('file://', '');
        }
        const body = new FormData();
        const dateString = format(date, 'yyyy-MM-dd');
        console.log(dateString);
        body.append('receipt', photo);
        body.append('contactId', contactId);
        body.append('restaurantId', restaurantId);
        body.append('date', dateString);
        return {method: 'POST', url: '/d4j/receipt', formData: true, body};
      },
    }),
    getVisits: builder.query<D4JVisit[], string>({
      query: id => '/d4j/visits/' + id,
    }),
  }),
});

export const {useUploadReceiptMutation, useGetVisitsQuery} = receiptApi;
