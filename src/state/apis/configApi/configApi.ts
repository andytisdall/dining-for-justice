import {api} from '../../api';

const configApi = api.injectEndpoints({
  endpoints: builder => ({
    getVersion: builder.query<{currentVersion: string}, void>({
      query: () => '/d4j/version',
    }),
    getStyleWeekActive: builder.query<boolean, null>({
      queryFn: () => ({data: true}),
    }),
  }),
});

export const {useGetVersionQuery, useGetStyleWeekActiveQuery} = configApi;
