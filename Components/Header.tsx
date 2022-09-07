import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {IHeader} from '../Helpers/Types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({headerLeftType, headerRightType, navigation}: IHeader) => {
  const onPressHeaderLeft = () => {
    if (headerLeftType === 'Home') {
      navigation.navigate('Home');
    } else if (headerLeftType === 'Back') {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onPressHeaderLeft}
        style={[styles.headerBox, {marginRight: 'auto'}]}>
        <Ionicons
          name={headerLeftType === 'Back' ? 'chevron-back' : 'home-outline'}
          size={28}
          color="#333"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        style={[styles.headerBox, {marginLeft: 'auto'}]}>
        {headerRightType === 'Add' ? (
          <Ionicons
            name="add"
            style={{marginLeft: 2.5}}
            size={30}
            color="#333"
          />
        ) : (
          <MaterialCommunityIcons
            name="delete-outline"
            size={30}
            color="#333"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '95%',
    padding: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6,
  },
  headerBox: {
    marginTop: 'auto',
    marginBottom: 'auto',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 23,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
