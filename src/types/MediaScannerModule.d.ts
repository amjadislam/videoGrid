declare module 'react-native' {
  interface NativeModulesStatic {
    MediaScannerModule: {
      saveVideoToGallery(videoPath: string): Promise<string>;
    };
  }
} 