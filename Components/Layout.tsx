import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from './Header';
import {ILayout} from '../Helpers/Types';
import {ScrollView} from 'react-native-gesture-handler';
import LoadingBackground from './LoadingBackground';

const Layout = ({
  children,
  headerLeftType,
  headerRightType,
  navigation,
  isHeader,
  isOverlay,
  Loading,
}: ILayout) => {
  return (
    <View style={styles.Body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {isOverlay ? (
          <View>
            <ImageBackground
              source={require('../Assets/Overlay.png')}
              imageStyle={{
                borderBottomLeftRadius: 60,
                borderBottomRightRadius: 60,
              }}
              style={styles.BackImg}>
              {isHeader ? (
                <Header
                  headerLeftType={headerLeftType}
                  headerRightType={headerRightType}
                  navigation={navigation}
                />
              ) : null}
            </ImageBackground>
            <View style={styles.Overaly}>{children}</View>
          </View>
        ) : (
          <View>
            {isHeader ? (
              <Header
                headerLeftType={headerLeftType}
                headerRightType={headerRightType}
                navigation={navigation}
              />
            ) : null}
            <View style={styles.Overaly}>{children}</View>
          </View>
        )}
        {Loading ? <LoadingBackground /> : null}
      </ScrollView>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  Body: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    flex: 1,
  },
  BackImg: {
    width: '100%',
    height: 320,
    resizeMode: 'contain',
  },
  Overaly: {
    height: '100%',
  },
});
