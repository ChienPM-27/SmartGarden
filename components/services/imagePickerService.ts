import * as ImagePicker from 'expo-image-picker';

// Request permission helper function
const requestPermission = async (permissionFunc: () => Promise<ImagePicker.PermissionResponse>, permissionType: string) => {
  const permissionResult = await permissionFunc();
  if (!permissionResult.granted) {
    alert(`Permission to access ${permissionType} is required!`);
    return false;
  }
  return true;
};

// Function to pick image from gallery
const pickImageFromGallery = async (): Promise<{ uri: string } | null> => {
  const hasPermission = await requestPermission(
    ImagePicker.requestMediaLibraryPermissionsAsync,
    'gallery'
  );
  if (!hasPermission) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  // Return uri if no cancellation, otherwise null
  return result.canceled ? null : { uri: result.assets[0]?.uri };
};

// Function to take a photo with the camera
const takePhotoWithCamera = async (): Promise<{ uri: string } | null> => {
  const hasPermission = await requestPermission(
    ImagePicker.requestCameraPermissionsAsync,
    'camera'
  );
  if (!hasPermission) return null;

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  // Return uri if no cancellation, otherwise null
  return result.canceled ? null : { uri: result.assets[0]?.uri };
};

export default {
  pickImageFromGallery,
  takePhotoWithCamera,
};
