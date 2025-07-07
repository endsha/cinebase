import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import Logo from '@assets/images/Logo.svg';

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View
        style={{
          ...styles.header,
          paddingTop: Platform.OS === 'android' ? insets.top : 0,
        }}
      >
        <Logo />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 18,
  },
});
