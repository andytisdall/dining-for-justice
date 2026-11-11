import { useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, Text } from 'react-native';

import useLocation from '../../../hooks/useLocation';
import ScreenBackground from '../../reusable/ScreenBackground';
import ContestCocktailListItem from './ContestCocktailListItem';
import ContestOver from './ContestOver';
import AnimatedLoading from '../../reusable/AnimatedLoading';
import { useGetBarsQuery } from '../../../state/apis/eventsApi/contestApi';
import ContestHeader from './ContestHeader';
import { useGetContactQuery } from '../../../state/apis/contact/contactApi';
import PreContest from './PreContest';
import NotSignedIn from './NotSignedIn';
import OutOfRange from './OutOfRange';
import EnableLocation from './EnableLocation';
import baseStyles from '../../styles/baseStyles';
import { useGetStyleWeekActiveQuery } from '../../../state/apis/configApi/configApi';
import { userIsWithinRange } from '../../restaurants/restaurantDetail/checkIn/CheckIn';

const ContestHome = () => {
  const { data: bars, isLoading } = useGetBarsQuery();
  const { data: user, isLoading: userIsLoading } = useGetContactQuery();
  const { data: config } = useGetStyleWeekActiveQuery(undefined, {
    pollingInterval: 20000,
  });

  const location = useLocation();
  const preContest = config && new Date() < new Date(config?.startTime);
  const postContest = config && new Date() > new Date(config?.endTime);

  console.log(location);

  const cocktails = useMemo(() => {
    if (bars) {
      return [...bars]?.sort((a, b) => (a.restaurant > b.restaurant ? 1 : -1));
    }
  }, [bars]);

  const locationCoords = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
      }
    : undefined;

  const withinRange =
    locationCoords &&
    config?.coordinates &&
    userIsWithinRange(config.coordinates, locationCoords);

  const renderContestUnavailable = () => {
    if (isLoading || userIsLoading) {
      return <AnimatedLoading />;
    }
    if (!location) {
      return <EnableLocation />;
    }
    if (!withinRange) {
      return <OutOfRange />;
    }
    if (!user) {
      return <NotSignedIn />;
    }
    if (preContest) {
      return <PreContest />;
    }
    if (postContest) {
      return <ContestOver />;
    }
    if (!cocktails?.length) {
      return (
        <View>
          <Text>No Cocktails Found.</Text>
        </View>
      );
    }
  };

  const renderContest = () => {
    const contestValid =
      location &&
      withinRange &&
      !isLoading &&
      user &&
      !preContest &&
      !postContest &&
      cocktails?.length;

    if (!contestValid) {
      return (
        <View style={baseStyles.screen}>
          <ContestHeader />
          {renderContestUnavailable()}
        </View>
      );
    }
    return (
      <FlashList
        data={cocktails}
        renderItem={({ item }) => <ContestCocktailListItem cocktail={item} />}
        ListHeaderComponent={ContestHeader}
      />
    );
  };

  return <ScreenBackground>{renderContest()}</ScreenBackground>;
};

export default ContestHome;
