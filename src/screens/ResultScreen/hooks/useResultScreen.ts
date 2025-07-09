import { useState } from 'react';
import { Alert, Platform, PermissionsAndroid, Linking } from 'react-native';
import RNFS from 'react-native-fs';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../types';
import { formatFileSize, formatDuration, formatDate } from '../utils/resultUtils';

type Props = StackScreenProps<RootStackParamList, 'Result'>;

export const useResultScreen = ({ route, navigation }: Props) => {
  const { outputPath, duration, size, created } = route.params;
  const [isSaving, setIsSaving] = useState(false);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const sdkInt = parseInt((Platform as any).Version, 10);
        let permission;
        if (sdkInt >= 33) {
          permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO;
        } else {
          permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        }
        const granted = await PermissionsAndroid.request(permission, {
          title: 'Storage Permission',
          message: 'App needs access to storage to save videos to gallery',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          Alert.alert(
            'Permission Required',
            'Storage permission is required to save videos to your gallery. Please enable it in app settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ]
          );
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleSaveToGallery = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      // Check if file exists
      const exists = await RNFS.exists(outputPath);
      if (!exists) {
        Alert.alert('Error', 'Video file not found');
        return;
      }
      if (Platform.OS === 'android') {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) return;
        // Save to Movies directory
        const fileName = `videoeditor_${Date.now()}.mp4`;
        const destPath = `${RNFS.ExternalStorageDirectoryPath}/Movies/${fileName}`;
        await RNFS.copyFile(outputPath, destPath);
        Alert.alert('Success', 'Video saved to gallery! Check your Movies folder.');
      } else {
        // For iOS, save to Files app
        const fileName = `videoeditor_${Date.now()}.mp4`;
        const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.copyFile(outputPath, destPath);
        Alert.alert(
          'Video Saved',
          'Video saved to Files app. To save to Photos:\n1. Open Files app\n2. Find this video\n3. Tap and hold → Share → Save to Photos'
        );
      }
    } catch (error) {
      console.log('Error saving to gallery:', error);
      Alert.alert('Error', 'Failed to save video to gallery');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateNew = () => {
    navigation.navigate('Upload');
  };

  const handleDeleteVideo = async () => {
    Alert.alert(
      'Delete Video',
      'Are you sure you want to delete this video? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const exists = await RNFS.exists(outputPath);
              if (exists) {
                await RNFS.unlink(outputPath);
              }
              navigation.navigate('Upload');
            } catch (error) {
              console.log('Error deleting video:', error);
              Alert.alert('Error', 'Failed to delete video');
            }
          },
        },
      ]
    );
  };

  const formattedSize = formatFileSize(size);
  const formattedDuration = formatDuration(duration);
  const formattedCreated = formatDate(created);

  return {
    outputPath,
    formattedSize,
    formattedDuration,
    formattedCreated,
    isSaving,
    handleSaveToGallery,
    handleCreateNew,
    handleDeleteVideo,
  };
}; 