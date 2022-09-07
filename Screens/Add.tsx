import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Layout from '../Components/Layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Clipboard from '@react-native-community/clipboard';
import Slider from '@react-native-community/slider';
import moment from 'moment';
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {encryptData} from '../Helpers/Utils';
import Input from '../Components/Input';
import {PasswordData} from '../Helpers/Data';
import {Store} from '../Helpers/Store';

const Add = ({navigation}: any) => {
  const {state, dispatch} = useContext(Store);
  const [type, settype] = useState<string>('Twitter');
  const [url, seturl] = useState<string>(
    'https://res.cloudinary.com/doqz6idk4/image/upload/v1662048684/Raj-Seth/twitter_tarjdq.png',
  );
  const [password, setpassword] = useState<string>('');
  const [generatePass, setgeneratePass] = useState<string>('');
  const [length, setlength] = useState<number>(6);
  const [Loading, setLoading] = useState<boolean>(false);
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const generatePassword = () => {
    setgeneratePass(createPassword(chars));
  };

  const onSliderChange = (text: number) => {
    setlength(parseFloat(text.toFixed(0)));
    setgeneratePass(createPassword(chars));
  };

  const createPassword = (characterList: any) => {
    let password = '';
    const characterListLength = characterList.length;

    for (let i = 0; i < length; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const savePassword = () => {
    const data = {
      id: shortid.generate(),
      createdAt: moment().format(),
      url: url,
      type: type,
      password: generatePass ? generatePass : password,
    };

    if (!type && url) {
      Alert.alert('Please enter a password type/logo');
    } else if (password.length < 6) {
      if (generatePass) {
        setpassword(generatePass);
        SavingPassword(data);
      } else {
        Alert.alert('Please enter a password or generate a password');
      }
    } else {
      SavingPassword(data);
    }
  };

  const SavingPassword = async (data: any) => {
    try {
      setLoading(true);
      if (state.Items.length > 0) {
        const found = [...state.Items, data];
        await AsyncStorage.setItem(
          'Passwords',
          JSON.stringify(encryptData(found)),
        );
        dispatch({
          type: 'GET_PASSWORD',
          payload: {Items: found},
        });
        setTimeout(() => {
          setLoading(false);
          navigation.navigate('Home');
        }, 2400);
      } else {
        await AsyncStorage.setItem(
          'Passwords',
          JSON.stringify(encryptData([data])),
        );
        dispatch({
          type: 'GET_PASSWORD',
          payload: {Items: [data]},
        });
        setTimeout(() => {
          setLoading(false);
          navigation.navigate('Home');
        }, 2400);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUrl = (Url: string, Type: string) => {
    seturl(Url);
    settype(Type);
  };

  return (
    <Layout
      isHeader={true}
      Loading={Loading}
      headerLeftType="Back"
      headerRightType="Add"
      isOverlay
      navigation={navigation}>
      <View style={styles.AddPss}>
        <Text style={styles.addPssText}>Add Password</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {PasswordData.map(data => (
            <TouchableOpacity
              style={[
                styles.PassBtnType,
                {
                  borderColor:
                    data.url.toLocaleLowerCase() === url.toLocaleLowerCase()
                      ? '#5fbb9f'
                      : 'transparent',
                },
              ]}
              key={data.title}
              activeOpacity={0.8}
              onPress={() => handleUrl(data.url, data.title)}>
              <Image style={styles.PassType} source={{uri: data.url}} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Input
          value={type}
          onChange={(text: string) => settype(text)}
          placeholder="Type"
          label="Update Password Type"
        />

        <Input
          value={password}
          onChange={(text: string) => setpassword(text)}
          placeholder="Password"
          label="Enter Your Password"
        />
        {generatePass ? (
          <View
            style={[
              styles.savedBanner,
              {flexDirection: 'column', marginTop: 10, marginBottom: 10},
            ]}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={[styles.addPssLabel, {color: '#F38EAD'}]}>
                Password Length
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setgeneratePass('')}
                style={{
                  marginBottom: 8,
                  marginTop: 6,
                  marginLeft: 'auto',
                  marginRight: 6,
                }}>
                <AntDesign name="close" size={17} color="#F38EAD" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Slider
                style={styles.Slider}
                minimumValue={6}
                maximumValue={32}
                minimumTrackTintColor="#F38EAD"
                maximumTrackTintColor="#e0e0e0"
                thumbTintColor="#F38EAD"
                onValueChange={text => onSliderChange(text)}
              />
              <Text
                style={{
                  color: '#F38EAD',
                  marginTop: 4,
                  marginBottom: 'auto',
                  fontSize: 20,
                }}>
                {length}
              </Text>
            </View>

            <View style={[styles.savedBanner, {borderStyle: 'dashed'}]}>
              <TouchableOpacity activeOpacity={0.5} onPress={generatePassword}>
                <Image
                  source={require('../Assets/reset-password.png')}
                  style={{width: 24, height: 24, marginRight: 6}}
                />
              </TouchableOpacity>
              <Text selectable={true} style={styles.gnPsssP}>
                {generatePass}{' '}
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginLeft: 'auto',
                }}
                activeOpacity={0.5}
                onPress={() => Clipboard.setString(generatePass)}>
                <Ionicons name="copy-outline" size={20} color="#F38EAD" />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={generatePassword}
          style={styles.genPssBtn}>
          <Text style={{textAlign: 'center', color: '#F38EAD'}}>
            {generatePass ? 'Regenerate Password' : ' Generate Password'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.savePss}
          activeOpacity={0.8}
          onPress={savePassword}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 24}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Add;

const styles = StyleSheet.create({
  AddPss: {
    marginTop: -140,
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 18,
    shadowColor: 'gray',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 23,
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 100,
  },
  addPssText: {
    fontSize: 18,
    color: '#42424b',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  addPssLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
    marginBottom: 8,
    marginTop: 10,
  },
  addPssInpt: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  savedBanner: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff6f7',
    padding: 6,
    borderWidth: 1,
    borderColor: '#F38EAD',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
  },
  Slider: {
    width: '88%',
    height: 34,
    marginLeft: -10,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  gnPsssP: {
    fontWeight: 'bold',
    color: '#F38EAD',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  genPssBtn: {
    marginTop: 10,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  savePss: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    marginTop: 24,
    borderRadius: 8,
    backgroundColor: '#5fbb9f',
  },
  PassType: {
    height: 52,
    width: 52,
  },
  PassBtnType: {
    padding: 4,
    borderWidth: 1.5,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 12,
  },
});
