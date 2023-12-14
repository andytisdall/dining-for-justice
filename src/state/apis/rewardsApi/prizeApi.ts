import {api} from '../../api';

interface RedeemPointsArgs {
  prize: string;
  restaurantName?: string;
}

const prizeApi = api.injectEndpoints({
  endpoints: builder => ({
    redeemPoints: builder.mutation<null, RedeemPointsArgs>({
      query: body => ({
        url: '/d4j/rewards',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useRedeemPointsMutation} = prizeApi;
