import {api} from '../../api';

export interface Cocktail {
  name: string;
  description: string;
  photo: string;
  bar: string; // salesforce ID of bar/restaurant
}

export interface ContestVote {
  user: string;
  bar: string;
}

const contestApi = api.injectEndpoints({
  endpoints: builder => ({
    vote: builder.mutation<null, string>({
      query: barId => ({
        method: 'POST',
        url: '/d4j/contest/vote',
        body: {barId},
      }),
      invalidatesTags: ['Vote'],
    }),

    editVote: builder.mutation<null, string>({
      query: barId => ({
        method: 'PATCH',
        url: '/d4j/contest/vote',
        body: {barId},
      }),
      invalidatesTags: ['Vote'],
    }),
    getAllVotes: builder.query<ContestVote[], void>({
      query: () => '/d4j/contest/votes',
      providesTags: ['Vote'],
    }),
  }),
});

export const {useVoteMutation, useEditVoteMutation, useGetAllVotesQuery} =
  contestApi;
