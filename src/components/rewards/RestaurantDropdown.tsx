import DropDownPicker from 'react-native-dropdown-picker';
import {useState, useMemo, Dispatch, SetStateAction} from 'react';

import {useGetRestaurantsQuery} from '../../state/apis/restaurantApi/restaurantApi';
import uploadStyles from './upload/uploadStyles';

const RestaurantDropdown = ({
  restaurantId,
  setRestaurantId,
}: {
  restaurantId: string;
  setRestaurantId: Dispatch<SetStateAction<string>>;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {data: restaurants} = useGetRestaurantsQuery();

  const restaurantOptions = useMemo(() => {
    if (restaurants) {
      return [...restaurants]
        .filter(rest => rest.active)
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .map(rest => {
          return {label: rest.name, value: rest.id};
        });
    }
    return [];
  }, [restaurants]);

  return (
    <DropDownPicker
      open={dropdownOpen}
      setOpen={setDropdownOpen}
      items={restaurantOptions}
      value={restaurantId || null}
      setValue={setRestaurantId}
      listMode="MODAL"
      style={uploadStyles.dropdown}
      placeholder="Select restaurant"
      placeholderStyle={uploadStyles.dropdownPlaceholder}
      textStyle={uploadStyles.dropdownPlaceholder}
      modalTitle="Select a Restaurant"
    />
  );
};

export default RestaurantDropdown;
