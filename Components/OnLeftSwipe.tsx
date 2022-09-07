import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import React, {FC, useContext} from 'react';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Store} from '../Helpers/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {encryptData, optionalConfigObject} from '../Helpers/Utils';
import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';

interface IOnleftSwipe {
  showPass: boolean;
  id: string;
}

const OnLeftSwipe: FC<IOnleftSwipe> = ({showPass, id}) => {
  const {state, dispatch} = useContext(Store);

  const handleLeftPress = () => {
    Alert.alert('', `Are you sure you want to delete?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: `Delete`,
        onPress: () => handleDelete(),
      },
    ]);
  };

  const handleDelete = async () => {
    const removeData = state.Items.filter((item: any) => item.id !== id);

    TouchID.authenticate(
      'We need access to do this operation!',
      optionalConfigObject,
    )
      .then(async (success: any) => {
        dispatch({
          type: 'GET_PASSWORD',
          payload: {Items: removeData},
        });
        await AsyncStorage.setItem(
          'Passwords',
          JSON.stringify(encryptData(removeData)),
        );
        dispatch({
          type: 'AUTHENTICATING_USER',
          payload: {
            isAuth: true,
            auth: {
              Device: await DeviceInfo.getDevice(),
              DeviceId: await DeviceInfo.getDeviceId(),
              Fingerprint: await DeviceInfo.getFingerprint(),
              IpAddress: await DeviceInfo.getIpAddress(),
            },
          },
        });
      })
      .catch((error: any) => {
        Alert.alert('Wrong Fingerprint!');
      });
  };

  return (
    <TouchableOpacity onPress={handleLeftPress} activeOpacity={0.6}>
      <View
        style={[
          styles.SwipeBox,
          {backgroundColor: '#fee5e4', height: showPass ? 100 : 60},
        ]}>
        <Animatable.Text
          animation={'pulse'}
          duration={1200}
          iterationCount="infinite"
          style={[styles.SwipeBoxTxt, {color: '#b26a69'}]}>
          Delete
        </Animatable.Text>
        <Animatable.View
          animation={'pulse'}
          duration={1200}
          iterationCount="infinite">
          <AntDesign name="delete" color={'#b26a69'} />
        </Animatable.View>
      </View>
    </TouchableOpacity>
  );
};

export default OnLeftSwipe;

const styles = StyleSheet.create({
  SwipeBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: 52,
    height: 70,
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 6,
  },
  SwipeBoxTxt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
