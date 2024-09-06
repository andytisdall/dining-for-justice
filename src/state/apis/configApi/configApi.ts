import {api} from '../../api';

const configApi = api.injectEndpoints({
  endpoints: builder => ({
    getVersion: builder.query<{currentVersion: string}, void>({
      query: () => '/d4j/version',
    }),
    getStyleWeekActive: builder.query<boolean, null>({
      query: () => '/d4j/style-week',
    }),
  }),
});

export const {useGetVersionQuery, useGetStyleWeekActiveQuery} = configApi;
