import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {FC, useState, useContext} from 'react';
import Clipboard from '@react-native-community/clipboard';
import {IPassword} from '../Helpers/Types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import OnLeftSwipe from './OnLeftSwipe';
import OnRightSwipe from './OnRightSwipe';
import {NavigationProp} from '@react-navigation/native';
import {optionalConfigObject} from '../Helpers/Utils';
import DeviceInfo from 'react-native-device-info';
import TouchID from 'react-native-touch-id';
import {Store} from '../Helpers/Store';

interface IProps {
  item: IPassword;
  navigation: NavigationProp<any, any>;
}

const PasswordCard: FC<IProps> = ({item, navigation}) => {
  const [showPass, setshowPass] = useState<boolean>(false);
  const {dispatch} = useContext(Store);

  const handleShowPass = async () => {
    if (!showPass) {
      TouchID.authenticate(
        'We need access to do this operation!',
        optionalConfigObject,
      )
        .then(async (success: any) => {
          setshowPass(true);
          dispatch({
            type: 'AUTHENTICATING_USER',
            payload: {
              auth: {
                isAuth: success,
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
    } else {
      setshowPass(!showPass);
    }
  };

  return (
    <Swipeable
      renderLeftActions={() => <OnLeftSwipe showPass={showPass} id={item.id} />}
      renderRightActions={() => (
        <OnRightSwipe
          showPass={showPass}
          EditData={item}
          navigation={navigation}
        />
      )}>
      <View style={[styles.PasswordCard, {height: showPass ? 100 : 60}]}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image source={{uri: item.url}} style={styles.PCImg} />
          <View style={styles.PCBody}>
            <View style={{display: 'flex', flexDirection: 'column'}}>
              <Text style={styles.PCType}>
                {item.type.length > 11
                  ? `${item.type.substring(0, 11)}...`
                  : item.type}
              </Text>
              <Text
                style={{fontSize: 11.5, marginTop: -1, fontStyle: 'italic'}}>
                {moment(item.createdAt).fromNow(true)} ago
              </Text>
            </View>
            <Ionicons
              name={showPass ? 'eye-off-sharp' : 'eye-sharp'}
              size={22}
              onPress={handleShowPass}
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                marginLeft: 'auto',
              }}
            />
          </View>
        </View>

        {showPass ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Password Copied');
              Clipboard.setString(item.password);
            }}
            activeOpacity={0.5}>
            <Animatable.Text
              animation="fadeInUp"
              duration={1200}
              style={styles.showPass}>
              {item.password} <Ionicons name="copy-outline" size={16} />
            </Animatable.Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </Swipeable>
  );
};

export default PasswordCard;

const styles = StyleSheet.create({
  PasswordCard: {
    marginTop: 6,
    marginBottom: 6,
    shadowColor: 'gray',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: '95%',
    borderRadius: 8,
    padding: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    // elevation: 14,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
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
  PCType: {
    color: '#5fbb9f',
    fontSize: 22,
    fontWeight: 'bold',
  },
  PCBody: {
    width: '75%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  PCImg: {
    height: 46,
    width: 46,
    borderRadius: 8,
    resizeMode: 'contain',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 2,
    marginRight: 6,
  },
  showPass: {
    height: 32,
    backgroundColor: '#fff6f7',
    borderRadius: 8,
    padding: 6,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
});
