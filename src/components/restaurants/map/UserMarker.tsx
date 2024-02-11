import {Circle} from 'react-native-maps';

const UserMarker = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return (
    <Circle
      center={{latitude, longitude}}
      radius={50}
      fillColor="rgba(100,100,250,.5)"
      strokeColor="black"
    />
  );
};

export default UserMarker;
