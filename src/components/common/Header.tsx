import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import Logo from '../../assets/images/Logo.svg';

export default function Header() {
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View style={styles.header}>
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
