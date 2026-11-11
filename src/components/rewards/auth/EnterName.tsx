import { TextInput } from 'react-native-paper';
import { Text, FlatList, View, TextInput as TextInputType } from 'react-native';
import { useRef } from 'react';

import baseStyles from '../../styles/baseStyles';
import authStyles from './authStyles';

const EnterName = ({
  firstName,
  lastName,
  city,
  setFirstName,
  setLastName,
  setCity,
  next,
  listRef,
}: {
  firstName: string;
  lastName: string;
  city: string;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  setCity: (city: string) => void;
  next: () => void;
  listRef: React.RefObject<FlatList | null>;
}) => {
  const lastNameRef = useRef<TextInputType>(null);
  const cityRef = useRef<TextInputType>(null);

  const firstNameInput = (
    <View style={baseStyles.screenSection}>
      <Text style={baseStyles.inputLabel}>First Name:</Text>
      <TextInput
        autoFocus
        value={firstName}
        onChangeText={setFirstName}
        onSubmitEditing={() => {
          lastNameRef.current?.focus();
          listRef.current?.scrollToOffset({ offset: 200 });
        }}
        style={authStyles.input}
        autoCorrect={false}
        autoCapitalize="words"
        returnKeyType="next"
        accessibilityLabel="First Name"
      />
    </View>
  );

  const lastNameInput = (
    <View style={baseStyles.screenSection}>
      <Text style={baseStyles.inputLabel}>Last Name:</Text>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        returnKeyType="next"
        style={authStyles.input}
        ref={lastNameRef}
        onSubmitEditing={() => {
          cityRef.current?.focus();
          listRef.current?.scrollToOffset({ offset: 400 });
        }}
        autoCorrect={false}
        autoCapitalize="words"
        accessibilityLabel="Last Name"
      />
    </View>
  );

  const cityInput = (
    <View style={baseStyles.screenSection}>
      <Text style={baseStyles.inputLabel}>City:</Text>

      <TextInput
        value={city}
        returnKeyType="next"
        ref={cityRef}
        onChangeText={setCity}
        accessibilityLabel="City"
        onSubmitEditing={next}
        autoCorrect={false}
        autoCapitalize="words"
        style={authStyles.input}
      />
    </View>
  );

  const label = (
    <Text style={[baseStyles.textXSm, baseStyles.centerText]}>
      Please enter your name for our records (in the future you'll only need to
      enter your email):
    </Text>
  );

  return (
    <FlatList
      data={[label, firstNameInput, lastNameInput, cityInput]}
      renderItem={({ item }) => item}
    />
  );
};

export default EnterName;
