import { screen, render } from '../../../tests/test-utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../Home';
import { RootTabsParams } from '../../../navigation/rootTabs';
import { createServer } from '../../../tests/setupServer';

const RootTabs = createBottomTabNavigator<RootTabsParams>();

const totalMeals = 100;

describe('', () => {
  createServer([
    {
      path: '/meal-program/campaign',
      res: async () => ({
        total: totalMeals,
      }),
    },
    { path: '/d4j/version', res: async () => ({ currentVersion: '10.0' }) },
    { path: '/d4j/events', res: async () => [] },
    { path: '/d4j/announcement', res: async () => null },
    { path: '/d4j/style-week', res: async () => null },
  ]);

  test('Home screen renders', async () => {
    render(
      <RootTabs.Navigator>
        <RootTabs.Screen name="Home" component={Home} />
      </RootTabs.Navigator>,
    );

    const header = await screen.findByRole('text', {
      name: /more info/i,
    });

    expect(header).toBeOnTheScreen();
  });

  test('Render total meals', async () => {
    render(
      <RootTabs.Navigator>
        <RootTabs.Screen name="Home" component={Home} />
      </RootTabs.Navigator>,
    );

    const header = await screen.findByRole('text', {
      name: new RegExp(totalMeals.toString()),
    });

    expect(header).toBeOnTheScreen();
  });
});
