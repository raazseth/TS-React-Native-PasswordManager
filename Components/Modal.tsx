import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {IModal} from '../Helpers/Types';

const Modal: FC<IModal> = ({type, title, desc}) => {
  return (
    <View style={styles.Modal}>
      <Text>Modal</Text>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
    Modal:{
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:"gray",
        height:"100%"
    }
});
