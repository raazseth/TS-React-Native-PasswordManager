import {NavigationProp} from '@react-navigation/native';
import React, {FC, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import TouchID from 'react-native-touch-id';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Store} from '../Helpers/Store';
import {IPassword} from '../Helpers/Types';
import {optionalConfigObject} from '../Helpers/Utils';
import DeviceInfo from 'react-native-device-info';

interface IOnRightSwipe {
  showPass: boolean;
  EditData: IPassword;
  navigation: NavigationProp<any, any>;
}

const OnRightSwipe: FC<IOnRightSwipe> = ({showPass, navigation, EditData}) => {
  const {dispatch} = useContext(Store);

  const handleEdit = async () => {
    TouchID.authenticate(
      'We need access to do this operation!',
      optionalConfigObject,
    )
      .then(async () => {
        navigation.navigate('Update', {
          EditData,
        });
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
    <TouchableOpacity onPress={handleEdit} activeOpacity={0.6}>
      <View
        style={[
          styles.SwipeBox,
          {backgroundColor: '#d6f2e2', height: showPass ? 100 : 60},
        ]}>
        <Animatable.Text
          animation={'pulse'}
          duration={1200}
          iterationCount="infinite"
          style={[styles.SwipeBoxTxt, {color: '#779382'}]}>
          Edit
        </Animatable.Text>
        <Animatable.View
          animation={'pulse'}
          duration={1200}
          iterationCount="infinite">
          <AntDesign name="edit" color={'#779382'} />
        </Animatable.View>
      </View>
    </TouchableOpacity>
  );
};

export default OnRightSwipe;

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
