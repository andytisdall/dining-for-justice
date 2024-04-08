import {api} from '../../api';

const contestRulesApi = api.injectEndpoints({
  endpoints: builder => ({
    getContestRules: builder.query<{rules: string}, void>({
      query: () => '/d4j/contest-rules',
    }),
  }),
});

export const {useGetContestRulesQuery} = contestRulesApi;
