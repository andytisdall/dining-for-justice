import {api} from '../../api';

import {NotificationData} from '../../../navigation/types';

export interface Announcement {
  title: string;
  message: string;
  photo?: string;
  data?: NotificationData;
}

const notificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getAnnouncement: builder.query<Announcement, void>({
      query: () => '/d4j/announcement',
    }),
  }),
});

export const {useGetAnnouncementQuery} = notificationApi;
