import {api} from '../../api';

export interface NotificationData {
  screen: string;
  subScreen?: string;
  params?: Record<string, string>;
}
export interface Announcement {
  title: string;
  message: string;
  photo?: string;
  data?: NotificationData;
}

const notificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getAnnouncement: builder.query<Announcement | null, void>({
      query: () => '/d4j/announcement',
    }),
  }),
});

export const {useGetAnnouncementQuery} = notificationApi;
