import { screen, render, userEvent } from '../../../tests/test-utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { D4JContact } from '@community-kitchens/apiinterfaces';
import { createServer } from '../../../tests/setupServer';
import RewardsNavigator from '../RewardsNavigator';
import { RootTabsParams } from '../../../navigation/rootTabs';

const firstName = 'Andy';
const lastName = 'Tisdall';
const email = 'fake@email.com';

const user: D4JContact = {
  email: 'andrew.tisdall@gmail.com',
  id: '39r8u',
  token: 'smokin',
};

const RootTabs = createBottomTabNavigator<RootTabsParams>();

describe('user does not exist yet', () => {
  createServer([
    {
      path: '/d4j/contact',
      res: async () => null,
    },
    {
      path: '/d4j/style-week',
      res: async () => null,
    },
    {
      path: '/d4j/contact/signin',
      method: 'post',
      res: async ({ request }) => {
        const body = await request.json();
        if (body.email !== email) {
          throw Error();
        }
        return null;
      },
    },
    {
      path: '/d4j/contact',
      method: 'post',
      res: async ({ request }) => {
        const body = await request.json();
        if (
          body.firstName !== firstName ||
          body.lastName !== lastName ||
          body.email !== email
        ) {
          throw Error();
        }
        return null;
      },
    },
  ]);

  test('Input email and name to create user', async () => {
    render(
      <RootTabs.Navigator>
        <RootTabs.Screen name="Rewards" component={RewardsNavigator} />
      </RootTabs.Navigator>,
    );

    const signInBtn = await screen.findByText(/Sign In/i);
    await userEvent.press(signInBtn);

    const emailInput = await screen.findByLabelText('Email');
    expect(emailInput).toBeOnTheScreen();

    await userEvent.type(emailInput, email);
    const submitBtn = screen.getByText(/submit/i);
    await userEvent.press(submitBtn);
  });
});

describe('user exists', () => {
  createServer([
    {
      path: '/d4j/contact',
      res: async () => {
        return null;
      },
    },
    {
      path: '/d4j/style-week',
      res: async () => null,
    },
    {
      path: '/d4j/contact/signin',
      method: 'post',
      res: async () => {
        return { contact: user, token: 'token' };
      },
    },
    { path: '/d4j/rewards/check-in', res: async () => [] },
    { path: '/d4j/restaurants', res: async () => [] },
  ]);

  test('Input email and find user', async () => {
    render(
      <RootTabs.Navigator>
        <RootTabs.Screen name="Rewards" component={RewardsNavigator} />
      </RootTabs.Navigator>,
    );

    const signInBtn = await screen.findByText(/Sign In/i);
    await userEvent.press(signInBtn);

    const emailInput = await screen.findByLabelText('Email');
    expect(emailInput).toBeOnTheScreen();

    await userEvent.type(emailInput, email);
    const submitBtn = screen.getByText(/submit/i);
    await userEvent.press(submitBtn);
  });
});

describe('user is already signed in', () => {
  createServer([
    {
      path: '/d4j/contact',
      res: async () => {
        return user;
      },
    },
    {
      path: '/d4j/style-week',
      res: async () => null,
    },
    { path: '/d4j/rewards/check-in', res: async () => [] },
    { path: '/d4j/restaurants', res: async () => [] },
  ]);

  test('User is logged in', async () => {
    render(
      <RootTabs.Navigator>
        <RootTabs.Screen name="Rewards" component={RewardsNavigator} />
      </RootTabs.Navigator>,
    );

    const signOutBtn = await screen.findByText(/sign out/i);
    expect(signOutBtn).toBeOnTheScreen();
  });
});
