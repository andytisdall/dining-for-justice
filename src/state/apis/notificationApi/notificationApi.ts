import { api } from '../../api';
import { NotificationPayload } from '@community-kitchens/apiinterfaces';

// export interface NotificationData {
//   screen: string;
//   subScreen?: string;
//   params?: Record<string, string>;
// }

const notificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getAnnouncement: builder.query<NotificationPayload | null, void>({
      query: () => '/d4j/announcement',
    }),
    registerDeviceToken: builder.mutation<null, string>({
      query: token => ({
        url: '/d4j/save-token',
        body: { token },
        method: 'POST',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const { useGetAnnouncementQuery, useRegisterDeviceTokenMutation } =
  notificationApi;
