import {Platform} from 'react-native';
import {format} from 'date-fns-tz/esm';

import {api} from '../../api';
import {PhotoFile} from '../../../components/reusable/AddPhoto';

interface UploadReceiptArgs {
  photo: PhotoFile;
  restaurantId: string;
  date: Date;
}

export interface D4JVisit {
  id: string;
  restaurant: string;
  date: string;
  status: string;
}

export interface UploadReceiptResponse {
  date: string;
  restaurantId: string;
}

export const receiptApi = api.injectEndpoints({
  endpoints: builder => ({
    uploadReceipt: builder.mutation<UploadReceiptResponse, UploadReceiptArgs>({
      query: ({photo, restaurantId, date}) => {
        if (photo && Platform.OS === 'ios') {
          photo.uri = photo!.uri?.replace('file://', '');
        }
        const body = new FormData();
        const dateString = format(date, 'yyyy-MM-dd');
        body.append('receipt', photo);
        body.append('restaurantId', restaurantId);
        body.append('date', dateString);
        return {method: 'POST', url: '/d4j/receipt', formData: true, body};
      },
      invalidatesTags: ['Visit', 'Contact'],
    }),

    getVisits: builder.query<D4JVisit[] | null, void>({
      query: () => '/d4j/visits',
      providesTags: ['Visit'],
    }),
  }),
});

export const {useUploadReceiptMutation, useGetVisitsQuery} = receiptApi;
