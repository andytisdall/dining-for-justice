import { screen, render, userEvent } from '../../../../tests/test-utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootTabsParams } from '../../../../navigation/rootTabs';
import {
  D4JContact,
  Event,
  EventConfig,
  MixologyData,
} from '@community-kitchens/apiinterfaces';
import { createServer } from '../../../../tests/setupServer';

import EventsNavigator from '../../EventsNavigator';
import { MOCK_COORDS } from '../../../../tests/jest-setup';
import RewardsNavigator from '../../../rewards/RewardsNavigator';

const RootTabs = createBottomTabNavigator<RootTabsParams>();

const cocktailData: MixologyData[] = [
  { restaurant: "Skip's", mixologist: 'Robert' },
  { restaurant: "Becky's", mixologist: 'Barbecue Becky' },
];

const user: D4JContact = {
  email: 'andrew.tisdall@gmail.com',
  id: '39r8u',
};

const event: Event = {
  name: 'Oakland Style',
  id: '701UP00000lrXxFYAU',
  startDate: new Date(2026, 9, 7, 17, 30).toISOString(),
};

const config: EventConfig = {
  startTime: new Date(2026, 9, 7, 17, 30).toISOString(),
  endTime: new Date(2026, 9, 7, 20, 0).toISOString(),
  contestActive: true,
  coordinates: MOCK_COORDS.coords,
};

describe('pre-contest and no user', () => {
  const time = new Date(2026, 9, 7, 19, 0);
  jest.useFakeTimers();
  jest.setSystemTime(time);

  createServer([
    {
      path: '/meal-program/campaign',
      res: async () => ({
        total: 100,
      }),
    },
    { path: '/d4j/version', res: async () => ({ currentVersion: '1.0' }) },
    { path: '/d4j/events', res: async () => [event] },
    { path: '/d4j/announcement', res: async () => null },
    { path: '/d4j/style-week', res: async () => config },

    { path: '/d4j/contest/cocktails', res: async () => cocktailData },
    { path: '/d4j/contact', res: async () => null },
    { path: '/d4j/contact/signin', method: 'post', res: async () => user },
  ]);

  test('Find the contest', async () => {
    render(
      <RootTabs.Navigator>
        <RootTabs.Screen name="Events" component={EventsNavigator} />
        <RootTabs.Screen name="Rewards" component={RewardsNavigator} />
      </RootTabs.Navigator>,
    );

    const events = await screen.findAllByText('Events');
    expect(events).toHaveLength(3);

    const styleBtn = await screen.findByText(/style/i);
    await userEvent.press(styleBtn);

    const voteNowBtn = await screen.findByText(/vote now/i);
    await userEvent.press(voteNowBtn);

    const noUserTxt = await screen.findByText(/sign in/i);
    expect(noUserTxt).toBeOnTheScreen();
    await userEvent.press(noUserTxt);

    const emailInput = await screen.findByLabelText('Email');
    expect(emailInput).toBeOnTheScreen();

    await userEvent.type(emailInput, user.email);
    const submitBtn = screen.getByText(/submit/i);
    await userEvent.press(submitBtn);

    const noUserTxt2 = await screen.findByText(/mixology/i);
    expect(noUserTxt2).toBeOnTheScreen();
  });
});
