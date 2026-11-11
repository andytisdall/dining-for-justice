import { api } from '../../api';
import { EventConfig, D4JAppVersion } from '@community-kitchens/apiinterfaces';

const configApi = api.injectEndpoints({
  endpoints: builder => ({
    getVersion: builder.query<D4JAppVersion, void>({
      query: () => '/d4j/version',
    }),
    getStyleWeekActive: builder.query<EventConfig, void>({
      query: () => '/d4j/style-week',
      providesTags: ['Config'],
    }),
  }),
});

export const { useGetVersionQuery, useGetStyleWeekActiveQuery } = configApi;
