import { api } from '../../api';

import { MixologyData, ContestVote } from '@community-kitchens/apiinterfaces';

// export interface MixologyData {
//   mixologist: string;
//   restaurant: string;
// }

// export interface ContestVote {
//   user: string;
//   bar: string;
// }

const contestApi = api.injectEndpoints({
  endpoints: builder => ({
    getBars: builder.query<MixologyData[], void>({
      query: () => '/d4j/contest/cocktails',
    }),

    vote: builder.mutation<null, string>({
      query: barId => ({
        method: 'POST',
        url: '/d4j/contest/vote',
        body: { barId },
      }),
      invalidatesTags: ['Vote'],
    }),

    getUserVote: builder.query<ContestVote, void>({
      query: () => '/d4j/contest/votes',
      providesTags: ['Vote'],
    }),
  }),
});

export const { useVoteMutation, useGetUserVoteQuery, useGetBarsQuery } =
  contestApi;
