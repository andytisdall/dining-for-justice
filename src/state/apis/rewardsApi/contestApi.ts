import {api} from '../../api';

export interface Prize {
  title: string;
  description: string;
  photo: string;
}

const contestApi = api.injectEndpoints({
  endpoints: builder => ({
    getContestRules: builder.query<{rules: string}, void>({
      query: () => '/d4j/contest-rules',
    }),
    getPrizes: builder.query<Prize[], void>({
      query: () => '/d4j/prizes',
    }),
  }),
});

export const {useGetContestRulesQuery, useGetPrizesQuery} = contestApi;
