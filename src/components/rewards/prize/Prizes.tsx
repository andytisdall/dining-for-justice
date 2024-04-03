import {Text, View} from 'react-native';

import baseStyles from '../../styles/baseStyles';
import PrizeCard from './PrizeCard';

const WARRIORS_IMG =
  'https://images.squarespace-cdn.com/content/v1/61760bdeb9da1d30a3f0c301/9fcc6e36-fa0a-458b-a142-36fa4606bd4c/steph.jpeg?format=2500w';

const ROOTS_IMG =
  'https://images.squarespace-cdn.com/content/v1/61760bdeb9da1d30a3f0c301/c3cf3086-1976-4ba9-a642-a8b55d547537/Copy+of+Roots+Single+Color+%28Black%29.png?format=750w';

const RESTAURANT_IMG =
  'https://images.squarespace-cdn.com/content/v1/61760bdeb9da1d30a3f0c301/1d65ab25-6175-4dcf-8a8e-186c445ff86a/leftfood.jpeg?format=2500w';

const SPICE_IMG =
  'https://goodeggs4.imgix.net/4c86488e-8095-426c-9aea-4e53bcfda14d.jpg?w=840&h=525&fm=jpg&q=80&fit=crop';

const Prizes = () => {
  return (
    <View style={baseStyles.screenSection}>
      <Text style={[baseStyles.textLg, baseStyles.centerText]}>
        Each D4J point is a chance to win!
      </Text>

      <PrizeCard
        title="Grand Prize"
        description="2 tickets to a Golden State Warriors home game"
        photo={WARRIORS_IMG}
      />

      <PrizeCard
        title="1st Prize"
        description="2 tickets to an Oakland Roots home game"
        photo={ROOTS_IMG}
      />

      <PrizeCard
        title="2nd Prize"
        description="$50 Gift Certificate to any Dining for Justice restaurant"
        photo={RESTAURANT_IMG}
      />

      <PrizeCard
        title="3rd Prize"
        description="Oakland Spice Shop spice kit"
        photo={SPICE_IMG}
      />
    </View>
  );
};

export default Prizes;
