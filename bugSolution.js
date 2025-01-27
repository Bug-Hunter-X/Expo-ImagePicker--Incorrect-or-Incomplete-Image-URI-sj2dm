import * as ImagePicker from 'expo-image-picker';

async function pickImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    // Verify image URI
    const validURI = await verifyImageURI(result.uri);
    if (validURI) {
      // Use valid URI 
      console.log('Image URI:', validURI);
    } else {
      console.error('Invalid image URI.');
    }
  }
}

async function verifyImageURI(uri) {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      return false;
    }
    return uri; 
  } catch (error) {
    console.error('Error verifying image URI:', error);
    return false;
  }
}

// ... rest of your code