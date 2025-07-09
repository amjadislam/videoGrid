import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import { pick, DocumentPickerResponse } from '@react-native-documents/picker';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../UploadScreen';

type Props = StackScreenProps<RootStackParamList, 'Upload'>;
type VideoSlot = Asset | null;
type AudioFile = DocumentPickerResponse | null;

export const useUploadScreen = ({ navigation }: Props) => {
  const [videos, setVideos] = useState<VideoSlot[]>([null, null, null, null]);
  const [audio, setAudio] = useState<AudioFile>(null);
  const [processing, setProcessing] = useState(false);

  const getFilePathFromUri = async (uri: string): Promise<string> => {
    if (Platform.OS === 'android' && uri.startsWith('content://')) {
      try {
        const fileName = `temp_audio_${Date.now()}.${audio?.name?.split('.').pop() || 'mp3'}`;
        const tempPath = `${RNFS.CachesDirectoryPath}/${fileName}`;
        await RNFS.copyFile(uri, tempPath);
        return tempPath;
      } catch (error) {
        console.log('Error copying content URI:', error);
        throw error;
      }
    }
    return uri.replace('file://', '');
  };

  const pickVideo = (index: number) => {
    launchImageLibrary(
      {
        mediaType: 'video',
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Unknown error');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          const newVideos = [...videos];
          newVideos[index] = response.assets[0];
          setVideos(newVideos);
        }
      }
    );
  };

  const pickAudio = async () => {
    try {
      const res = await pick({
        type: Platform.OS === 'ios' 
          ? [
              'public.audio',
              'public.mp3',
              'public.mpeg-4-audio', 
              'public.aiff-audio',
              'com.microsoft.waveform-audio',
              'org.xiph.ogg-audio',
              'public.wav',
              'public.m4a-audio',
              'com.apple.protected-mpeg-4-audio'
            ]
          : ['audio/mpeg', 'audio/wav', 'audio/x-m4a', 'audio/mp3', 'audio/m4a', 'audio/ogg'],
        allowMultiSelection: false,
      });
      if (res && res.length > 0) {
        setAudio(res[0]);
      }
    } catch (err: any) {
      if (err && err.code === 'DOCUMENT_PICKER_CANCELED') {
        // User cancelled
      } else {
        Alert.alert('Error', err.message || 'Unknown error');
      }
    }
  };

  const compileVideo = async () => {
    if (videos.some(v => !v?.uri) || !audio?.uri) {
      Alert.alert('Error', 'Please select 4 videos and 1 audio file.');
      return;
    }
    setProcessing(true);
    try {
      const videoPaths = videos.map(v => v!.uri!.replace('file://', ''));
      const audioPath = await getFilePathFromUri(audio.uri!);
      const outputPath = `${RNFS.CachesDirectoryPath}/output_${Date.now()}.mp4`;
      let audioDuration = 60;
      try {
        const durationCmd = `-i "${audioPath}" -f null -`;
        const durationSession = await FFmpegKit.execute(durationCmd);
        const durationOutput = await durationSession.getOutput();
        const durationMatch = durationOutput.match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d{2})/);
        if (durationMatch) {
          const hours = parseInt(durationMatch[1]);
          const minutes = parseInt(durationMatch[2]);
          const seconds = parseFloat(durationMatch[3]);
          audioDuration = hours * 3600 + minutes * 60 + seconds;
        }
        if (isNaN(audioDuration) || audioDuration <= 0) audioDuration = 60;
      } catch (e) {
        console.log('Error getting audio duration:', e);
      }
      let lastProgress = 0;
      const cmd = `-i "${videoPaths[0]}" -i "${videoPaths[1]}" -i "${videoPaths[2]}" -i "${videoPaths[3]}" -i "${audioPath}" -filter_complex "
        [0:v]setpts=PTS-STARTPTS,scale=360:640:force_original_aspect_ratio=decrease,pad=360:640:(ow-iw)/2:(oh-ih)/2,setsar=1,trim=duration=${audioDuration},tpad=stop_mode=clone:stop_duration=0[v0];
        [1:v]setpts=PTS-STARTPTS,scale=360:640:force_original_aspect_ratio=decrease,pad=360:640:(ow-iw)/2:(oh-ih)/2,setsar=1,trim=duration=${audioDuration},tpad=stop_mode=clone:stop_duration=0[v1];
        [2:v]setpts=PTS-STARTPTS,scale=360:640:force_original_aspect_ratio=decrease,pad=360:640:(ow-iw)/2:(oh-ih)/2,setsar=1,trim=duration=${audioDuration},tpad=stop_mode=clone:stop_duration=0[v2];
        [3:v]setpts=PTS-STARTPTS,scale=360:640:force_original_aspect_ratio=decrease,pad=360:640:(ow-iw)/2:(oh-ih)/2,setsar=1,trim=duration=${audioDuration},tpad=stop_mode=clone:stop_duration=0[v3];
        [v0][v1]hstack=inputs=2[top];
        [v2][v3]hstack=inputs=2[bottom];
        [top][bottom]vstack=inputs=2[grid]" -map "[grid]" -map 4:a:0 -c:v libx264 -c:a aac -preset veryfast -movflags +faststart "${outputPath}"`;
      await FFmpegKit.executeAsync(cmd, async (session) => {
        setProcessing(false);
        const returnCode = await session.getReturnCode();
        if (returnCode.isValueSuccess()) {
          let stat, size = 0, created = new Date().toISOString();
          try {
            stat = await RNFS.stat(outputPath);
            size = stat.size;
            created = stat.ctime ? new Date(stat.ctime).toISOString() : created;
          } catch {}
          navigation.navigate('Result', {
            outputPath,
            duration: audioDuration,
            size,
            created,
          });
        } else {
          const errorMessage = await session.getFailStackTrace();
          Alert.alert('Error', `Failed to compile video. Error: ${errorMessage || 'Unknown error'}`);
        }
      });
    } catch (e: any) {
      setProcessing(false);
      Alert.alert('Error', e.message || 'Unknown error');
    }
  };

  return {
    videos,
    audio,
    processing,
    pickVideo,
    pickAudio,
    compileVideo,
  };
}; 