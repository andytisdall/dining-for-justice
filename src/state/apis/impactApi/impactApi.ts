import {api} from '../../api';

const impactApi = api.injectEndpoints({
  endpoints: builder => ({
    getTotalMeals: builder.query<{total: number}, void>({
      query: () => '/meal-program/campaign',
    }),
  }),
});

export const {useGetTotalMealsQuery} = impactApi;
