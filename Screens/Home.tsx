import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Layout from '../Components/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decryptData, optionalConfigObject} from '../Helpers/Utils';
import PasswordCard from '../Components/PasswordCard';
import {Store} from '../Helpers/Store';
import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';

const Home = ({navigation}: any) => {
  const {state, dispatch} = useContext(Store);
  const [UIState, setUIState] = useState('My Passwords');

  useEffect(() => {
    async function GetPassword() {
      const Passes = await AsyncStorage.getItem('Passwords');
      const Passwords = decryptData(JSON.parse(Passes || '[]'));
      return Passwords;
    }

    GetPassword()
      .then((result: any) => {
        if (result.length > 0 && !state.isAuth) {
          TouchID.authenticate(
            'We need access to do this operation!',
            optionalConfigObject,
          )
            .then(async (success: any) => {
              dispatch({
                type: 'GET_PASSWORD',
                payload: {Items: result},
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
        }
      })
      .catch((err: any) => {});
  }, []);

  const handleUIState = (data: string) => {
    if (data === 'Add New') {
      navigation.navigate('Add');
    } else {
      setUIState(data);
    }
  };

  return (
    <Layout
      isHeader
      isOverlay
      headerLeftType="Home"
      headerRightType="Add"
      navigation={navigation}>
      <View style={styles.Over}>
        <View style={styles.ChooseOption}>
          {['My Passwords', 'Add New'].map(data => (
            <TouchableOpacity
              onPress={() => handleUIState(data)}
              key={data}
              style={[
                styles.ChooseOptionBtn,
                {
                  backgroundColor: UIState === data ? '#e76c8b' : 'transparent',
                },
              ]}>
              <Text
                style={[
                  styles.ChooseOptionBtnTxt,
                  {
                    color: UIState === data ? '#e4b2b8' : '#c4b9c9',
                  },
                ]}>
                {data}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {UIState === 'My Passwords' ? (
          <View style={styles.UIState}>
            {state.Items.length > 0 ? (
              state.Items.slice()
                .reverse()
                .map((pss: any, i: number) => (
                  <View key={i}>
                    <PasswordCard item={pss} navigation={navigation} />
                  </View>
                ))
            ) : (
              <Image
                source={require('../Assets/Fingerprint.png')}
                style={{height: 300, width: '100%'}}
              />
            )}
          </View>
        ) : (
          <View style={styles.UIState}>
            <Text>{UIState}</Text>
          </View>
        )}
      </View>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  Over: {
    marginTop: -150,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 24,
    padding: 12,
  },
  UIState: {
    shadowColor: 'gray',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 23,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 12,
    marginTop: 34,
    marginBottom: 100,
  },
  ChooseOption: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#54466a',
    borderWidth: 1,
    borderRadius: 18,
  },
  ChooseOptionBtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 12,
    borderRadius: 18,
    width: '49%',
  },
  ChooseOptionBtnTxt: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
