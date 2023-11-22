import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {Pressable, View, Text, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import Btn from './Btn';
import Loading from './Loading';

interface AddPhotoProps {
  setPhoto: React.Dispatch<React.SetStateAction<PhotoFile | undefined>>;
  photoFile: PhotoFile | undefined;
}

export interface PhotoFile {
  name?: string;
  type?: string;
  uri?: string;
}

const AddPhoto = ({setPhoto, photoFile}: AddPhotoProps) => {
  const [photoLoading, setPhotoLoading] = useState(false);

  const setLocalPhoto = (response: ImagePickerResponse) => {
    if (!response.didCancel && !response.errorCode && response.assets) {
      setPhotoLoading(true);
      const photo = response.assets[0];
      setPhoto({
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri,
      });
    }
  };

  const getPhotoFromLibrary = async () => {
    const photo = await launchImageLibrary({
      mediaType: 'photo',
    });
    setLocalPhoto(photo);
  };

  const takePhoto = async () => {
    const photo = await launchCamera({mediaType: 'photo'});
    setLocalPhoto(photo);
  };

  const renderPhoto = () => {
    return (
      <View style={styles.photoPreview}>
        {!photoLoading && (
          <Pressable
            style={styles.photoDelete}
            onPress={() => setPhoto(undefined)}>
            <Text style={styles.photoDeleteText}>X</Text>
          </Pressable>
        )}
        {photoLoading && <Loading />}
        <Image
          style={styles.photoPreviewPhoto}
          source={{uri: photoFile?.uri}}
          alt="preview"
          onLoad={() => setPhotoLoading(false)}
        />
      </View>
    );
  };

  return (
    <View style={styles.photo}>
      <Btn onPress={getPhotoFromLibrary}>
        <Text>Select Photo from Your Library</Text>
      </Btn>
      <Btn onPress={takePhoto}>
        <Text>Take Photo</Text>
      </Btn>
      {!!photoFile && renderPhoto()}
    </View>
  );
};

const styles = StyleSheet.create({
  photo: {
    marginTop: 20,
    alignItems: 'center',
  },
  photoPreview: {
    height: 330,
    width: '100%',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoDelete: {
    height: 35,
    width: 35,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: 'rgb(230,230,230)',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoDeleteText: {color: 'red', fontSize: 20},
  photoPreviewPhoto: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
  },
});

export default AddPhoto;
