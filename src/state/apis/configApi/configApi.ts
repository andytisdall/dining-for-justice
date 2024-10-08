import {api} from '../../api';

interface EventConfig {
  contestActive: boolean;
  styleMonthActive: boolean;
}

const configApi = api.injectEndpoints({
  endpoints: builder => ({
    getVersion: builder.query<{currentVersion: string}, void>({
      query: () => '/d4j/version',
    }),
    getStyleWeekActive: builder.query<EventConfig, void>({
      query: () => '/d4j/style-week',
      // queryFn: () => ({data: {styleMonthActive: true, contestActive: true}}),
      providesTags: ['Config'],
    }),
  }),
});

export const {useGetVersionQuery, useGetStyleWeekActiveQuery} = configApi;
