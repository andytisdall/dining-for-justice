import {screen, render} from '../../../tests/test-utils';
import {BaseComponent} from '../../../../App';

test('Home screen renders', () => {
  render(<BaseComponent />);

  expect(
    screen.getByRole('text', {name: 'Eat, Drink, Support Community'}),
  ).toBeOnTheScreen();
});
