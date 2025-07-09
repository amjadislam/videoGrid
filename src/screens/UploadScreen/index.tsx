import React from 'react';
import { View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { CustomText, Button } from '../../components';
import styles from './styles';
import { useUploadScreen } from './hooks/useUploadScreen';

export type RootStackParamList = {
  Upload: undefined;
  Result: {
    outputPath: string;
    duration: number;
    size: number;
    created: string;
  };
};

type Props = StackScreenProps<RootStackParamList, 'Upload'>;

const UploadScreen: React.FC<Props> = (props) => {
  const {
    videos,
    audio,
    processing,
    pickVideo,
    pickAudio,
    compileVideo,
  } = useUploadScreen(props);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomText variant="title" style={styles.title}>
          Upload Media
        </CustomText>
        <CustomText variant="body" style={styles.subtitle}>
          Upload your videos and audio files
        </CustomText>

        {/* Video Files Section */}
        <View style={styles.sectionHeader}>
          <CustomText style={styles.sectionIcon}>🎥</CustomText>
          <CustomText variant="label" style={styles.sectionTitle}>Video Files</CustomText>
        </View>
        <View style={styles.grid}>
          {videos.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={styles.videoSlot}
              onPress={() => pickVideo(index)}
            >
              {video?.uri ? (
                <>
                  <Image source={{ uri: video.uri }} style={styles.thumbnail} />
                  <CustomText variant="body" style={styles.slotText}>
                    Video {index + 1}
                  </CustomText>
                </>
              ) : (
                <>
                  <CustomText style={styles.icon}>🎥</CustomText>
                  <CustomText variant="body" style={styles.slotText}>
                    Video {index + 1}
                  </CustomText>
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Audio File Section */}
        <View style={styles.sectionHeader}>
          <CustomText style={styles.sectionIcon}>🎵</CustomText>
          <CustomText variant="label" style={styles.sectionTitle}>Audio File</CustomText>
        </View>
        <TouchableOpacity style={styles.audioSlot} onPress={pickAudio}>
          <CustomText style={styles.icon}>🎵</CustomText>
          {audio?.name ? (
            <>
              <CustomText variant="body" style={styles.audioText}>
                {audio.name}
              </CustomText>
              <CustomText variant="body" style={styles.audioSubtitle}>
                MP3, WAV, M4A
              </CustomText>
            </>
          ) : (
            <>
              <CustomText variant="body" style={styles.audioText}>
                Upload Audio
              </CustomText>
              <CustomText variant="body" style={styles.audioSubtitle}>
                MP3, WAV, M4A
              </CustomText>
            </>
          )}
        </TouchableOpacity>

        {/* Compile Button */}
        <Button
          title={processing ? 'Processing...' : '  Compile Video Clip'}
          onPress={compileVideo}
          disabled={processing || videos.some(v => !v?.uri) || !audio?.uri}
          style={styles.compileButton}
          icon={processing ? undefined : <CustomText style={{fontSize: 18, marginRight: 6}}>🎬</CustomText>}
        />
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen; 