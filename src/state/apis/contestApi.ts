import {api} from '../api';

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
    getCocktails: builder.query<Cocktail[], void>({
      query: () => '/d4j/contest/cocktails',
    }),
    vote: builder.mutation<null, string>({
      query: barId => ({
        method: 'POST',
        url: '/d4j/contest/vote',
        body: {barId},
      }),
    }),
    getVote: builder.query<ContestVote[], void>({
      query: () => '/d4j/contest/vote',
    }),
    editVote: builder.mutation<null, string>({
      query: barId => ({
        method: 'PATCH',
        url: '/d4j/contest/vote',
        body: {barId},
      }),
    }),
    getAllVotes: builder.query<ContestVote[], void>({
      query: () => '/d4j/contest/votes',
    }),
  }),
});

export const {
  useGetCocktailsQuery,
  useVoteMutation,
  useGetVoteQuery,
  useEditVoteMutation,
  useGetAllVotesQuery,
} = contestApi;
