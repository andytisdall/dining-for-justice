import {format, zonedTimeToUtc} from 'date-fns-tz';

import {api} from '../../api';
import {addDays} from 'date-fns';

interface Event {
  name: string;
  description: string;
  id: string;
  startDate: string;
  endDate?: string;
  photo?: string;
  url?: string;
  time?: string;
}

type EventsState = Record<string, Event>;

const eventsApi = api.injectEndpoints({
  endpoints: builder => ({
    getEvents: builder.query<EventsState, void>({
      query: () => '/d4j/events',
      transformResponse: (res: Event[]) => {
        const state: EventsState = {};
        res.forEach(event => {
          const dates = [event.startDate];
          if (event.endDate) {
            for (
              let i = zonedTimeToUtc(event.startDate, 'America/Los_Angeles');
              i <= zonedTimeToUtc(event.endDate, 'America/Los_Angeles');
              i = addDays(i, 1)
            ) {
              dates.push(format(i, 'yyyy-MM-dd'));
            }
          }
          dates.forEach(date => {
            state[date] = event;
          });
        });

        return state;
      },
    }),
  }),
});

export const {useGetEventsQuery} = eventsApi;
