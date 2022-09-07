import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LoadingBackground = () => {
  return (
    <View style={styles.LoadingBackground}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default LoadingBackground;

const styles = StyleSheet.create({
  LoadingBackground: {
    backgroundColor: 'rgba(46, 46, 46, 0.25)',
    position: 'absolute',
    height: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
