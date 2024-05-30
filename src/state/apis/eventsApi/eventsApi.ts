import {api} from '../../api';

export interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  venue?: string;
  description?: string;
  address?: string;
  city?: string;
  url?: string;
  photo?: string;
}

const eventsApi = api.injectEndpoints({
  endpoints: builder => ({
    getEvents: builder.query<Event[], void>({
      query: () => '/d4j/events',
    }),
    getCompetitionBars: builder.query<string[], void>({
      query: () => '/d4j/events/cocktail-competition',
    }),
  }),
});

export const {useGetEventsQuery, useGetCompetitionBarsQuery} = eventsApi;
