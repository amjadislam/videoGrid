declare module 'react-native' {
  export const View: any;
  export const Text: any;
  export const TouchableOpacity: any;
  export const StyleSheet: any;
  export const Image: any;
  export const Alert: any;
  export const Platform: any;
  export const PermissionsAndroid: any;
  export const NativeModules: any;
  export const Linking: any;
  export const ScrollView: any;
  export const SafeAreaView: any;
  
  export interface TextProps {
    style?: any;
    children?: any;
    [key: string]: any;
  }
  
  export interface TouchableOpacityProps {
    style?: any;
    disabled?: boolean;
    onPress?: () => void;
    [key: string]: any;
  }
} 