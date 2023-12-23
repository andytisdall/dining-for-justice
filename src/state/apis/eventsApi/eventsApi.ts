import _ from 'lodash';

import {api} from '../../api';

interface Event {
  date: string;
  name: string;
  id: string;
  url?: string;
  photo?: string;
  time: string;
}

type EventsState = Record<string, Event>;

const eventsApi = api.injectEndpoints({
  endpoints: builder => ({
    getEvents: builder.query<EventsState, void>({
      query: () => '/d4j/events',
      transformResponse: (res: Event[]) => {
        return _.mapKeys(res, 'date');
      },
    }),
  }),
});

export const {useGetEventsQuery} = eventsApi;
