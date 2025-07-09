import React from 'react';
import { View, ScrollView, SafeAreaView, Platform } from 'react-native';
import Video from 'react-native-video';
import { CustomText, Button } from '../../components';
import styles from './styles';
import { useResultScreen } from './hooks/useResultScreen';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from './types';

const ResultScreen: React.FC<StackScreenProps<RootStackParamList, 'Result'>> = (props) => {
  const {
    outputPath,
    formattedSize,
    formattedDuration,
    formattedCreated,
    isSaving,
    handleSaveToGallery,
    handleCreateNew,
  } = useResultScreen(props);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <CustomText variant="title">Video Compiled Successfully!</CustomText>
          <CustomText variant="subtitle">Your video clip has been created and is ready to preview and download</CustomText>
          <CustomText variant="label">Preview</CustomText>
          <View style={styles.previewBox}>
            <View style={styles.videoPreview}>
              <Video
                source={{ uri: Platform.OS === 'android' ? `file://${outputPath}` : outputPath }}
                style={styles.videoImage}
                controls
                resizeMode="cover"
                paused={false}
                repeat={true}
              />
            </View>
          </View>
          <View style={styles.detailsBox}>
            <CustomText variant="label">Video Details</CustomText>
            <View style={styles.detailRow}>
              <CustomText variant="detail">Duration:</CustomText>
              <CustomText variant="detail">{formattedDuration}</CustomText>
            </View>
            <View style={styles.detailRow}>
              <CustomText variant="detail">Size:</CustomText>
              <CustomText variant="detail">{formattedSize}</CustomText>
            </View>
            <View style={styles.detailRow}>
              <CustomText variant="detail">Created:</CustomText>
              <CustomText variant="detail">{formattedCreated}</CustomText>
            </View>
          </View>
          <Button
            title={isSaving ? 'Saving...' : 'Download Video'}
            onPress={handleSaveToGallery}
            loading={isSaving}
            style={styles.downloadButton}
          />
          <Button
            variant="link"
            title="← Create Another Video"
            onPress={handleCreateNew}
            style={styles.createNewButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen; 